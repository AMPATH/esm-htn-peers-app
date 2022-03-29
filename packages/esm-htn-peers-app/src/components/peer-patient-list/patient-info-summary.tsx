import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SkeletonText } from 'carbon-components-react';
import { formatDate, OpenmrsResource } from '@openmrs/esm-framework';

import styles from './patient-info-summary.scss';

interface PatientInfoProps {
  patientInfo: Array<OpenmrsResource>;
}

const PatientInfoSummary: React.FC<PatientInfoProps> = ({ patientInfo }) => {
  const { t } = useTranslation();

  if (!patientInfo) {
    return <SkeletonText />;
  }

  return (
    <div className={''}>
      { patientInfo.map((medication, index) => (
        <React.Fragment key={index}>
        <div className={styles.searchResultTile}>
          <div className={styles.searchResultTileContent}>
            <p>{index+1}. &nbsp;
              <strong>{medication.drug.name}</strong> &mdash;{' '}
              {medication.doseUnits.display}
              <br />
              <span className={styles.label01}>{medication.frequency.display}</span> &mdash;{' '}
              <span className={styles.label01}>{medication.route.display}</span>
            </p>
            <p>
            <strong>Quantity</strong> &mdash;{' '}
              {medication.quantity} for {medication.duration} {medication.durationUnits.display}
              <br />
              <span className={styles.label01}>Date of Purchase</span> &mdash;{' '}
              <span className={styles.label01}>{formatDate(new Date(medication.dateActivated))}</span>
            </p>
            <hr />
          </div>
        </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PatientInfoSummary;
