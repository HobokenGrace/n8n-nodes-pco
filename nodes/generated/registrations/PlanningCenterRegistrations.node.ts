import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { executeItemWithContinueOnFail } from '../../../src/runtime/execute';
import { normalizeJsonApiResponse } from '../../../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../../../src/runtime/pagination';
import { planningCenterApiRequest } from '../../../src/runtime/request';

interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
}

interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

interface GeneratedQueryOption {
  name: string;
  displayName: string;
  type: 'boolean' | 'number' | 'string';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
}

interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
}

interface Operation {
  id: string;
  resource: string;
  operation: string;
  description: string;
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  pathParameters: GeneratedField[];
  queryParameters: GeneratedField[];
  queryOptions: GeneratedQueryOption[];
  attributeFields: GeneratedField[];
  relationshipFields: GeneratedRelationshipField[];
}

const OPERATIONS: Operation[] = [
  {
    "id": "getAttendees",
    "resource": "Attendee",
    "operation": "List Attendees",
    "description": "GET /attendees",
    "method": "GET",
    "path": "/registrations/v2/attendees",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdEmergencyContact",
    "resource": "Attendee",
    "operation": "List Emergency Contact (via Attendee)",
    "description": "GET /attendees/{attendee_id}/emergency_contact",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/emergency_contact",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdPerson",
    "resource": "Attendee",
    "operation": "List Person (via Attendee)",
    "description": "GET /attendees/{attendee_id}/person",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/person",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdRegistration",
    "resource": "Attendee",
    "operation": "List Registration (via Attendee)",
    "description": "GET /attendees/{attendee_id}/registration",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/registration",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdSelectionType",
    "resource": "Attendee",
    "operation": "List Selection Type (via Attendee)",
    "description": "GET /attendees/{attendee_id}/selection_type",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/selection_type",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeId",
    "resource": "Attendee",
    "operation": "Get Attendee",
    "description": "GET /attendees/{attendee_id}",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdEmergencyContactEmergencyContactId",
    "resource": "Attendee",
    "operation": "Get Emergency Contact (via Attendee)",
    "description": "GET /attendees/{attendee_id}/emergency_contact/{emergency_contact_id}",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/emergency_contact/{emergency_contact_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "emergencyContactId",
        "sourceName": "emergency_contact_id",
        "displayName": "Emergency Contact ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdPersonPersonId",
    "resource": "Attendee",
    "operation": "Get Person (via Attendee)",
    "description": "GET /attendees/{attendee_id}/person/{person_id}",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/person/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdRegistrationRegistrationId",
    "resource": "Attendee",
    "operation": "Get Registration (via Attendee)",
    "description": "GET /attendees/{attendee_id}/registration/{registration_id}",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/registration/{registration_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getAttendeesAttendeeIdSelectionTypeSelectionTypeId",
    "resource": "Attendee",
    "operation": "Get Selection Type (via Attendee)",
    "description": "GET /attendees/{attendee_id}/selection_type/{selection_type_id}",
    "method": "GET",
    "path": "/registrations/v2/attendees/{attendee_id}/selection_type/{selection_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "selectionTypeId",
        "sourceName": "selection_type_id",
        "displayName": "Selection Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampuses",
    "resource": "Campus",
    "operation": "List Campuses",
    "description": "GET /campuses",
    "method": "GET",
    "path": "/registrations/v2/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCampusesCampusId",
    "resource": "Campus",
    "operation": "Get Campus",
    "description": "GET /campuses/{campus_id}",
    "method": "GET",
    "path": "/registrations/v2/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCategories",
    "resource": "Category",
    "operation": "List Categories",
    "description": "GET /categories",
    "method": "GET",
    "path": "/registrations/v2/categories",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getCategoriesCategoryId",
    "resource": "Category",
    "operation": "Get Category",
    "description": "GET /categories/{category_id}",
    "method": "GET",
    "path": "/registrations/v2/categories/{category_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "categoryId",
        "sourceName": "category_id",
        "displayName": "Category ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeople",
    "resource": "Person",
    "operation": "List People",
    "description": "GET /people",
    "method": "GET",
    "path": "/registrations/v2/people",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getMe",
    "resource": "Person",
    "operation": "Get Me",
    "description": "GET /me",
    "method": "GET",
    "path": "/registrations/v2/me",
    "deprecated": false,
    "isList": false,
    "pathParameters": [],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getPeoplePersonId",
    "resource": "Person",
    "operation": "Get Person",
    "description": "GET /people/{person_id}",
    "method": "GET",
    "path": "/registrations/v2/people/{person_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrationsRegistrationIdCreatedBy",
    "resource": "Registration",
    "operation": "List Created By (via Registration)",
    "description": "GET /registrations/{registration_id}/created_by",
    "method": "GET",
    "path": "/registrations/v2/registrations/{registration_id}/created_by",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrationsRegistrationIdRegistrantContact",
    "resource": "Registration",
    "operation": "List Registrant Contact (via Registration)",
    "description": "GET /registrations/{registration_id}/registrant_contact",
    "method": "GET",
    "path": "/registrations/v2/registrations/{registration_id}/registrant_contact",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrations",
    "resource": "Registration",
    "operation": "List Registrations",
    "description": "GET /registrations",
    "method": "GET",
    "path": "/registrations/v2/registrations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrationsRegistrationIdCreatedByCreatedById",
    "resource": "Registration",
    "operation": "Get Created By (via Registration)",
    "description": "GET /registrations/{registration_id}/created_by/{created_by_id}",
    "method": "GET",
    "path": "/registrations/v2/registrations/{registration_id}/created_by/{created_by_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "createdById",
        "sourceName": "created_by_id",
        "displayName": "Created By ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrationsRegistrationIdRegistrantContactRegistrantContactId",
    "resource": "Registration",
    "operation": "Get Registrant Contact (via Registration)",
    "description": "GET /registrations/{registration_id}/registrant_contact/{registrant_contact_id}",
    "method": "GET",
    "path": "/registrations/v2/registrations/{registration_id}/registrant_contact/{registrant_contact_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "registrantContactId",
        "sourceName": "registrant_contact_id",
        "displayName": "Registrant Contact ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getRegistrationsRegistrationId",
    "resource": "Registration",
    "operation": "Get Registration",
    "description": "GET /registrations/{registration_id}",
    "method": "GET",
    "path": "/registrations/v2/registrations/{registration_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdAttendees",
    "resource": "Signup",
    "operation": "List Attendees (via Signup)",
    "description": "GET /signups/{signup_id}/attendees",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/attendees",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdCampuses",
    "resource": "Signup",
    "operation": "List Campuses (via Signup)",
    "description": "GET /signups/{signup_id}/campuses",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/campuses",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdCategories",
    "resource": "Signup",
    "operation": "List Categories (via Signup)",
    "description": "GET /signups/{signup_id}/categories",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/categories",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdNextSignupTime",
    "resource": "Signup",
    "operation": "List Next Signup Time (via Signup)",
    "description": "GET /signups/{signup_id}/next_signup_time",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/next_signup_time",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdRegistrations",
    "resource": "Signup",
    "operation": "List Registrations (via Signup)",
    "description": "GET /signups/{signup_id}/registrations",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/registrations",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSelectionTypes",
    "resource": "Signup",
    "operation": "List Selection Types (via Signup)",
    "description": "GET /signups/{signup_id}/selection_types",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/selection_types",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSignupLocation",
    "resource": "Signup",
    "operation": "List Signup Location (via Signup)",
    "description": "GET /signups/{signup_id}/signup_location",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/signup_location",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSignupTimes",
    "resource": "Signup",
    "operation": "List Signup Times (via Signup)",
    "description": "GET /signups/{signup_id}/signup_times",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/signup_times",
    "deprecated": false,
    "isList": true,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignups",
    "resource": "Signup",
    "operation": "List Signups",
    "description": "GET /signups",
    "method": "GET",
    "path": "/registrations/v2/signups",
    "deprecated": false,
    "isList": true,
    "pathParameters": [],
    "queryParameters": [
      {
        "name": "filter",
        "sourceName": "filter",
        "displayName": "Filter",
        "required": false,
        "type": "string"
      },
      {
        "name": "whereid",
        "sourceName": "where[id]",
        "displayName": "Where[id]",
        "required": false,
        "type": "string"
      },
      {
        "name": "wherename",
        "sourceName": "where[name]",
        "displayName": "Where[name]",
        "required": false,
        "type": "string"
      },
      {
        "name": "order",
        "sourceName": "order",
        "displayName": "Order",
        "required": false,
        "type": "string"
      },
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "filter",
        "displayName": "Filter",
        "type": "string",
        "kind": "single",
        "sourceName": "filter"
      },
      {
        "name": "whereid",
        "displayName": "ID",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]"
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdAttendeesAttendeeId",
    "resource": "Signup",
    "operation": "Get Attendee (via Signup)",
    "description": "GET /signups/{signup_id}/attendees/{attendee_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/attendees/{attendee_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdCampusesCampusId",
    "resource": "Signup",
    "operation": "Get Campus (via Signup)",
    "description": "GET /signups/{signup_id}/campuses/{campus_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/campuses/{campus_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdCategoriesCategoryId",
    "resource": "Signup",
    "operation": "Get Category (via Signup)",
    "description": "GET /signups/{signup_id}/categories/{category_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/categories/{category_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "categoryId",
        "sourceName": "category_id",
        "displayName": "Category ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdNextSignupTimeNextSignupTimeId",
    "resource": "Signup",
    "operation": "Get Next Signup Time (via Signup)",
    "description": "GET /signups/{signup_id}/next_signup_time/{next_signup_time_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/next_signup_time/{next_signup_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "nextSignupTimeId",
        "sourceName": "next_signup_time_id",
        "displayName": "Next Signup Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdRegistrationsRegistrationId",
    "resource": "Signup",
    "operation": "Get Registration (via Signup)",
    "description": "GET /signups/{signup_id}/registrations/{registration_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/registrations/{registration_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSelectionTypesSelectionTypeId",
    "resource": "Signup",
    "operation": "Get Selection Type (via Signup)",
    "description": "GET /signups/{signup_id}/selection_types/{selection_type_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/selection_types/{selection_type_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "selectionTypeId",
        "sourceName": "selection_type_id",
        "displayName": "Selection Type ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSignupLocationSignupLocationId",
    "resource": "Signup",
    "operation": "Get Signup Location (via Signup)",
    "description": "GET /signups/{signup_id}/signup_location/{signup_location_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/signup_location/{signup_location_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "signupLocationId",
        "sourceName": "signup_location_id",
        "displayName": "Signup Location ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupIdSignupTimesSignupTimeId",
    "resource": "Signup",
    "operation": "Get Signup Time (via Signup)",
    "description": "GET /signups/{signup_id}/signup_times/{signup_time_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}/signup_times/{signup_time_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      },
      {
        "name": "signupTimeId",
        "sourceName": "signup_time_id",
        "displayName": "Signup Time ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [],
    "queryOptions": [],
    "attributeFields": [],
    "relationshipFields": []
  },
  {
    "id": "getSignupsSignupId",
    "resource": "Signup",
    "operation": "Get Signup",
    "description": "GET /signups/{signup_id}",
    "method": "GET",
    "path": "/registrations/v2/signups/{signup_id}",
    "deprecated": false,
    "isList": false,
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string"
      }
    ],
    "queryParameters": [
      {
        "name": "include",
        "sourceName": "include",
        "displayName": "Include",
        "required": false,
        "type": "string"
      }
    ],
    "queryOptions": [
      {
        "name": "include",
        "displayName": "Include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Attendee\",\"value\":\"Attendee\"},{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Category\",\"value\":\"Category\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Registration\",\"value\":\"Registration\"},{\"name\":\"Signup\",\"value\":\"Signup\"}],\n      default: \"Attendee\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"]}},\n      options: [{\"name\":\"List Attendees\",\"value\":\"getAttendees\",\"description\":\"GET /attendees\",\"action\":\"List Attendees\"},{\"name\":\"List Emergency Contact (via Attendee)\",\"value\":\"getAttendeesAttendeeIdEmergencyContact\",\"description\":\"GET /attendees/{attendee_id}/emergency_contact\",\"action\":\"List Emergency Contact (via Attendee)\"},{\"name\":\"List Person (via Attendee)\",\"value\":\"getAttendeesAttendeeIdPerson\",\"description\":\"GET /attendees/{attendee_id}/person\",\"action\":\"List Person (via Attendee)\"},{\"name\":\"List Registration (via Attendee)\",\"value\":\"getAttendeesAttendeeIdRegistration\",\"description\":\"GET /attendees/{attendee_id}/registration\",\"action\":\"List Registration (via Attendee)\"},{\"name\":\"List Selection Type (via Attendee)\",\"value\":\"getAttendeesAttendeeIdSelectionType\",\"description\":\"GET /attendees/{attendee_id}/selection_type\",\"action\":\"List Selection Type (via Attendee)\"},{\"name\":\"Get Attendee\",\"value\":\"getAttendeesAttendeeId\",\"description\":\"GET /attendees/{attendee_id}\",\"action\":\"Get Attendee\"},{\"name\":\"Get Emergency Contact (via Attendee)\",\"value\":\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\",\"description\":\"GET /attendees/{attendee_id}/emergency_contact/{emergency_contact_id}\",\"action\":\"Get Emergency Contact (via Attendee)\"},{\"name\":\"Get Person (via Attendee)\",\"value\":\"getAttendeesAttendeeIdPersonPersonId\",\"description\":\"GET /attendees/{attendee_id}/person/{person_id}\",\"action\":\"Get Person (via Attendee)\"},{\"name\":\"Get Registration (via Attendee)\",\"value\":\"getAttendeesAttendeeIdRegistrationRegistrationId\",\"description\":\"GET /attendees/{attendee_id}/registration/{registration_id}\",\"action\":\"Get Registration (via Attendee)\"},{\"name\":\"Get Selection Type (via Attendee)\",\"value\":\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\",\"description\":\"GET /attendees/{attendee_id}/selection_type/{selection_type_id}\",\"action\":\"Get Selection Type (via Attendee)\"}],\n      default: \"getAttendees\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"List Campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"List Campuses\"},{\"name\":\"Get Campus\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"Get Campus\"}],\n      default: \"getCampuses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Category\"]}},\n      options: [{\"name\":\"List Categories\",\"value\":\"getCategories\",\"description\":\"GET /categories\",\"action\":\"List Categories\"},{\"name\":\"Get Category\",\"value\":\"getCategoriesCategoryId\",\"description\":\"GET /categories/{category_id}\",\"action\":\"Get Category\"}],\n      default: \"getCategories\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"Get Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"Get Me\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"}],\n      default: \"getPeople\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"]}},\n      options: [{\"name\":\"List Created By (via Registration)\",\"value\":\"getRegistrationsRegistrationIdCreatedBy\",\"description\":\"GET /registrations/{registration_id}/created_by\",\"action\":\"List Created By (via Registration)\"},{\"name\":\"List Registrant Contact (via Registration)\",\"value\":\"getRegistrationsRegistrationIdRegistrantContact\",\"description\":\"GET /registrations/{registration_id}/registrant_contact\",\"action\":\"List Registrant Contact (via Registration)\"},{\"name\":\"List Registrations\",\"value\":\"getRegistrations\",\"description\":\"GET /registrations\",\"action\":\"List Registrations\"},{\"name\":\"Get Created By (via Registration)\",\"value\":\"getRegistrationsRegistrationIdCreatedByCreatedById\",\"description\":\"GET /registrations/{registration_id}/created_by/{created_by_id}\",\"action\":\"Get Created By (via Registration)\"},{\"name\":\"Get Registrant Contact (via Registration)\",\"value\":\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\",\"description\":\"GET /registrations/{registration_id}/registrant_contact/{registrant_contact_id}\",\"action\":\"Get Registrant Contact (via Registration)\"},{\"name\":\"Get Registration\",\"value\":\"getRegistrationsRegistrationId\",\"description\":\"GET /registrations/{registration_id}\",\"action\":\"Get Registration\"}],\n      default: \"getRegistrationsRegistrationIdCreatedBy\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"]}},\n      options: [{\"name\":\"List Attendees (via Signup)\",\"value\":\"getSignupsSignupIdAttendees\",\"description\":\"GET /signups/{signup_id}/attendees\",\"action\":\"List Attendees (via Signup)\"},{\"name\":\"List Campuses (via Signup)\",\"value\":\"getSignupsSignupIdCampuses\",\"description\":\"GET /signups/{signup_id}/campuses\",\"action\":\"List Campuses (via Signup)\"},{\"name\":\"List Categories (via Signup)\",\"value\":\"getSignupsSignupIdCategories\",\"description\":\"GET /signups/{signup_id}/categories\",\"action\":\"List Categories (via Signup)\"},{\"name\":\"List Next Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdNextSignupTime\",\"description\":\"GET /signups/{signup_id}/next_signup_time\",\"action\":\"List Next Signup Time (via Signup)\"},{\"name\":\"List Registrations (via Signup)\",\"value\":\"getSignupsSignupIdRegistrations\",\"description\":\"GET /signups/{signup_id}/registrations\",\"action\":\"List Registrations (via Signup)\"},{\"name\":\"List Selection Types (via Signup)\",\"value\":\"getSignupsSignupIdSelectionTypes\",\"description\":\"GET /signups/{signup_id}/selection_types\",\"action\":\"List Selection Types (via Signup)\"},{\"name\":\"List Signup Location (via Signup)\",\"value\":\"getSignupsSignupIdSignupLocation\",\"description\":\"GET /signups/{signup_id}/signup_location\",\"action\":\"List Signup Location (via Signup)\"},{\"name\":\"List Signup Times (via Signup)\",\"value\":\"getSignupsSignupIdSignupTimes\",\"description\":\"GET /signups/{signup_id}/signup_times\",\"action\":\"List Signup Times (via Signup)\"},{\"name\":\"List Signups\",\"value\":\"getSignups\",\"description\":\"GET /signups\",\"action\":\"List Signups\"},{\"name\":\"Get Attendee (via Signup)\",\"value\":\"getSignupsSignupIdAttendeesAttendeeId\",\"description\":\"GET /signups/{signup_id}/attendees/{attendee_id}\",\"action\":\"Get Attendee (via Signup)\"},{\"name\":\"Get Campus (via Signup)\",\"value\":\"getSignupsSignupIdCampusesCampusId\",\"description\":\"GET /signups/{signup_id}/campuses/{campus_id}\",\"action\":\"Get Campus (via Signup)\"},{\"name\":\"Get Category (via Signup)\",\"value\":\"getSignupsSignupIdCategoriesCategoryId\",\"description\":\"GET /signups/{signup_id}/categories/{category_id}\",\"action\":\"Get Category (via Signup)\"},{\"name\":\"Get Next Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\",\"description\":\"GET /signups/{signup_id}/next_signup_time/{next_signup_time_id}\",\"action\":\"Get Next Signup Time (via Signup)\"},{\"name\":\"Get Registration (via Signup)\",\"value\":\"getSignupsSignupIdRegistrationsRegistrationId\",\"description\":\"GET /signups/{signup_id}/registrations/{registration_id}\",\"action\":\"Get Registration (via Signup)\"},{\"name\":\"Get Selection Type (via Signup)\",\"value\":\"getSignupsSignupIdSelectionTypesSelectionTypeId\",\"description\":\"GET /signups/{signup_id}/selection_types/{selection_type_id}\",\"action\":\"Get Selection Type (via Signup)\"},{\"name\":\"Get Signup Location (via Signup)\",\"value\":\"getSignupsSignupIdSignupLocationSignupLocationId\",\"description\":\"GET /signups/{signup_id}/signup_location/{signup_location_id}\",\"action\":\"Get Signup Location (via Signup)\"},{\"name\":\"Get Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdSignupTimesSignupTimeId\",\"description\":\"GET /signups/{signup_id}/signup_times/{signup_time_id}\",\"action\":\"Get Signup Time (via Signup)\"},{\"name\":\"Get Signup\",\"value\":\"getSignupsSignupId\",\"description\":\"GET /signups/{signup_id}\",\"action\":\"Get Signup\"}],\n      default: \"getSignupsSignupIdAttendees\",\n    },\n    {\n      displayName: 'Options',\n      name: \"getAttendees_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendees_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendees_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"],\"getAttendees_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContact_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdEmergencyContact_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdEmergencyContact_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"],\"getAttendeesAttendeeIdEmergencyContact_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdPerson_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"],\"getAttendeesAttendeeIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdRegistration_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getAttendeesAttendeeIdRegistration_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdRegistration_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdRegistration_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"],\"getAttendeesAttendeeIdRegistration_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdSelectionType_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdSelectionType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdSelectionType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"],\"getAttendeesAttendeeIdSelectionType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getAttendeesAttendeeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContactEmergencyContactId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n    },\n    {\n      displayName: \"Emergency Contact ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContactEmergencyContactId_emergencyContactId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdPersonPersonId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getAttendeesAttendeeIdPersonPersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdSelectionTypeSelectionTypeId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n    },\n    {\n      displayName: \"Selection Type ID\",\n      name: \"getAttendeesAttendeeIdSelectionTypeSelectionTypeId_selectionTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCategories_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCategories_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"],\"getCategories_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Category ID\",\n      name: \"getCategoriesCategoryId_categoryId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategoriesCategoryId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdCreatedBy_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrationsRegistrationIdCreatedBy_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrationsRegistrationIdCreatedBy_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"],\"getRegistrationsRegistrationIdCreatedBy_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContact_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrationsRegistrationIdRegistrantContact_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrationsRegistrationIdRegistrantContact_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"],\"getRegistrationsRegistrationIdRegistrantContact_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getRegistrations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"],\"getRegistrations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdCreatedByCreatedById_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n    },\n    {\n      displayName: \"Created By ID\",\n      name: \"getRegistrationsRegistrationIdCreatedByCreatedById_createdById\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n    },\n    {\n      displayName: \"Registrant Contact ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId_registrantContactId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationId_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getRegistrationsRegistrationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdAttendees_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdAttendees_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Active\",\"value\":\"active\"},{\"name\":\"Waitlist\",\"value\":\"waitlist\"},{\"name\":\"Canceled\",\"value\":\"canceled\"}],\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdAttendees_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdAttendees_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"],\"getSignupsSignupIdAttendees_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCampuses_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"],\"getSignupsSignupIdCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCategories_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdCategories_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdCategories_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"],\"getSignupsSignupIdCategories_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdNextSignupTime_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdNextSignupTime_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdNextSignupTime_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"],\"getSignupsSignupIdNextSignupTime_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdRegistrations_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdRegistrations_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdRegistrations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdRegistrations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"],\"getSignupsSignupIdRegistrations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSelectionTypes_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdSelectionTypes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Publicly Available\",\"value\":\"publicly_available\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSelectionTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSelectionTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"],\"getSignupsSignupIdSelectionTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupLocation_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSignupLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSignupLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"],\"getSignupsSignupIdSignupLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupTimes_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdSignupTimes_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Future\",\"value\":\"future\"},{\"name\":\"Past\",\"value\":\"past\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSignupTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSignupTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"],\"getSignupsSignupIdSignupTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignups_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\"displayName\":\"Filter\",\"name\":\"filter\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Archived\",\"value\":\"archived\"},{\"name\":\"Unarchived\",\"value\":\"unarchived\"}],\"default\":\"\"}]},{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]},{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]},{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campuses\",\"value\":\"campuses\"},{\"name\":\"Categories\",\"value\":\"categories\"},{\"name\":\"Next Signup Time\",\"value\":\"next_signup_time\"},{\"name\":\"Selection Types\",\"value\":\"selection_types\"},{\"name\":\"Signup Location\",\"value\":\"signup_location\"},{\"name\":\"Signup Times\",\"value\":\"signup_times\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"],\"getSignups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdAttendeesAttendeeId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getSignupsSignupIdAttendeesAttendeeId_attendeeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdAttendeesAttendeeId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCampusesCampusId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getSignupsSignupIdCampusesCampusId_campusId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCategoriesCategoryId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: \"Category ID\",\n      name: \"getSignupsSignupIdCategoriesCategoryId_categoryId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdNextSignupTimeNextSignupTimeId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n    },\n    {\n      displayName: \"Next Signup Time ID\",\n      name: \"getSignupsSignupIdNextSignupTimeNextSignupTimeId_nextSignupTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_registrationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSelectionTypesSelectionTypeId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n    },\n    {\n      displayName: \"Selection Type ID\",\n      name: \"getSignupsSignupIdSelectionTypesSelectionTypeId_selectionTypeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupLocationSignupLocationId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n    },\n    {\n      displayName: \"Signup Location ID\",\n      name: \"getSignupsSignupIdSignupLocationSignupLocationId_signupLocationId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupTimesSignupTimeId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n    },\n    {\n      displayName: \"Signup Time ID\",\n      name: \"getSignupsSignupIdSignupTimesSignupTimeId_signupTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupId_signupId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n    },\n    {\n      displayName: 'Options',\n      name: \"getSignupsSignupId_options\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Option',\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campuses\",\"value\":\"campuses\"},{\"name\":\"Categories\",\"value\":\"categories\"},{\"name\":\"Next Signup Time\",\"value\":\"next_signup_time\"},{\"name\":\"Selection Types\",\"value\":\"selection_types\"},{\"name\":\"Signup Location\",\"value\":\"signup_location\"},{\"name\":\"Signup Times\",\"value\":\"signup_times\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
    }
  }
}

