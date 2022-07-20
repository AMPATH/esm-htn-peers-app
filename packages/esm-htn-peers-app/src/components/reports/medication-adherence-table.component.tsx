import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'carbon-components-react';
import _ from "lodash";

import styles from './data-table.component.scss';
import AdherenceTab from './adherence-tab.component';

interface AdherenceReportDataTableProps {
  data: any;
}

const AdherenceReportDataTable: React.FC<AdherenceReportDataTableProps> = ({ data }) => {

  const { t } = useTranslation();
  
  const tabAdherent = _.get(data, 'Adherent');
  const tabNonAdherent = _.get(data, 'Non-Adherent');
  return (

    <div className={styles.tabs}>
        <Tabs type="container">
          <Tab id="adherence-tab" label={t('adherent', `Adherent (${tabAdherent.length})`)}>
            <AdherenceTab data={tabAdherent}/>
          </Tab>
          <Tab id="non-adherent-tab" label={t('nonAdherent', `Non-Adherent (${tabNonAdherent.length})`)}>
            <AdherenceTab data={tabNonAdherent}/>
          </Tab>
        </Tabs>
      </div>
  );
};

export default AdherenceReportDataTable;
