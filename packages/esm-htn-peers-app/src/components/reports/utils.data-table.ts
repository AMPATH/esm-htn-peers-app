import { camelCase, filter, find, first, flatMapDeep, get, isEqual,
    groupBy, keyBy, map, mapValues, merge, sumBy, trim, uniqWith, values } from "lodash";


export function generateStatsData(currMeds, medsOrdered) {

    return merge(
        keyBy(setOrderedMedsTable(medsOrdered), 'medication'), 
        keyBy(setCurrentMedsTable(currMeds), 'medication')
    );
}


export function setCurrentMedsTable(currMeds: Array<any>): any {
    const currentMedsInfo = flatMapDeep(map(currMeds, 'data.results'));
    
    const cMeds = currentMedsInfo.map((item) => {
        const pillCount = get(find(item.groupMembers, t => t.concept.uuid == '9b15016c-9698-4852-8228-7c55703f73ee'), 'value') || 0;
        return {
            patientName: item.person.display,
            patientUuid: item.person.uuid,
            encounterDate: get(find(item.groupMembers, t => t.concept.uuid == '61807185-2a44-4488-aa1a-c884b82a029b'), 'obsDatetime').split("T")[0],
            medication: trim(get(find(item.groupMembers, t => t.concept.uuid == '61807185-2a44-4488-aa1a-c884b82a029b'), 'value.display')),
            adherence: pillCount > 0 ? 'Non-Adherent' : 'Adherent',
            pillCount: pillCount,
            countDone: get(find(item.groupMembers, t => t.concept.uuid == '067e6d30-4962-46eb-9090-be55478d4afd'), 'value.display'),
            pillsDelivered: get(find(item.groupMembers, t => t.concept.uuid == 'db4a2478-1a3b-4c46-9769-a500c64ae5ba'), 'value')
        }
    });

    const oMeds = groupBy(uniqWith(cMeds, isEqual), 'adherence');
    return oMeds;
}

export function setOrderedMedsTable(medsOrdered: Array<any>) : Array<any> {

    const medsOrderInfo = flatMapDeep(map(medsOrdered, 'data.results'));
    
    return medsOrderInfo.map((item, key) => {
        return {
            patientName: item.patient.display,
            patientUuid: item.patient.uuid,
            medication: trim(item.drug.concept.display),
            dosageForm: item.drug.dosageForm.display,
            strength: item.drug.strength,
            duration: item.duration,
            durationUnits: item.durationUnits.display,
            quantityDispensed: item.quantity,
            frequency: item.frequency.display,
            dateOrdered: item.dateActivated.split("T")[0]
        }
    });
}

export function setPatientObsTable(obs: Array<any>) : Array<any> {

    const obsData = flatMapDeep(map(obs, 'data.results'));
    
    return obsData.map((item, key) => {
        return {
            id: `${key}`,
            patientName: item.person.display,
            patientUuid: item.person.uuid,
            deliveryStatus: item.value.display,
            encounterType: item.encounter.encounterType.name,
            encounterDate: item.encounter.encounterDatetime.split("T")[0]
        }
    });
}

export function setMissedMedsObsTable(reasonObs: Array<any>, missedMedsObs: Array<any>) : Array<any> {

    const reasonObsData = flatMapDeep(map(reasonObs, 'data.results'));
    const missedMedsObsData = flatMapDeep(map(missedMedsObs, 'data.results'));
    
    let mappedReasonObsData = filter(reasonObsData, 'obsGroup').map((item, key) => {
        return {
            id: `${key}`,
            item: item,
            groupBy: camelCase(`${pickItem(item.obsGroup?.groupMembers,'MISSED MEDICATION REASON')} ${pickItem(item.obsGroup?.groupMembers,'MEDICATION ADHERENCE, FREQUENCY')}`),
            missedDoseReason: pickItem(item.obsGroup?.groupMembers,'MISSED MEDICATION REASON'),
            scale: pickItem(item.obsGroup?.groupMembers,'MEDICATION ADHERENCE, FREQUENCY'),
            patients:[],
            patientCount: 0,
        }
    });
    
    return uniqWith(mappedReasonObsData, (arrVal, othVal) => { 
        return arrVal.missedDoseReason == othVal.missedDoseReason && arrVal.scale == othVal.scale;
    }).map((reason, key) => {
        reason.patients = mapPatients(reason.groupBy, mappedReasonObsData, missedMedsObsData);
        reason.patientCount = reason.patients.length;
        return reason;
    });
    
}

function pickItem(coll: Array<any>, by: string) {
    return get(find(coll, t => t.concept.display == by), 'value.display')
}

function mapPatients(missedDoseReason: string, reasonObsData: Array<any>, missedMedsObsData: Array<any>)  {
    
    const data =  groupBy(reasonObsData, 'groupBy');

    return get(data, missedDoseReason).map((p,key) => {
        
        const encounterDate = p.item.encounter.encounterDatetime.split("T")[0];
        const medication = first(filter(mapMissedReasonToMeds(missedMedsObsData), (med) => {
            return p.item.person.uuid == med.uuid && encounterDate == med.encounterDate;
        }));

        return {
          id: `${key}`,
          uuid: p.item.person.uuid,
          patientName: p.item.person.display,
          medication: medication? medication.medication : '',
          encounterDate: encounterDate
        };
    });
}


function mapMissedReasonToMeds(missedMedsObsData: Array<any>)  {
    
    return missedMedsObsData.map((item,key) => {
        return {
          uuid: item.person.uuid,
          patientName: item.person.display,
          medication: item.value.display,
          encounterDate: item.encounter.encounterDatetime.split("T")[0]
        };
    });
}