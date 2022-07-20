import React from 'react';
import { Data_220 } from '@carbon/icons-react';
import styles from './add-dashboard-link.scss';
import { navigate, UserHasAccess } from '@openmrs/esm-framework';
import { HeaderGlobalAction } from 'carbon-components-react';

export default function Root() {
  const goToReports = React.useCallback(() => navigate({ to: `${window.spaBase}/htn-reports-dashboard` }), []);

  return (
    <UserHasAccess privilege="Search Patients">
      <HeaderGlobalAction
        aria-label="Go to reports dashboard"
        aria-labelledby="Go to reports dashboard"
        name="ReportDashboardIcon"
        onClick={goToReports}
        className={styles.slotStyles}>
        <Data_220 />
      </HeaderGlobalAction>
    </UserHasAccess>
  );
}
