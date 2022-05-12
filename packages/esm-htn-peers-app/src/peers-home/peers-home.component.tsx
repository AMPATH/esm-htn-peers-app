import React from 'react';
import { OpenmrsResource, UserHasAccess, useSessionUser } from '@openmrs/esm-framework';

import PeerPatientList from '../components/peer-patient-list/peer-patient-list.component';
import AllPeerPatientList from '../components/peer-patient-list/all-peer-list.component';

interface HomePeersProps {
  patient: fhir.Patient;
  patientUuid: string;
}

const HomePeers: React.FC<HomePeersProps> = ({ patient, patientUuid }) => {
  const sessionUser = useSessionUser() as any;
  const isPeer = sessionUser?.user?.privileges?.filter(p => p.display == "Peer");
  return(
    <>
      <UserHasAccess privilege="Search Patients">
        <AllPeerPatientList />
      </UserHasAccess>
      {isPeer && isPeer.length > 0 && <PeerPatientList user={sessionUser?.user as any} />}
    </>
  ) 
  ;
};

export default HomePeers;
