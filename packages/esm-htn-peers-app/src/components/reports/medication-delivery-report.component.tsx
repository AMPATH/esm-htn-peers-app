/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import {
  DataTableSkeleton,
  Tile
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, formatDate, OpenmrsResource, useLayoutType, usePagination, useSession } from '@openmrs/esm-framework';
import _ from "lodash";
import { useTable, useGroupBy, useExpanded } from 'react-table'

import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import { fetchPatientUuids, getGenericItem, saveGenericItem } from '../../services/patient-info-cache.service';
import styles from './medication-consumption-summary.component.scss'
import { getPatientObsByConcept } from '../../api/patient-resource';

import DeliveryReportDataTable from './delivery-report-data-table.component';
import { setPatientObsTable } from './utils.data-table';

const MedicationDeliveryReport: React.FC<{}> = ({ }) => {

    const deliveryStatusUuid = 'be9131c6-58aa-46c1-94ae-a039b02beb6c';
    
    const { t } = useTranslation();
    const layout = useLayoutType();
    const desktopView = layout === 'desktop';
    const isTablet = layout === 'tablet';

    const [patientObs, SetPatientObs] = useState(null);
    const [isLoading, SetisLoading] = useState(true);
    

  useMemo(() => {
    const abortController = new AbortController();
    const cachedPatientUuids = fetchPatientUuids();
    let cachedObsInfo = getGenericItem('patientObs');
    
    if(!patientObs) {
        if(!cachedObsInfo) {
            const patientObsRequest = getPatientObsByConcept(cachedPatientUuids, deliveryStatusUuid, abortController);
            Promise.all(patientObsRequest).then((patientObs) => {
                saveGenericItem('patientObs', patientObs);
                SetPatientObs(_.orderBy(ObsTable(patientObs), ['encounterDate'], ['desc']));
                SetisLoading(false);
            }).catch((e) => {
                console.log("patientObsRequest", e)
            }); 
        } else {
            SetisLoading(false);
            SetPatientObs(_.orderBy(ObsTable(cachedObsInfo), ['encounterDate'], ['desc']));
        }    
    }
    
  }, [patientObs]);

  if (isLoading || !patientObs) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (patientObs?.length) {

    return (
      <>
        <div className={styles.container}>
          <div className={styles.detailHeaderContainer}>
            <h4 className={styles.productiveHeading02}>{`Medication Delivery Report`} </h4>
          </div>
          <DeliveryReportDataTable data={patientObs} />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Tile light className={styles.tile}>
        <div className={!desktopView ? styles.tabletHeading : styles.desktopHeading}>
          <h4>{t('medicationDelivery', 'Medication Delivery')}</h4>
        </div>
        <EmptyIllustration />
        <p className={styles.content}>{t('noDeliveryInfo', 'We do not have delivery information as at now.')}</p>
      </Tile>
    </div>
  );
};

function ObsTable(obs) { 
  const data =  _.groupBy(setPatientObsTable(obs), 'deliveryStatus');
  return _.mapValues(data, (o, key) => {
    return {
      items: mapItems(_.groupBy(o, 'encounterDate')),
      patientCount: o.length,
      id: `TAB-${key}`
    }
  });
  
}

function mapItems(items) {
  return _.values(_.mapValues(items, (o,key) => {
    return {
      id: `${key}`,
      encounterDate: key, 
      items: o,
      patientCount: o.length
    };
  }));
}

export default MedicationDeliveryReport;
