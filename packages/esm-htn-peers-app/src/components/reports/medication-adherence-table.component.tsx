import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'carbon-components-react';
import _ from "lodash";

import styles from './data-table.component.scss';
import AdherenceTab from './adherence-tab.component';
import { ExportToExcel } from './export-button.component';
import { generateDownloadablePillCountReport } from './utils.downloads';

interface AdherenceReportDataTableProps {
  data: any;
}

const AdherenceReportDataTable: React.FC<AdherenceReportDataTableProps> = ({ data }) => {

  const { t } = useTranslation();

  const [downloadablePillCountData, SetDownloadablePillCountData] = useState(null);

  useEffect(() => {
    SetDownloadablePillCountData(generateDownloadablePillCountReport(data));
  }, [data]);
  
  const tabAdherent = _.get(data, 'Adherent');
  const tabNonAdherent = _.get(data, 'Non-Adherent');
  return (

    <div className={styles.tabs}>
        
        <Tabs type="container">
          <Tab id="adherence-tab" label={`0 Pills Remaining (${tabAdherent.length})`}>
            <AdherenceTab data={tabAdherent}/>
          </Tab>
          <Tab id="non-adherent-tab" label={`>0 Pills Remaining (${tabNonAdherent.length})`}>
            <AdherenceTab data={tabNonAdherent}/>
          </Tab>
          <ExportToExcel apiData={downloadablePillCountData} fileName={`Medication_Pill_Count_Data_${new Date().toISOString().substring(0, 10)}`} />
        </Tabs>
      </div>
  );
};

export default AdherenceReportDataTable;
