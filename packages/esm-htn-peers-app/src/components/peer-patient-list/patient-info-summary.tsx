import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableSkeleton } from 'carbon-components-react';
import { formatDate } from '@openmrs/esm-framework';

import styles from './patient-info-summary.scss';
import { getPatientOrder } from '../../api/patient-resource';
import { uniqBy } from 'lodash';

interface PatientInfoProps {
  patientUuid: string;
}

const PatientInfoSummary: React.FC<PatientInfoProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const abortController = new AbortController();
  
  const [patientInfo, setPatientInfo] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);

  const patientOrdersRequest = getPatientOrder(patientUuid, abortController, 'ACTIVE');

  useEffect(() => {

    if(!patientInfo && orderLoading) {
        patientOrdersRequest.then((order) => {
          setOrderLoading(false);
          setPatientInfo(uniqBy(order.data?.results, 'drug.uuid'));
        });
    }

  }, [patientInfo, orderLoading]);
  

  if (orderLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }

  return (
    <div className={''}>
      { patientInfo && patientInfo.map((medication, index) => (
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
