import React from 'react';
import { useSessionUser } from '@openmrs/esm-framework';

import PeerEncounterForm  from '../components/peer-encounter-form/peer-encounter-form.component';

interface HomePeersProps {
  patient: fhir.Patient;
  patientUuid: string;
}

const HomePeers: React.FC<HomePeersProps> = ({ patient, patientUuid }) => {
  return <h1>Home</h1>;
};

export default HomePeers;
