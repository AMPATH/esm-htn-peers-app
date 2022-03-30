import React from 'react';
import { Link } from 'carbon-components-react';
import { usePatient, useVisit } from '@openmrs/esm-framework';


import { DashboardLinkConfig } from './types';
import { launchPatientWorkspace } from './workspaces';

export const createFormDashboardLink = (db: DashboardLinkConfig) => {

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {

    const { patient } = usePatient();
    const { currentVisit } = useVisit(patient?.id);

    function startVisitPrompt() {
      window.dispatchEvent(
        new CustomEvent('visit-dialog', {
          detail: {
            type: 'prompt',
          },
        }),
      );
    }
    
    function launchFormEntry() {
      if (currentVisit) {
        launchPatientWorkspace('htn-peer-encounter-form');
      } else {
        startVisitPrompt();
      }
    }

    return (
      <div key={db.name} onClick={() => {launchFormEntry()}}>
        <a href="#" onClick={(e) => {e.preventDefault()}} className="bx--side-nav__link">{db.title}</a>
      </div>
    );
  };
  return DashboardLink;
};