function addQueryOptions(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const options = context.getNodeParameter(`${operation.id}_options`, itemIndex, {}) as Record<string, { operator?: string; value?: unknown } | undefined>;
  for (const option of operation.queryOptions) {
    const selected = options[option.name];
    const value = selected?.value;
    if (value === undefined || value === '') continue;

    if (option.kind === 'operator') {
      const operator = option.operators?.find((candidate) => candidate.value === selected?.operator) ?? option.operators?.[0];
      if (operator) qs[operator.sourceName] = value;
      continue;
    }

    if (option.sourceName) {
      qs[option.sourceName] = value;
    }
  }
}

function buildBody(context: IExecuteFunctions, itemIndex: number, operation: Operation): unknown {
  if (!['POST', 'PUT', 'PATCH'].includes(operation.method)) return undefined;

  const bodyMode = context.getNodeParameter('bodyMode', itemIndex, 'fields') as string;
  if (bodyMode === 'rawJson') {
    return JSON.parse(context.getNodeParameter('rawJsonBody', itemIndex, '{}') as string);
  }

  const attributes: Record<string, unknown> = {};
  for (const field of operation.attributeFields) {
    const value = field.required
      ? context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex)
      : context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '');
    if (value !== undefined && value !== '') {
      attributes[field.sourceName] = value;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const value = context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '') as string;
    if (!value) continue;
    const ids = field.multiple ? value.split(',').map((id) => id.trim()).filter(Boolean) : [value];
    relationships[field.relationshipName] = {
      data: field.multiple
        ? ids.map((id) => ({ type: field.relationshipType, id }))
        : { type: field.relationshipType, id: ids[0] },
    };
  }

  return {
    data: {
      type: operation.resource,
      ...(Object.keys(attributes).length ? { attributes } : {}),
      ...(Object.keys(relationships).length ? { relationships } : {}),
    },
  };
}

