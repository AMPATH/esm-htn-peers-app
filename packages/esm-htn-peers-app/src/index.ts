import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  messageOmrsServiceWorker,
} from '@openmrs/esm-framework';
import { createDashboardLink } from './createDashboardLink';
import { dashboardMeta } from './dashboard.meta';
import { config } from './config';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const backendDependencies = {
  'webservices.rest': '^2.2.0',
};

const frontendDependencies = {
  '@openmrs/esm-framework': process.env.FRAMEWORK_VERSION,
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

  return {
    pages: [
      {
        route: 'app',
        load: getAsyncLifecycle(() => import('./components/peer-patient-list/peer-patient-list.component'), {
          featureName: 'htn-peers',
          moduleName,
        }),
        online: true,
        offline: true,
      },
    ],
    extensions: [
      {
        id: 'htn-peers',
        slot: 'patient-chart-htn-peers-dashboard-slot',
        load: getAsyncLifecycle(() => import('./peers-home/peers-home.component'), options),
        online: true,
        offline: true,
        order: 1,
      },
      {
        id: 'htn-peer-encounter-form',
        load: getAsyncLifecycle(() => import('./components/peer-encounter-form/peer-encounter-form.component'), options),
        online: true,
        offline: true,
        order: 1,
      },
      {
        id: 'htn-peers-nav-link',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(dashboardMeta), options),
        meta: dashboardMeta,
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, frontendDependencies, importTranslation, setupOpenMRS };
