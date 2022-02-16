
function matchIdentifier(identifiers: Array<any>, type: string) {
    const matchedId: Array<any> = identifiers.filter((identifier) => {
        return identifier.type.text == type
    });
    
    return matchedId.length > 0 ? matchedId[0].value : "";
}

function mapGender(type: string){
    return ({'male': 'M', 'female': 'F'})[type];
}

export function getPeerEncounterPatientInfo(patient: fhir.Patient){

    return {
        patient_fname: patient.name[0].given[0],
        patient_sname: patient.name[0].given[1],
        patient_lname: patient.name[0].family,
        amrs_id: matchIdentifier(patient.identifier, 'OpenMRS ID'),
        patient_gender: mapGender(patient.gender),
        patient_phone:'',
        patient_alt_phone:'',
    }
}