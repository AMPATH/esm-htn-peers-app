import React from 'react';
import { useSessionUser } from '@openmrs/esm-framework';

import PeerPatientList from '../components/peer-patient-list/peer-patient-list.component';

interface HomePeersProps {
  patient: fhir.Patient;
  patientUuid: string;
}

const HomePeers: React.FC<HomePeersProps> = ({ patient, patientUuid }) => {
  return <PeerPatientList />;
};

export default HomePeers;
