import React from 'react';
import { ExtensionSlot, usePatient, useVisit } from '@openmrs/esm-framework';

interface PeersEncounterFormProps {
  patientUuid: string;
  patient: fhir.Patient;
  closeWorkspace: () => {}
}


const PeersEncounterForm: React.FC<PeersEncounterFormProps> = ({ patientUuid, closeWorkspace }) => {
 
  const { currentVisit } = useVisit(patientUuid); 
  
  const {patient} = usePatient();

  return(
    <div>
      {patientUuid && patient && (
        <ExtensionSlot
          extensionSlotName="form-widget-slot"
          state={{
            formUuid: 'b2a787bc-433c-48c5-b2b6-11a65ff6d8a7',
            visitUuid: currentVisit?.uuid,
            encounterUuid: null,
            visitTypeUuid: currentVisit?.visitType?.uuid,
            view: 'form',
            patientUuid,
            patient: patient,
            closeWorkspace,
            isOffline: false,
          }}
        />
      )}
    </div>
  )

};

export default PeersEncounterForm;
