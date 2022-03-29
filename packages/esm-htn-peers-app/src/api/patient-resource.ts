import useSWR from 'swr';
import { openmrsFetch } from '@openmrs/esm-framework';
import { PatientMedicationFetchResponse } from '../types/medication-order';

const careSettingUuid = '6f0c9a92-6f24-11e3-af88-005056821db0';

export function getPatientOrders(patientUuids: Array<string>, abortController: AbortController, status: 'ACTIVE' | 'any') {
  const customRepresentation =
    'custom:(uuid,dosingType,orderNumber,accessionNumber,' +
    'patient:ref,action,careSetting:ref,previousOrder:ref,dateActivated,scheduledDate,dateStopped,autoExpireDate,' +
    'orderType:ref,encounter:ref,orderer:(uuid,display,person:(display)),orderReason,orderReasonNonCoded,orderType,urgency,instructions,' +
    'commentToFulfiller,drug:(uuid,name,strength,dosageForm:(display,uuid),concept),dose,doseUnits:ref,' +
    'frequency:ref,asNeeded,asNeededCondition,quantity,quantityUnits:ref,numRefills,dosingInstructions,' +
    'duration,durationUnits:ref,route:ref,brandName,dispenseAsWritten)';

    const drugOrders = [];
  
    patientUuids.forEach(patientUuid => {
        drugOrders.push(openmrsFetch(`/ws/rest/v1/order?patient=${patientUuid}&careSetting=${careSettingUuid}&status=${status}&v=${customRepresentation}`, {
        signal: abortController.signal,
      }));
    });
  
    return drugOrders;
}

export function getPatientEncounter(patientUuids: Array<string>, encounterType: string, abortController: AbortController) {
  const customRepresentation =
    'custom:(uuid,display,encounterDatetime,patient,obs,' +
    'encounterProviders:(uuid,display,' +
    'encounterRole:(uuid,display),' +
    'provider:(uuid,person:(uuid,display)))';

  const encounters = [];
  
  patientUuids.forEach(patientUuid => {
    encounters.push(openmrsFetch(`/ws/rest/v1/encounter?patient=${patientUuid}&order=desc&encounterType=${encounterType}&limit=1&v=${customRepresentation}`, {
        signal: abortController.signal,
    }));
  });
  
  return encounters;  
}

export function getPatientInfo(patientUuids: Array<string>, abortController: AbortController) {

    const customRepresentation =
    'custom:(uuid,display,' +
    'identifiers:(identifier,uuid,preferred,location:(uuid,name),' +
    'identifierType:(uuid,name,format,formatDescription,validator)),' +
    'person:(uuid,display,gender,birthdate,dead,age,deathDate,birthdateEstimated,' +
    'causeOfDeath,preferredName:(uuid,preferred,givenName,middleName,familyName),' +
    'attributes:(uuid,display,value,attributeType,dateCreated,dateChanged),preferredAddress:(uuid,preferred,address1,address2,cityVillage,longitude,' +
    'stateProvince,latitude,country,postalCode,countyDistrict,address3,address4,address5' +
    ',address6,address7)))';
  
    const patientInfo = [];
  
    patientUuids.forEach(patientUuid => {
      patientInfo.push(openmrsFetch(`/ws/rest/v1/patient/${patientUuid}?v=${customRepresentation}`, {
        signal: abortController.signal,
      }));
    });
  
    return patientInfo;
  }
