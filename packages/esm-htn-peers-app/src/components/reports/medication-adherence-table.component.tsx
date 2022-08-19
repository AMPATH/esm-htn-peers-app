import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'carbon-components-react';
import _ from "lodash";

import styles from './data-table.component.scss';
import AdherenceTab from './adherence-tab.component';
import { ExportToExcel } from './export-button.component';
import { generateDownloadablePillCountReport } from './utils.downloads';
import AdherenceTabByPatient from './adherence-tab-by-patient.component';

interface AdherenceReportDataTableProps {
  data: any;
}

const AdherenceReportDataTable: React.FC<AdherenceReportDataTableProps> = ({ data }) => {

  const { t } = useTranslation();

  const [downloadablePillCountData, SetDownloadablePillCountData] = useState(null);

  useEffect(() => {
    SetDownloadablePillCountData(generateDownloadablePillCountReport(data));
  }, [data]);

  return (

    <div className={styles.tabs}>
        <ExportToExcel apiData={downloadablePillCountData} fileName={`Medication_Pill_Count_Data_${new Date().toISOString().substring(0, 10)}`} />
        <AdherenceTabByPatient data={data}/>
      </div>
  );
};

export default AdherenceReportDataTable;
