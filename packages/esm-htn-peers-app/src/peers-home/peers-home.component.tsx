import React from 'react';
import { UserHasAccess, useSession } from '@openmrs/esm-framework';

import PeerPatientList from '../components/peer-patient-list/peer-patient-list.component';
import AllPeerPatientList from '../components/peer-patient-list/all-peer-list.component';

interface HomePeersProps {
  patient: fhir.Patient;
  patientUuid: string;
}

const HomePeers: React.FC<HomePeersProps> = ({ patient, patientUuid }) => {
  const session = useSession();
  const isPeer = session?.user?.privileges?.filter((p) => p.display == 'Peer');
  return (
    <>
      <UserHasAccess privilege="Search Patients">
        <AllPeerPatientList />
      </UserHasAccess>
      {isPeer && isPeer.length > 0 && <PeerPatientList user={session?.user} />}
    </>
  );
};

export default HomePeers;
