import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  messageOmrsServiceWorker,
  registerBreadcrumbs,
} from '@openmrs/esm-framework';

import { createFormDashboardLink } from './createFormDashboardLink';
import { formDashboardMeta, peersDashboardMeta } from './dashboard.meta';
import { config } from './config';
import { createDashboardLink } from '../../esm-patient-common-lib';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const backendDependencies = {
  'webservices.rest': '^2.2.0',
};

function setupOpenMRS() {
  messageOmrsServiceWorker({
    type: 'registerDynamicRoute',
    pattern: '.+/ws/rest/v1/relationship.+',
  });

  const moduleName = '@ampath/esm-htn-peers-app';

  const options = {
    featureName: 'htn-peers',
    moduleName,
  };

  defineConfigSchema(moduleName, config);

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/app`,
      title: 'Home'
    },
    {
      path: `${window.spaBase}/htn-reports-dashboard`,
      title: 'HTN Report Dashboard',
      parent: `${window.spaBase}/app`,
    }
  ]);

  return {
    pages: [
      {
        route: 'app',
        load: getAsyncLifecycle(() => import('./peers-home/peers-home.component'), {
          featureName: 'htn-peers',
          moduleName,
        }),
        online: true,
        offline: false,
      },
      {
        load: getAsyncLifecycle(() => import('./components/reports/main-report-dashboard.component'), options),
        route: /^htn-reports-dashboard/,
        online: true,
        offline: false
      },
    ],
    extensions: [
      {
        id: 'show-report-dashboard-action',
        slot: 'top-nav-actions-slot',
        load: getAsyncLifecycle(() => import('./components/reports/add-dashboard-link'), options),
        online: true,
        offline: false,
      },
      {
        id: 'peer-list',
        slot: 'patient-chart-htn-peers-dashboard-slot',
        load: getAsyncLifecycle(() => import('./peers-home/peers-home.component'), options),
        meta: peersDashboardMeta,
        online: true,
        offline: false,
      },
      {
        id: 'peer-list-nav-link',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(peersDashboardMeta), options),
        meta: peersDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'htn-peer-encounter-form',
        load: getAsyncLifecycle(
          () => import('./components/peer-encounter-form/peer-encounter-form.component'),
          options,
        ),
        online: true,
        offline: true,
        order: 1,
      },
      {
        id: 'htn-peers-nav-link',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createFormDashboardLink(formDashboardMeta), options),
        meta: formDashboardMeta,
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