function buildPath(context: IExecuteFunctions, itemIndex: number, operation: Operation): string {
  let path = operation.path;
  for (const parameter of operation.pathParameters) {
    const value = context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex) as string;
    path = path.replace(`{${parameter.sourceName}}`, encodeURIComponent(value));
  }
  return path;
}

async function executeOperation(context: IExecuteFunctions, itemIndex: number, operation: Operation): Promise<INodeExecutionData[]> {
  const qs: IDataObject = {};
  addQueryOptions(context, itemIndex, operation, qs);
  addAdditionalQuery(context, itemIndex, operation, qs);

  const request = {
    method: operation.method,
    path: buildPath(context, itemIndex, operation),
    qs,
    body: buildBody(context, itemIndex, operation),
  };

  const data = operation.isList
    ? await collectPaginatedPlanningCenterResults.call(context, request, {
        returnAll: context.getNodeParameter(`${operation.id}_returnAll`, itemIndex, false) as boolean,
        limit: context.getNodeParameter(`${operation.id}_limit`, itemIndex, 100) as number,
      })
    : normalizeJsonApiResponse(await planningCenterApiRequest.call(context, request));

  return data.map((json) => ({ json, pairedItem: { item: itemIndex } }));
}

export class PlanningCenterRegistrations implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Planning Center Registrations",
    name: "planningCenterRegistrations",
    icon: 'file:registrations.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Planning Center Registrations generated from the Planning Center OpenAPI snapshot.",
    defaults: {
      name: "Planning Center Registrations",
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'planningCenterPatApi',
        required: true,
      },
    ],
    properties: NODE_PROPERTIES,
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const resource = this.getNodeParameter('resource', itemIndex) as string;
      const operationId = this.getNodeParameter('operation', itemIndex) as string;
      const operation = OPERATIONS.find((candidate) => candidate.resource === resource && candidate.id === operationId);
      if (!operation) {
        throw new Error(`Unsupported Planning Center Registrations operation: ${resource}.${operationId}`);
      }

      returnData.push(...(await executeItemWithContinueOnFail(this, itemIndex, () => executeOperation(this, itemIndex, operation))));
    }

    return [returnData];
  }
}
