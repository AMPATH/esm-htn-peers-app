import React from "react";
import { useSessionUser } from '@openmrs/esm-framework'

import { PeerEncounterForm } from "../components/peer-encounter-form/peer-encounter-form.component"
import PeerPatientList from "../components/peer-patient-list/peer-patient-list.component";

interface HomePeersProps {
    patient: fhir.Patient,
    patientUuid: string
}

const HomePeers: React.FC<HomePeersProps> = ({patient, patientUuid})=> {
   
    return <PeerEncounterForm patient={patient} patientUuid={patientUuid} />
}

export default HomePeers