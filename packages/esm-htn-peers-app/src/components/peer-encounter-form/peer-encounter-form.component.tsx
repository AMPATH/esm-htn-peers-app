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
            formUuid: 'b76f4d39-4619-42b1-a437-abdb4d396968',
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
