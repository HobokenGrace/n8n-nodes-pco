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
      headers: {
        Authorization: '=Basic {{$base64($credentials.applicationId + ":" + $credentials.secret)}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/people/v2/me',
      method: 'GET',
    },
  };
}
