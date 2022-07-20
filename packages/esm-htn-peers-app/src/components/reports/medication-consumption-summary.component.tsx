/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import {
  DataTableSkeleton,
  Tile
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { useLayoutType, useSession } from '@openmrs/esm-framework';
import _ from "lodash";

import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import { fetchPatientUuids, getGenericItem, saveGenericItem } from '../../services/patient-info-cache.service';
import styles from './medication-consumption-summary.component.scss'
import { getPatientMedicationUsage, getPatientOrders } from '../../api/patient-resource';
import { setCurrentMedsTable, setOrderedMedsTable } from './utils.data-table';
import MedicationDataTable from './medication-data-table.component';
import AdherenceReportDataTable from './medication-adherence-table.component';

const MedicationConsumptionReport: React.FC<{}> = ({ }) => {

    const currentHTNMedsUuid = '95a215e1-c36d-4b1e-852e-137acc4b2808';

    const { t } = useTranslation();
    const layout = useLayoutType();
    const desktopView = layout === 'desktop';

    const [medicationData, SetMedicationData] = useState(null);
    const [orderedMeds, SetOrderedMeds] = useState(null);
    const [adheredMeds, SetAdheredMeds] = useState(null);
    const [isLoading, SetisLoading] = useState(false);
    

  useMemo(() => {
    const abortController = new AbortController();
    const cachedPatientUuids = fetchPatientUuids();

    let cachedMedInfo = getGenericItem('medicationInfo');
    let cachedOrderInfo = getGenericItem('medicationOrders');

    if(!medicationData) {
        if(!cachedMedInfo) {
          const patientMedicationRequest = getPatientMedicationUsage(cachedPatientUuids, currentHTNMedsUuid, abortController);    
            Promise.all(patientMedicationRequest).then((medicationInfo) => {
                cachedMedInfo = medicationInfo;
                saveGenericItem('medicationInfo', medicationInfo);
                return medicationInfo;
            }).then((medicationInfo) => {
              const patientOrdersRequest = getPatientOrders(cachedPatientUuids, abortController)  
                Promise.all(patientOrdersRequest).then((medicationOrders) => {
                    saveGenericItem('medicationOrders', medicationOrders);
                    SetMedicationData({medicationInfo, medicationOrders});
                }).catch((e) => {
                    console.log("patientOrdersRequest", e)
                });
    
            }).catch((e) => {
                console.log("patientMedicationRequest", e)
            }); 
        } else {
            SetMedicationData({cachedMedInfo, cachedOrderInfo});
        }
        

    } else {
        
        if(!orderedMeds)
            SetOrderedMeds(_.orderBy(MedsTable(_.uniqWith(setOrderedMedsTable(cachedOrderInfo), _.isEqual)), ['patientCount'], ['desc']));
        if(!adheredMeds)
            SetAdheredMeds(setCurrentMedsTable(cachedMedInfo));    
    }
    
  }, [medicationData, orderedMeds]);

  if (isLoading || !medicationData) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (orderedMeds?.length) {

    return (
      <>
        <div className={styles.container}>
          <div className={styles.detailHeaderContainer}>
            <h4 className={styles.productiveHeading02}>{t('medicationCosumption', 'Medication Consumption Report')} </h4>
          </div>
          <MedicationDataTable data={orderedMeds} medInfo={medicationData} />
        </div>
        <div className={styles.container}>
          <div className={styles.detailHeaderContainer}>
            <h4 className={styles.productiveHeading02}>{t('medicationAdherence', 'Medication Adherence Report')} </h4>
          </div>
          <AdherenceReportDataTable data={adheredMeds} />
        </div>
      </>
      
    );
  }

  return (
    <div className={styles.container}>
      <Tile light className={styles.tile}>
        <div className={!desktopView ? styles.tabletHeading : styles.desktopHeading}>
          <h4>{t('peerPatients', 'Peer Patients')}</h4>
        </div>
        <EmptyIllustration />
        <p className={styles.content}>{t('noPeerPatients', 'You have not been assigned any peer patients.')}</p>
      </Tile>
    </div>
  );
};

function MedsTable(orderedMeds) {
  
    const oMeds = _.groupBy(orderedMeds, 'medication');

    return _.values(_.mapValues(oMeds, (o,key) => {
        return {
            id: `${key}`,
            medication: _.trim(_.first(o).medication), 
            totalDispensed: _.sumBy(o, 'quantityDispensed'),
            items: o.map((i, k) => { i.id = `${k}`; return i;}),
            patientCount: o.length
        };
    }));
}

export default MedicationConsumptionReport;
