import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'carbon-components-react';
import _ from "lodash";

import styles from './data-table.component.scss';
import DeliveryTab from './delivery-tab.component';
import { ExportToExcel } from './export-button.component';
import { generateDownloadablePillDeliveryReport } from './utils.downloads';

interface DeliverReportDataTableProps {
  data: Array<{
    id: string;
    items: Array<{
      encounterDate: string;
      id: string;
      items: Array<{
        deliveryStatus: string;
        encounterDate: string;
        encounterType: string
        id: string;
        patientName: string;
        patientUuid: string;
      }>;
      patientCount: number;
    }>;
    patientCount: number;
  }>
}

const DeliveryReportDataTable: React.FC<DeliverReportDataTableProps> = ({ data }) => {

  const { t } = useTranslation();

  const [downloadableDeliveryData, SetDownloadableDeliveryData] = useState(null);

  useEffect(() => {
    SetDownloadableDeliveryData(generateDownloadablePillDeliveryReport(data));
  }, [data])
  
  const tabYes = _.find(data, a => a.id=='TAB-YES');
  const tabNo = _.find(data, a => a.id=='TAB-NO');
  return (

    <div className={styles.tabs}>
        <Tabs type="container">
          <Tab id="no-deliveries-tab" label={`Failed Deliveries (${tabNo.patientCount})`}>
            <DeliveryTab data={tabNo.items}/>
          </Tab>
          <Tab id="yes-deliveries-tab" label={`Successful Deliveries (${tabYes.patientCount})`}>
            <DeliveryTab data={tabYes.items}/>
          </Tab>
          <ExportToExcel apiData={downloadableDeliveryData} fileName={`Medication_Delivery_Data_${new Date().toISOString().substring(0, 10)}`} />
        </Tabs>
      </div>
  );
};

export default DeliveryReportDataTable;
