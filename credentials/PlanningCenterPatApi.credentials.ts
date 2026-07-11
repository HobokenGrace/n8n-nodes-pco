import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class PlanningCenterPatApi implements ICredentialType {
  name = 'planningCenterPatApi';

  displayName = 'Planning Center PAT API';

  documentationUrl = 'https://developer.planning.center/docs/#/overview/authentication';

  properties: INodeProperties[] = [
    {
      displayName: 'Application ID',
      name: 'applicationId',
      type: 'string',
      default: '',
      required: true,
    },
    {
      displayName: 'Secret',
      name: 'secret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.planningcenteronline.com',
      required: true,
      description: 'API root URL. Override only for proxies or alternate Planning Center API roots.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.applicationId}}',
        password: '={{$credentials.secret}}',
        sendImmediately: true,
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v2/personal_access_tokens',
      method: 'GET',
    },
    rules: [
      {
        type: 'responseCode',
        properties: {
          value: 401,
          message:
            'Planning Center returned 401 Unauthorized while testing /api/v2/personal_access_tokens. Check that Application ID and Secret were copied from the same Personal Access Token with no extra whitespace.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 403,
          message:
            'Planning Center returned 403 Forbidden while testing /api/v2/personal_access_tokens. The PAT authenticated, but this user or token cannot access the API app personal access token endpoint.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 404,
          message:
            'Planning Center returned 404 Not Found while testing /api/v2/personal_access_tokens. Check the Base URL; it should usually be https://api.planningcenteronline.com.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 429,
          message:
            'Planning Center returned 429 Too Many Requests while testing credentials. Wait and retry after the rate-limit window resets.',
        },
      },
    ],
  };
}
