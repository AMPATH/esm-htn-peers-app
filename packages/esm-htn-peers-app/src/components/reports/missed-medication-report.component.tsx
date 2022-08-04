/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import {
  DataTableSkeleton,
  Tile
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { useLayoutType } from '@openmrs/esm-framework';
import _ from "lodash";

import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import { fetchPatientUuids, getGenericItem, saveGenericItem } from '../../services/patient-info-cache.service';
import styles from './medication-consumption-summary.component.scss'
import { getPatientObsByConcept } from '../../api/patient-resource';


import { setMissedMedsObsTable, setPatientObsTable } from './utils.data-table';
import MissedMedicationDataTable from './missed-medication-table.component';
import { ExportToExcel } from './export-button.component';
import { generateDownloadableMissedMedsReport } from './utils.downloads';

const MissedMedicationReport: React.FC<{}> = ({ }) => {

    const missedDoseReasonUuid = 'a89ebbc2-1350-11df-a1f1-0026b9348838';
    const missedMedicationUuid = 'f9f721e5-d123-49d5-976f-a24d3c5b5a90';
    const v = 'custom:(person:ref,encounter:(encounterDatetime,encounterType:(name)),obsGroup:(groupMembers:(concept:(display),value:(display))))';
    
    const { t } = useTranslation();
    const layout = useLayoutType();
    const desktopView = layout === 'desktop';
    const isTablet = layout === 'tablet';

    const [doseObs, SetDoseObs] = useState(null);
    const [medDoseObs, SetMedDoseObs] = useState(null);
    const [isLoading, SetisLoading] = useState(true);
    const [downloadableData, SetDownloadableData] = useState([]);

  useMemo(() => {
    const abortController = new AbortController();
    const cachedPatientUuids = fetchPatientUuids();
    let cachedObsInfo = getGenericItem('missedMedications');

    const updateStateInfo = (missedDoseReasons, missedMedications) => {
      SetisLoading(false);
      const medObsData = setMissedMedsObsTable(missedDoseReasons, missedMedications)
      SetMedDoseObs(medObsData);
      if(medObsData?.length) {
        SetDownloadableData(generateDownloadableMissedMedsReport(medObsData));
      }
    }
    
    if(!medDoseObs) {
        if(!cachedObsInfo) {
            const doseReasonObsRequest = getPatientObsByConcept(cachedPatientUuids, missedDoseReasonUuid, abortController, v);
            Promise.all(doseReasonObsRequest).then((patientObs) => {
                saveGenericItem('missedDoseReasons', patientObs);
                return patientObs;
            }).then((patientObs) => {
                const missedMedicationObsRequest = getPatientObsByConcept(cachedPatientUuids, missedMedicationUuid, abortController);  
                Promise.all(missedMedicationObsRequest).then((missedObs) => {
                  saveGenericItem('missedMedications', missedObs);
                  updateStateInfo(patientObs, missedObs);    
                }).catch((e) => {
                    console.log("patientOrdersRequest", e);
                });

            }).catch((e) => {
                console.log("patientObsRequest", e);
            }); 
        } else {
          updateStateInfo(getGenericItem('missedDoseReasons'), getGenericItem('missedMedications'));   
        }    
    }
    
  }, [medDoseObs]);

  if (isLoading || !medDoseObs) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (medDoseObs?.length) {

    return (
      <>
        <div className={styles.container}>
          <div className={styles.detailHeaderContainer}>
            <h4 className={styles.productiveHeading02}>{t('missedMedication', 'Missed Medication Report')} </h4>
          </div>
          <ExportToExcel apiData={downloadableData} fileName={'Missed_Medication_Data'} />
          <MissedMedicationDataTable data={medDoseObs} />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Tile light className={styles.tile}>
        <div className={!desktopView ? styles.tabletHeading : styles.desktopHeading}>
          <h4>{t('medicationDelivery', 'Missed Medications')}</h4>
        </div>
        <EmptyIllustration />
        <p className={styles.content}>{t('noDeliveryInfo', 'We do not have missed mdeciation information as at now.')}</p>
      </Tile>
    </div>
  );
};


export default MissedMedicationReport;
