import React from 'react';
import { ExtensionSlot, usePatient } from '@openmrs/esm-framework';
import { usePatientOrOfflineRegisteredPatient, useVisitOrOfflineVisit } from '@openmrs/esm-patient-common-lib';

interface PeersEncounterFormProps {
  patientUuid: string;
  patient: fhir.Patient;
  closeWorkspace: () => {};
}

const PeersEncounterForm: React.FC<PeersEncounterFormProps> = ({ patientUuid, closeWorkspace }) => {
  const { currentVisit } = useVisitOrOfflineVisit(patientUuid);

  const { patient } = usePatientOrOfflineRegisteredPatient(patientUuid);

  return (
    <div>
      {patient && currentVisit && (
        <ExtensionSlot
          extensionSlotName="form-widget-slot"
          state={{
            view: 'form',
            formUuid: 'b76f4d39-4619-42b1-a437-abdb4d396968',
            visitUuid: currentVisit.uuid,
            visitTypeUuid: currentVisit.visitType?.uuid,
            patientUuid,
            patient,
            encounterUuid: '',
            closeWorkspace,
          }}
        />
      )}
    </div>
  );
};

export default PeersEncounterForm;
