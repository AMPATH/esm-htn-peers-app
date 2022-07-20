import React from 'react';
import { UserHasAccess, useSession, ExtensionSlot } from '@openmrs/esm-framework';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid, Row } from 'carbon-components-react';
import MedicationConsumptionReport from './medication-consumption-summary.component';
import MedicationDeliveryReport from './medication-delivery-report.component';
import MissedMedicationReport from './missed-medication-report.component';

interface MainReportDashboardProps {
  
}

export default function MainReportDashboard() {
  
  return (
      <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
        <main className="omrs-main-content" style={{ backgroundColor: 'white' }}>
          <Grid>
            <Row>
              <ExtensionSlot extensionSlotName="breadcrumbs-slot" />
            </Row>
            <Route
              exact
              path="/htn-reports-dashboard"
              render={(props) => (<>
                <MedicationConsumptionReport />
                <MedicationDeliveryReport />
                <MissedMedicationReport /></>
              )}
            />
          </Grid>
        </main>
      </BrowserRouter>
  )    
};