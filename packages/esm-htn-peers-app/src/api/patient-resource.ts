import { openmrsFetch } from '@openmrs/esm-framework';
import { PEER_PROVIDER_IDS } from '../peers';

const careSettingUuid = '6f0c9a92-6f24-11e3-af88-005056821db0';

export function getPatientOrder(patientUuid: string, abortController: AbortController, status: 'ACTIVE' | 'any') {
  const customRepresentation =
    'custom:(uuid,dosingType,orderNumber,accessionNumber,' +
    'patient:ref,action,careSetting:ref,previousOrder:ref,dateActivated,scheduledDate,dateStopped,autoExpireDate,' +
    'orderType:ref,encounter:ref,orderer:(uuid,display,person:(display)),orderReason,orderReasonNonCoded,orderType,urgency,instructions,' +
    'commentToFulfiller,drug:(uuid,name,strength,dosageForm:(display,uuid),concept),dose,doseUnits:ref,' +
    'frequency:ref,asNeeded,asNeededCondition,quantity,quantityUnits:ref,numRefills,dosingInstructions,' +
    'duration,durationUnits:ref,route:ref,brandName,dispenseAsWritten)';

  
    return openmrsFetch(`/ws/rest/v1/order?patient=${patientUuid}&orderType=53eb466e-1359-11df-a1f1-0026b9348838&careSetting=${careSettingUuid}&status=${status}&v=${customRepresentation}`, {
      signal: abortController.signal,
    });
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

export function getPatientMedicationUsage(patientUuids: Array<string>, conceptUuid: string, abortController: AbortController) {

  const customRepresentation = 'custom:(person:ref,encounter:ref,groupMembers:(uuid,concept:(uuid,display),obsDatetime,value:(display)))';

  const requests = [];
  
  patientUuids.forEach(patientUuid => {
    requests.push(openmrsFetch(`/ws/rest/v1/obs?patient=${patientUuid}&concept=${conceptUuid}&v=${customRepresentation}`, {
        signal: abortController.signal,
    }));
  });
  
  return requests;  
}

export function getPatientObsByConcept(patientUuids: Array<string>, conceptUuid: string, abortController: AbortController, v?: string) {

  const customRepresentation = v ? v : 'custom:(person:ref,encounter:(encounterDatetime,encounterType:(name)),value:ref)';

  const requests = [];
  
  patientUuids.forEach(patientUuid => {
    requests.push(openmrsFetch(`/ws/rest/v1/obs?patient=${patientUuid}&concept=${conceptUuid}&v=${customRepresentation}`, {
        signal: abortController.signal,
    }));
  });
  
  return requests;  
}

export function getPatientOrders(patientUuids: Array<string>, abortController: AbortController) {

  const customRepresentation = 'custom:(orderNumber,patient:ref,action,dateActivated,autoExpireDate,encounter:ref,orderer:(uuid,display,person:(display)),'+
  'drug:(uuid,strength,dosageForm:(display,uuid),concept:ref),dose,doseUnits:ref,frequency:ref,quantity,quantityUnits:ref,duration,durationUnits:ref)';

  const requests = [];
  
  patientUuids.forEach(patientUuid => {
    requests.push(openmrsFetch(`/ws/rest/v1/order?patient=${patientUuid}&orderType=53eb466e-1359-11df-a1f1-0026b9348838&careSetting=${careSettingUuid}&status=ACTIVE&v=${customRepresentation}`, {
      signal: abortController.signal,
    }));
  });
  
  return requests;  
}

export function getPeers(abortController: AbortController) {
  const customRepresentation = 'custom:(uuid,display,person:(uuid))';

  const peers = [];
  
  PEER_PROVIDER_IDS.forEach(providerId => {
    peers.push(openmrsFetch(`/ws/rest/v1/provider?q=${providerId}&v=${customRepresentation}`, {
        signal: abortController.signal,
    }));
  });
  
  return peers;  
}

export function getPatientInfo(patientUuids: Array<string>, abortController: AbortController) {

    const customRepresentation =
    'custom:(uuid,display,' +
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
