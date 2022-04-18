import { fetchCurrentPatient, openmrsFetch, OpenmrsResource, usePatient } from "@openmrs/esm-framework";
import { snakeCase, uniqBy } from "lodash";

import { Order } from '../types/medication-order';

function matchIdentifier(identifiers: Array<any>, type: string) {
  const matchedId: Array<any> = identifiers.filter((identifier) => {
    return identifier.type.text == type;
  });

  return matchedId.length > 0 ? matchedId[0].value : '';
}

function mapGender(type: string) {
  return { male: 'M', female: 'F' }[type];
}


export function mapPatienInfo(data: Array<any>) {
  const mappedInfo = [];
  data.map((response, index) =>{
      const info = response.data;
      const address = info?.person.preferredAddress;
      const phone = info?.person.attributes.filter((attr) => attr.attributeType.uuid==='72a759a8-1359-11df-a1f1-0026b9348838')[0]
      mappedInfo.push({
        ...info,
        name: info.display,
        id: `${index}`,
        phone: phone?.value,
        location: address.address1 + ': '+ address.countyDistrict + '/' + address.cityVillage
      });
  });

  return mappedInfo;
}

export function mergePatienInfo(mappedPatientInfo: Array<any>, patientOrders: Array<any>) {
  
  return mappedPatientInfo.map((info) =>{
    const orders = patientOrders.filter((response) =>{
      return response.url.match(new RegExp(info.uuid));
    });

    info.orders = uniqBy(orders[0]?.data?.results, 'drug.uuid');
    info.encounter = info.orders.length > 0 ? extractEncounterMedData(orders[1]?.data?.results[0].obs) : null;
    return info;
  });

}

export function extractEncounterMedData(obs: Array<any>): any {
  const encounters = {};
  [`RETURN VISIT DATE`].forEach((_match)=>{
      encounters[snakeCase(_match)]=obs.filter((ob) => (new RegExp(`${_match}:([\s]*.*)`, 'i')).exec(ob.display)!=null)
  });
  
  return encounters;
}

export function getPeerEncounterPatientInfo(patient: fhir.Patient) {
  return {
    patient_fname: patient.name[0].given[0],
    patient_sname: patient.name[0].given[1],
    patient_lname: patient.name[0].family,
    amrs_id: matchIdentifier(patient.identifier, 'OpenMRS ID'),
    patient_gender: mapGender(patient.gender),
    patient_phone: '',
    patient_alt_phone: '',
  };
}
