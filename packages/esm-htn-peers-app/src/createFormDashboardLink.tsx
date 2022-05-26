/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useConnectivity, usePatient } from '@openmrs/esm-framework';
import {
  launchPatientWorkspace,
  launchStartVisitPrompt,
  useVisitOrOfflineVisit,
} from '../../esm-patient-common-lib';

import { DashboardLinkConfig } from './types';

export const createFormDashboardLink = (db: DashboardLinkConfig) => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    const { patient } = usePatient();
    const { currentVisit } = useVisitOrOfflineVisit(patient?.id);
    const isOnline = useConnectivity();

    function launchFormEntry(event: React.MouseEvent) {
      if (isOnline) {
        if (currentVisit) {
          launchPatientWorkspace('htn-peer-encounter-form');
        } else {
          launchStartVisitPrompt();
        }
      } else {
        launchPatientWorkspace('htn-peer-encounter-form');
      }
    }

    return (
      <div
        role={'link'}
        tabIndex={0}
        key={db.name}
        onClick={(event) => {
          launchFormEntry(event);
        }}
      >
        <a className="bx--side-nav__link">{db.title}</a>
      </div>
    );
  };
  return DashboardLink;
};
