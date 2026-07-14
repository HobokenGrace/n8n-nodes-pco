export interface ProductConfig {
  product: string;
  displayName: string;
  className: string;
  nodeName: string;
  sourceUrl: string;
  snapshotDate: string;
  generate: boolean;
}

export const productConfigs: ProductConfig[] = [
  {
    product: 'api',
    displayName: 'Planning Center API',
    className: 'PlanningCenterApi',
    nodeName: 'planningCenterApi',
    sourceUrl: 'https://api.planningcenteronline.com/api/v2/open_api/2025-09-30',
    snapshotDate: '2025-09-30',
    generate: true,
  },
  {
    product: 'calendar',
    displayName: 'Planning Center Calendar',
    className: 'PlanningCenterCalendar',
    nodeName: 'planningCenterCalendar',
    sourceUrl: 'https://api.planningcenteronline.com/calendar/v2/open_api/2022-07-07',
    snapshotDate: '2022-07-07',
    generate: true,
  },
  {
    product: 'check-ins',
    displayName: 'Planning Center Check-Ins',
    className: 'PlanningCenterCheckIns',
    nodeName: 'planningCenterCheckIns',
    sourceUrl: 'https://api.planningcenteronline.com/check-ins/v2/open_api/2025-05-28',
    snapshotDate: '2025-05-28',
    generate: true,
  },
  {
    product: 'current',
    displayName: 'Planning Center Current',
    className: 'PlanningCenterCurrent',
    nodeName: 'planningCenterCurrent',
    sourceUrl: 'https://api.planningcenteronline.com/current/v2/open_api/2018-08-01',
    snapshotDate: '2018-08-01',
    generate: true,
  },
  {
    product: 'giving',
    displayName: 'Planning Center Giving',
    className: 'PlanningCenterGiving',
    nodeName: 'planningCenterGiving',
    sourceUrl: 'https://api.planningcenteronline.com/giving/v2/open_api/2019-10-18',
    snapshotDate: '2019-10-18',
    generate: true,
  },
  {
    product: 'groups',
    displayName: 'Planning Center Groups',
    className: 'PlanningCenterGroups',
    nodeName: 'planningCenterGroups',
    sourceUrl: 'https://api.planningcenteronline.com/groups/v2/open_api/2023-07-10',
    snapshotDate: '2023-07-10',
    generate: true,
  },
  {
    product: 'people',
    displayName: 'Planning Center People',
    className: 'PlanningCenterPeople',
    nodeName: 'planningCenterPeople',
    sourceUrl: 'https://api.planningcenteronline.com/people/v2/open_api/2025-11-10',
    snapshotDate: '2025-11-10',
    generate: true,
  },
  {
    product: 'publishing',
    displayName: 'Planning Center Publishing',
    className: 'PlanningCenterPublishing',
    nodeName: 'planningCenterPublishing',
    sourceUrl: 'https://api.planningcenteronline.com/publishing/v2/open_api/2024-03-25',
    snapshotDate: '2024-03-25',
    generate: true,
  },
  {
    product: 'registrations',
    displayName: 'Planning Center Registrations',
    className: 'PlanningCenterRegistrations',
    nodeName: 'planningCenterRegistrations',
    sourceUrl: 'https://api.planningcenteronline.com/registrations/v2/open_api/2025-05-01',
    snapshotDate: '2025-05-01',
    generate: true,
  },
  {
    product: 'services',
    displayName: 'Planning Center Services',
    className: 'PlanningCenterServices',
    nodeName: 'planningCenterServices',
    sourceUrl: 'https://api.planningcenteronline.com/services/v2/open_api/2018-11-01',
    snapshotDate: '2018-11-01',
    generate: true,
  },
  {
    product: 'webhooks',
    displayName: 'Planning Center Webhooks',
    className: 'PlanningCenterWebhooks',
    nodeName: 'planningCenterWebhooks',
    sourceUrl: 'https://api.planningcenteronline.com/webhooks/v2/open_api/2022-10-20',
    snapshotDate: '2022-10-20',
    generate: true,
  },
];

export const generatedProductConfigs = productConfigs.filter((config) => config.generate);

export function snapshotPath(config: ProductConfig): string {
  return `openapi/${config.product}/${config.snapshotDate}.json`;
}

export function generatedNodePath(config: ProductConfig): string {
  return `nodes/generated/${config.product}/${config.className}.node.ts`;
}
