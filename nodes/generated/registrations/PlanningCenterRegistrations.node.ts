import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, ILoadOptionsFunctions, INodeExecutionData, INodeListSearchResult, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { executeItemWithContinueOnFail } from '../../../src/runtime/execute';
import { normalizeJsonApiResponse } from '../../../src/runtime/jsonApi';
import { collectPaginatedPlanningCenterResults } from '../../../src/runtime/pagination';
import { planningCenterApiRequest } from '../../../src/runtime/request';
import { extractResourceLocatorId } from '../../../src/runtime/resourceLocator';

interface GeneratedLookupParentBinding {
  sourceName: string;
  fieldName: string;
}

interface GeneratedLookupSplitNameSearch {
  firstNameFilter: string;
  lastNameFilter: string;
}

interface GeneratedLookup {
  methodName: string;
  sourcePath: string;
  parentBindings: GeneratedLookupParentBinding[];
  searchFilter?: string;
  splitNameSearch?: GeneratedLookupSplitNameSearch;
  labelFields: string[];
  resultLimit: number;
}

interface GeneratedField {
  name: string;
  sourceName: string;
  displayName: string;
  required: boolean;
  type: 'boolean' | 'number' | 'string';
  lookup?: GeneratedLookup;
}

interface GeneratedQueryOptionOperator {
  name: string;
  value: string;
  sourceName: string;
}

interface GeneratedQueryOption {
  name: string;
  displayName: string;
  group: 'filter' | 'order' | 'include';
  type: 'boolean' | 'number' | 'string';
  kind: 'single' | 'operator';
  sourceName?: string;
  operators?: GeneratedQueryOptionOperator[];
  lookup?: GeneratedLookup;
}

interface QueryOptionSelection {
  operator?: string;
  value?: unknown;
}

interface GeneratedRelationshipField {
  name: string;
  displayName: string;
  relationshipName: string;
  relationshipType: string;
  multiple: boolean;
  lookup?: GeneratedLookup;
}

interface Operation {
  id: string;
  resource: string;
  jsonApiType?: string;
  operation: string;
  description: string;
  method: IHttpRequestMethods;
  path: string;
  deprecated: boolean;
  isList: boolean;
  lookupTarget: string;
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
    "lookupTarget": "attendee",
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "emergency contact",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdEmergencyContactAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdPersonAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdRegistrationAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "selection type",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdSelectionTypeAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "attendee",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
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
    "lookupTarget": "emergency contact",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "emergencyContactId",
        "sourceName": "emergency_contact_id",
        "displayName": "Emergency Contact ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId",
          "sourcePath": "/registrations/v2/attendees/{attendee_id}/emergency_contact",
          "parentBindings": [
            {
              "sourceName": "attendee_id",
              "fieldName": "getAttendeesAttendeeIdEmergencyContactEmergencyContactId_attendeeId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdPersonPersonIdPersonId",
          "sourcePath": "/registrations/v2/attendees/{attendee_id}/person",
          "parentBindings": [
            {
              "sourceName": "attendee_id",
              "fieldName": "getAttendeesAttendeeIdPersonPersonId_attendeeId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId",
          "sourcePath": "/registrations/v2/attendees/{attendee_id}/registration",
          "parentBindings": [
            {
              "sourceName": "attendee_id",
              "fieldName": "getAttendeesAttendeeIdRegistrationRegistrationId_attendeeId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
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
    "lookupTarget": "selection type",
    "pathParameters": [
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId",
          "sourcePath": "/registrations/v2/attendees",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "selectionTypeId",
        "sourceName": "selection_type_id",
        "displayName": "Selection Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId",
          "sourcePath": "/registrations/v2/attendees/{attendee_id}/selection_type",
          "parentBindings": [
            {
              "sourceName": "attendee_id",
              "fieldName": "getAttendeesAttendeeIdSelectionTypeSelectionTypeId_attendeeId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "campus",
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
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCampusesCampusIdCampusId",
          "sourcePath": "/registrations/v2/campuses",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "category",
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
    "lookupTarget": "category",
    "pathParameters": [
      {
        "name": "categoryId",
        "sourceName": "category_id",
        "displayName": "Category ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetCategoriesCategoryIdCategoryId",
          "sourcePath": "/registrations/v2/categories",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
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
    "lookupTarget": "person",
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "personId",
        "sourceName": "person_id",
        "displayName": "Person ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetPeoplePersonIdPersonId",
          "sourcePath": "/registrations/v2/people",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRegistrationsRegistrationIdCreatedByRegistrationId",
          "sourcePath": "/registrations/v2/registrations",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId",
          "sourcePath": "/registrations/v2/registrations",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId",
          "sourcePath": "/registrations/v2/registrations",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "person",
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId",
          "sourcePath": "/registrations/v2/registrations",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
    "pathParameters": [
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetRegistrationsRegistrationIdRegistrationId",
          "sourcePath": "/registrations/v2/registrations",
          "parentBindings": [],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
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
    "lookupTarget": "attendee",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdAttendeesSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCampusesSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "category",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCategoriesSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup time",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdNextSignupTimeSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdRegistrationsSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "selection type",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSelectionTypesSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "queryOptions": [],
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
    "lookupTarget": "signup location",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupLocationSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup time",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupTimesSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "queryOptions": [],
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
    "lookupTarget": "signup",
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
        "name": "whereid",
        "displayName": "ID",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[id]",
        "lookup": {
          "methodName": "searchGetSignupsWhereid",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "wherename",
        "displayName": "Name",
        "group": "filter",
        "type": "string",
        "kind": "single",
        "sourceName": "where[name]"
      },
      {
        "name": "order",
        "displayName": "Order",
        "group": "order",
        "type": "string",
        "kind": "single",
        "sourceName": "order"
      },
      {
        "name": "include",
        "displayName": "Include",
        "group": "include",
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
    "lookupTarget": "attendee",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdAttendeesAttendeeIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "attendeeId",
        "sourceName": "attendee_id",
        "displayName": "Attendee ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/attendees",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdAttendeesAttendeeId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
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
    "lookupTarget": "campus",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCampusesCampusIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "campusId",
        "sourceName": "campus_id",
        "displayName": "Campus ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCampusesCampusIdCampusId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/campuses",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdCampusesCampusId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "category",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCategoriesCategoryIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "categoryId",
        "sourceName": "category_id",
        "displayName": "Category ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdCategoriesCategoryIdCategoryId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/categories",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdCategoriesCategoryId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup time",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "registration",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "registrationId",
        "sourceName": "registration_id",
        "displayName": "Registration ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/registrations",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdRegistrationsRegistrationId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
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
    "lookupTarget": "selection type",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "selectionTypeId",
        "sourceName": "selection_type_id",
        "displayName": "Selection Type ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/selection_types",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdSelectionTypesSelectionTypeId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup location",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "signupLocationId",
        "sourceName": "signup_location_id",
        "displayName": "Signup Location ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/signup_location",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdSignupLocationSignupLocationId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup time",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
      },
      {
        "name": "signupTimeId",
        "sourceName": "signup_time_id",
        "displayName": "Signup Time ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId",
          "sourcePath": "/registrations/v2/signups/{signup_id}/next_signup_time",
          "parentBindings": [
            {
              "sourceName": "signup_id",
              "fieldName": "getSignupsSignupIdSignupTimesSignupTimeId_signupId"
            }
          ],
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
    "lookupTarget": "signup",
    "pathParameters": [
      {
        "name": "signupId",
        "sourceName": "signup_id",
        "displayName": "Signup ID",
        "required": true,
        "type": "string",
        "lookup": {
          "methodName": "searchGetSignupsSignupIdSignupId",
          "sourcePath": "/registrations/v2/signups",
          "parentBindings": [],
          "searchFilter": "where[name]",
          "labelFields": [
            "name",
            "full_name",
            "display_name",
            "search_name",
            "path_name",
            "first_name last_name",
            "given_name last_name",
            "nickname last_name",
            "title",
            "subject",
            "label"
          ],
          "resultLimit": 25
        }
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
        "group": "include",
        "type": "string",
        "kind": "single",
        "sourceName": "include"
      }
    ],
    "attributeFields": [],
    "relationshipFields": []
  }
];

const LOOKUP_SOURCES: Record<string, GeneratedLookup> = {
  "searchGetAttendeesAttendeeIdAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdEmergencyContactAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdEmergencyContactAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId": {
    "methodName": "searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId",
    "sourcePath": "/registrations/v2/attendees/{attendee_id}/emergency_contact",
    "parentBindings": [
      {
        "sourceName": "attendee_id",
        "fieldName": "getAttendeesAttendeeIdEmergencyContactEmergencyContactId_attendeeId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdPersonAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdPersonAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdPersonPersonIdPersonId": {
    "methodName": "searchGetAttendeesAttendeeIdPersonPersonIdPersonId",
    "sourcePath": "/registrations/v2/attendees/{attendee_id}/person",
    "parentBindings": [
      {
        "sourceName": "attendee_id",
        "fieldName": "getAttendeesAttendeeIdPersonPersonId_attendeeId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdRegistrationAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdRegistrationAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId": {
    "methodName": "searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId",
    "sourcePath": "/registrations/v2/attendees/{attendee_id}/registration",
    "parentBindings": [
      {
        "sourceName": "attendee_id",
        "fieldName": "getAttendeesAttendeeIdRegistrationRegistrationId_attendeeId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdSelectionTypeAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdSelectionTypeAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId": {
    "methodName": "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId",
    "sourcePath": "/registrations/v2/attendees",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId": {
    "methodName": "searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId",
    "sourcePath": "/registrations/v2/attendees/{attendee_id}/selection_type",
    "parentBindings": [
      {
        "sourceName": "attendee_id",
        "fieldName": "getAttendeesAttendeeIdSelectionTypeSelectionTypeId_attendeeId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetCampusesCampusIdCampusId": {
    "methodName": "searchGetCampusesCampusIdCampusId",
    "sourcePath": "/registrations/v2/campuses",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetCategoriesCategoryIdCategoryId": {
    "methodName": "searchGetCategoriesCategoryIdCategoryId",
    "sourcePath": "/registrations/v2/categories",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetPeoplePersonIdPersonId": {
    "methodName": "searchGetPeoplePersonIdPersonId",
    "sourcePath": "/registrations/v2/people",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId": {
    "methodName": "searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId",
    "sourcePath": "/registrations/v2/registrations",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetRegistrationsRegistrationIdCreatedByRegistrationId": {
    "methodName": "searchGetRegistrationsRegistrationIdCreatedByRegistrationId",
    "sourcePath": "/registrations/v2/registrations",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId": {
    "methodName": "searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId",
    "sourcePath": "/registrations/v2/registrations",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId": {
    "methodName": "searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId",
    "sourcePath": "/registrations/v2/registrations",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetRegistrationsRegistrationIdRegistrationId": {
    "methodName": "searchGetRegistrationsRegistrationIdRegistrationId",
    "sourcePath": "/registrations/v2/registrations",
    "parentBindings": [],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId": {
    "methodName": "searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/attendees",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdAttendeesAttendeeId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdAttendeesAttendeeIdSignupId": {
    "methodName": "searchGetSignupsSignupIdAttendeesAttendeeIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdAttendeesSignupId": {
    "methodName": "searchGetSignupsSignupIdAttendeesSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCampusesCampusIdCampusId": {
    "methodName": "searchGetSignupsSignupIdCampusesCampusIdCampusId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/campuses",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdCampusesCampusId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCampusesCampusIdSignupId": {
    "methodName": "searchGetSignupsSignupIdCampusesCampusIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCampusesSignupId": {
    "methodName": "searchGetSignupsSignupIdCampusesSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCategoriesCategoryIdCategoryId": {
    "methodName": "searchGetSignupsSignupIdCategoriesCategoryIdCategoryId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/categories",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdCategoriesCategoryId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCategoriesCategoryIdSignupId": {
    "methodName": "searchGetSignupsSignupIdCategoriesCategoryIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdCategoriesSignupId": {
    "methodName": "searchGetSignupsSignupIdCategoriesSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId": {
    "methodName": "searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdNextSignupTimeSignupId": {
    "methodName": "searchGetSignupsSignupIdNextSignupTimeSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId": {
    "methodName": "searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/registrations",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdRegistrationsRegistrationId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId": {
    "methodName": "searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdRegistrationsSignupId": {
    "methodName": "searchGetSignupsSignupIdRegistrationsSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId": {
    "methodName": "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/selection_types",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdSelectionTypesSelectionTypeId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId": {
    "methodName": "searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSelectionTypesSignupId": {
    "methodName": "searchGetSignupsSignupIdSelectionTypesSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupId": {
    "methodName": "searchGetSignupsSignupIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupLocationSignupId": {
    "methodName": "searchGetSignupsSignupIdSignupLocationSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId": {
    "methodName": "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId": {
    "methodName": "searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/signup_location",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdSignupLocationSignupLocationId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupTimesSignupId": {
    "methodName": "searchGetSignupsSignupIdSignupTimesSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId": {
    "methodName": "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId": {
    "methodName": "searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId",
    "sourcePath": "/registrations/v2/signups/{signup_id}/next_signup_time",
    "parentBindings": [
      {
        "sourceName": "signup_id",
        "fieldName": "getSignupsSignupIdSignupTimesSignupTimeId_signupId"
      }
    ],
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  },
  "searchGetSignupsWhereid": {
    "methodName": "searchGetSignupsWhereid",
    "sourcePath": "/registrations/v2/signups",
    "parentBindings": [],
    "searchFilter": "where[name]",
    "labelFields": [
      "name",
      "full_name",
      "display_name",
      "search_name",
      "path_name",
      "first_name last_name",
      "given_name last_name",
      "nickname last_name",
      "title",
      "subject",
      "label"
    ],
    "resultLimit": 25
  }
};

const NODE_PROPERTIES = Function('return ' + "[\n    {\n      displayName: 'Resource',\n      name: 'resource',\n      type: 'options',\n      noDataExpression: true,\n      options: [{\"name\":\"Attendee\",\"value\":\"Attendee\"},{\"name\":\"Campus\",\"value\":\"Campus\"},{\"name\":\"Category\",\"value\":\"Category\"},{\"name\":\"Person\",\"value\":\"Person\"},{\"name\":\"Registration\",\"value\":\"Registration\"},{\"name\":\"Signup\",\"value\":\"Signup\"}],\n      default: \"Attendee\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"]}},\n      options: [{\"name\":\"List Attendees\",\"value\":\"getAttendees\",\"description\":\"GET /attendees\",\"action\":\"List Attendees\"},{\"name\":\"List Emergency Contact (via Attendee)\",\"value\":\"getAttendeesAttendeeIdEmergencyContact\",\"description\":\"GET /attendees/{attendee_id}/emergency_contact\",\"action\":\"List Emergency Contact (via Attendee)\"},{\"name\":\"List Person (via Attendee)\",\"value\":\"getAttendeesAttendeeIdPerson\",\"description\":\"GET /attendees/{attendee_id}/person\",\"action\":\"List Person (via Attendee)\"},{\"name\":\"List Registration (via Attendee)\",\"value\":\"getAttendeesAttendeeIdRegistration\",\"description\":\"GET /attendees/{attendee_id}/registration\",\"action\":\"List Registration (via Attendee)\"},{\"name\":\"List Selection Type (via Attendee)\",\"value\":\"getAttendeesAttendeeIdSelectionType\",\"description\":\"GET /attendees/{attendee_id}/selection_type\",\"action\":\"List Selection Type (via Attendee)\"},{\"name\":\"Get Attendee\",\"value\":\"getAttendeesAttendeeId\",\"description\":\"GET /attendees/{attendee_id}\",\"action\":\"Get Attendee\"},{\"name\":\"Get Emergency Contact (via Attendee)\",\"value\":\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\",\"description\":\"GET /attendees/{attendee_id}/emergency_contact/{emergency_contact_id}\",\"action\":\"Get Emergency Contact (via Attendee)\"},{\"name\":\"Get Person (via Attendee)\",\"value\":\"getAttendeesAttendeeIdPersonPersonId\",\"description\":\"GET /attendees/{attendee_id}/person/{person_id}\",\"action\":\"Get Person (via Attendee)\"},{\"name\":\"Get Registration (via Attendee)\",\"value\":\"getAttendeesAttendeeIdRegistrationRegistrationId\",\"description\":\"GET /attendees/{attendee_id}/registration/{registration_id}\",\"action\":\"Get Registration (via Attendee)\"},{\"name\":\"Get Selection Type (via Attendee)\",\"value\":\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\",\"description\":\"GET /attendees/{attendee_id}/selection_type/{selection_type_id}\",\"action\":\"Get Selection Type (via Attendee)\"}],\n      default: \"getAttendees\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"]}},\n      options: [{\"name\":\"List Campuses\",\"value\":\"getCampuses\",\"description\":\"GET /campuses\",\"action\":\"List Campuses\"},{\"name\":\"Get Campus\",\"value\":\"getCampusesCampusId\",\"description\":\"GET /campuses/{campus_id}\",\"action\":\"Get Campus\"}],\n      default: \"getCampuses\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Category\"]}},\n      options: [{\"name\":\"List Categories\",\"value\":\"getCategories\",\"description\":\"GET /categories\",\"action\":\"List Categories\"},{\"name\":\"Get Category\",\"value\":\"getCategoriesCategoryId\",\"description\":\"GET /categories/{category_id}\",\"action\":\"Get Category\"}],\n      default: \"getCategories\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"]}},\n      options: [{\"name\":\"List People\",\"value\":\"getPeople\",\"description\":\"GET /people\",\"action\":\"List People\"},{\"name\":\"Get Me\",\"value\":\"getMe\",\"description\":\"GET /me\",\"action\":\"Get Me\"},{\"name\":\"Get Person\",\"value\":\"getPeoplePersonId\",\"description\":\"GET /people/{person_id}\",\"action\":\"Get Person\"}],\n      default: \"getPeople\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"]}},\n      options: [{\"name\":\"List Created By (via Registration)\",\"value\":\"getRegistrationsRegistrationIdCreatedBy\",\"description\":\"GET /registrations/{registration_id}/created_by\",\"action\":\"List Created By (via Registration)\"},{\"name\":\"List Registrant Contact (via Registration)\",\"value\":\"getRegistrationsRegistrationIdRegistrantContact\",\"description\":\"GET /registrations/{registration_id}/registrant_contact\",\"action\":\"List Registrant Contact (via Registration)\"},{\"name\":\"List Registrations\",\"value\":\"getRegistrations\",\"description\":\"GET /registrations\",\"action\":\"List Registrations\"},{\"name\":\"Get Created By (via Registration)\",\"value\":\"getRegistrationsRegistrationIdCreatedByCreatedById\",\"description\":\"GET /registrations/{registration_id}/created_by/{created_by_id}\",\"action\":\"Get Created By (via Registration)\"},{\"name\":\"Get Registrant Contact (via Registration)\",\"value\":\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\",\"description\":\"GET /registrations/{registration_id}/registrant_contact/{registrant_contact_id}\",\"action\":\"Get Registrant Contact (via Registration)\"},{\"name\":\"Get Registration\",\"value\":\"getRegistrationsRegistrationId\",\"description\":\"GET /registrations/{registration_id}\",\"action\":\"Get Registration\"}],\n      default: \"getRegistrationsRegistrationIdCreatedBy\",\n    },\n    {\n      displayName: 'Operation',\n      name: 'operation',\n      type: 'options',\n      noDataExpression: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"]}},\n      options: [{\"name\":\"List Attendees (via Signup)\",\"value\":\"getSignupsSignupIdAttendees\",\"description\":\"GET /signups/{signup_id}/attendees\",\"action\":\"List Attendees (via Signup)\"},{\"name\":\"List Campuses (via Signup)\",\"value\":\"getSignupsSignupIdCampuses\",\"description\":\"GET /signups/{signup_id}/campuses\",\"action\":\"List Campuses (via Signup)\"},{\"name\":\"List Categories (via Signup)\",\"value\":\"getSignupsSignupIdCategories\",\"description\":\"GET /signups/{signup_id}/categories\",\"action\":\"List Categories (via Signup)\"},{\"name\":\"List Next Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdNextSignupTime\",\"description\":\"GET /signups/{signup_id}/next_signup_time\",\"action\":\"List Next Signup Time (via Signup)\"},{\"name\":\"List Registrations (via Signup)\",\"value\":\"getSignupsSignupIdRegistrations\",\"description\":\"GET /signups/{signup_id}/registrations\",\"action\":\"List Registrations (via Signup)\"},{\"name\":\"List Selection Types (via Signup)\",\"value\":\"getSignupsSignupIdSelectionTypes\",\"description\":\"GET /signups/{signup_id}/selection_types\",\"action\":\"List Selection Types (via Signup)\"},{\"name\":\"List Signup Location (via Signup)\",\"value\":\"getSignupsSignupIdSignupLocation\",\"description\":\"GET /signups/{signup_id}/signup_location\",\"action\":\"List Signup Location (via Signup)\"},{\"name\":\"List Signup Times (via Signup)\",\"value\":\"getSignupsSignupIdSignupTimes\",\"description\":\"GET /signups/{signup_id}/signup_times\",\"action\":\"List Signup Times (via Signup)\"},{\"name\":\"List Signups\",\"value\":\"getSignups\",\"description\":\"GET /signups\",\"action\":\"List Signups\"},{\"name\":\"Get Attendee (via Signup)\",\"value\":\"getSignupsSignupIdAttendeesAttendeeId\",\"description\":\"GET /signups/{signup_id}/attendees/{attendee_id}\",\"action\":\"Get Attendee (via Signup)\"},{\"name\":\"Get Campus (via Signup)\",\"value\":\"getSignupsSignupIdCampusesCampusId\",\"description\":\"GET /signups/{signup_id}/campuses/{campus_id}\",\"action\":\"Get Campus (via Signup)\"},{\"name\":\"Get Category (via Signup)\",\"value\":\"getSignupsSignupIdCategoriesCategoryId\",\"description\":\"GET /signups/{signup_id}/categories/{category_id}\",\"action\":\"Get Category (via Signup)\"},{\"name\":\"Get Next Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\",\"description\":\"GET /signups/{signup_id}/next_signup_time/{next_signup_time_id}\",\"action\":\"Get Next Signup Time (via Signup)\"},{\"name\":\"Get Registration (via Signup)\",\"value\":\"getSignupsSignupIdRegistrationsRegistrationId\",\"description\":\"GET /signups/{signup_id}/registrations/{registration_id}\",\"action\":\"Get Registration (via Signup)\"},{\"name\":\"Get Selection Type (via Signup)\",\"value\":\"getSignupsSignupIdSelectionTypesSelectionTypeId\",\"description\":\"GET /signups/{signup_id}/selection_types/{selection_type_id}\",\"action\":\"Get Selection Type (via Signup)\"},{\"name\":\"Get Signup Location (via Signup)\",\"value\":\"getSignupsSignupIdSignupLocationSignupLocationId\",\"description\":\"GET /signups/{signup_id}/signup_location/{signup_location_id}\",\"action\":\"Get Signup Location (via Signup)\"},{\"name\":\"Get Signup Time (via Signup)\",\"value\":\"getSignupsSignupIdSignupTimesSignupTimeId\",\"description\":\"GET /signups/{signup_id}/signup_times/{signup_time_id}\",\"action\":\"Get Signup Time (via Signup)\"},{\"name\":\"Get Signup\",\"value\":\"getSignupsSignupId\",\"description\":\"GET /signups/{signup_id}\",\"action\":\"Get Signup\"}],\n      default: \"getSignupsSignupIdAttendees\",\n    },\n    {\n      displayName: \"Order\",\n      name: \"getAttendees_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getAttendees_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendees_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendees_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"],\"getAttendees_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendees\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContact_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdEmergencyContactAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdEmergencyContact_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdEmergencyContact_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"],\"getAttendeesAttendeeIdEmergencyContact_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContact\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdPerson_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdPersonAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdPerson_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdPerson_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"],\"getAttendeesAttendeeIdPerson_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPerson\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdRegistration_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdRegistrationAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getAttendeesAttendeeIdRegistration_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getAttendeesAttendeeIdRegistration_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdRegistration_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdRegistration_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"],\"getAttendeesAttendeeIdRegistration_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistration\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdSelectionType_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdSelectionTypeAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getAttendeesAttendeeIdSelectionType_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getAttendeesAttendeeIdSelectionType_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"],\"getAttendeesAttendeeIdSelectionType_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionType\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getAttendeesAttendeeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContactEmergencyContactId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n    },\n    {\n      displayName: \"Emergency Contact ID\",\n      name: \"getAttendeesAttendeeIdEmergencyContactEmergencyContactId_emergencyContactId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdPersonPersonId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getAttendeesAttendeeIdPersonPersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdPersonPersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdPersonPersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getAttendeesAttendeeIdRegistrationRegistrationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdRegistrationRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getAttendeesAttendeeIdSelectionTypeSelectionTypeId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n    },\n    {\n      displayName: \"Selection Type ID\",\n      name: \"getAttendeesAttendeeIdSelectionTypeSelectionTypeId_selectionTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Attendee\"],\"operation\":[\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"],\"getCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getCampusesCampusId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCampusesCampusIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Campus\"],\"operation\":[\"getCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getCategories_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getCategories_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"],\"getCategories_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategories\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Category ID\",\n      name: \"getCategoriesCategoryId_categoryId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetCategoriesCategoryIdCategoryId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Category\"],\"operation\":[\"getCategoriesCategoryId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getPeople_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getPeople_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"],\"getPeople_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeople\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getMe\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Person ID\",\n      name: \"getPeoplePersonId_personId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetPeoplePersonIdPersonId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Person\"],\"operation\":[\"getPeoplePersonId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdCreatedBy_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetRegistrationsRegistrationIdCreatedByRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrationsRegistrationIdCreatedBy_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrationsRegistrationIdCreatedBy_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"],\"getRegistrationsRegistrationIdCreatedBy_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedBy\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContact_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrationsRegistrationIdRegistrantContact_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrationsRegistrationIdRegistrantContact_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"],\"getRegistrationsRegistrationIdRegistrantContact_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContact\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getRegistrations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRegistrations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getRegistrations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getRegistrations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"],\"getRegistrations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdCreatedByCreatedById_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n    },\n    {\n      displayName: \"Created By ID\",\n      name: \"getRegistrationsRegistrationIdCreatedByCreatedById_createdById\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdCreatedByCreatedById\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n    },\n    {\n      displayName: \"Registrant Contact ID\",\n      name: \"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId_registrantContactId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getRegistrationsRegistrationId_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetRegistrationsRegistrationIdRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getRegistrationsRegistrationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Registration\"],\"operation\":[\"getRegistrationsRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdAttendees_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdAttendeesSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSignupsSignupIdAttendees_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignupsSignupIdAttendees_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdAttendees_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdAttendees_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"],\"getSignupsSignupIdAttendees_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendees\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCampuses_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCampusesSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdCampuses_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdCampuses_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"],\"getSignupsSignupIdCampuses_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampuses\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCategories_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCategoriesSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdCategories_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdCategories_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"],\"getSignupsSignupIdCategories_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategories\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdNextSignupTime_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdNextSignupTimeSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdNextSignupTime_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdNextSignupTime_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"],\"getSignupsSignupIdNextSignupTime_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTime\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdRegistrations_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdRegistrationsSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSignupsSignupIdRegistrations_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignupsSignupIdRegistrations_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdRegistrations_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdRegistrations_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"],\"getSignupsSignupIdRegistrations_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrations\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSelectionTypes_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSelectionTypesSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSelectionTypes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSelectionTypes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"],\"getSignupsSignupIdSelectionTypes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupLocation_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupLocationSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSignupLocation_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSignupLocation_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"],\"getSignupsSignupIdSignupLocation_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocation\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupTimes_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupTimesSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignupsSignupIdSignupTimes_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignupsSignupIdSignupTimes_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"],\"getSignupsSignupIdSignupTimes_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimes\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Filter\",\n      name: \"getSignups_filter\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Filter by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\"displayName\":\"ID\",\"name\":\"whereid\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"resourceLocator\",\"modes\":[{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsWhereid\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\"default\":{\"mode\":\"list\",\"value\":\"\"}}]},{\"displayName\":\"Name\",\"name\":\"wherename\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"string\",\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Order\",\n      name: \"getSignups_order\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Order by\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\"displayName\":\"Order\",\"name\":\"order\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created At Ascending\",\"value\":\"created_at\"},{\"name\":\"Created At Descending\",\"value\":\"-created_at\"},{\"name\":\"Updated At Ascending\",\"value\":\"updated_at\"},{\"name\":\"Updated At Descending\",\"value\":\"-updated_at\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignups_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campuses\",\"value\":\"campuses\"},{\"name\":\"Categories\",\"value\":\"categories\"},{\"name\":\"Next Signup Time\",\"value\":\"next_signup_time\"},{\"name\":\"Selection Types\",\"value\":\"selection_types\"},{\"name\":\"Signup Location\",\"value\":\"signup_location\"},{\"name\":\"Signup Times\",\"value\":\"signup_times\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Return All',\n      name: \"getSignups_returnAll\",\n      type: 'boolean',\n      default: false,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n    },\n    {\n      displayName: 'Limit',\n      name: \"getSignups_limit\",\n      type: 'number',\n      default: 100,\n      typeOptions: { minValue: 1 },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"],\"getSignups_returnAll\":[false]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignups\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdAttendeesAttendeeId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdAttendeesAttendeeIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: \"Attendee ID\",\n      name: \"getSignupsSignupIdAttendeesAttendeeId_attendeeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignupsSignupIdAttendeesAttendeeId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Emergency Contact\",\"value\":\"emergency_contact\"},{\"name\":\"Person\",\"value\":\"person\"},{\"name\":\"Registration\",\"value\":\"registration\"},{\"name\":\"Registration Created By\",\"value\":\"registration.created_by\"},{\"name\":\"Registration Registrant Contact\",\"value\":\"registration.registrant_contact\"},{\"name\":\"Selection Type\",\"value\":\"selection_type\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdAttendeesAttendeeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCampusesCampusId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCampusesCampusIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: \"Campus ID\",\n      name: \"getSignupsSignupIdCampusesCampusId_campusId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCampusesCampusIdCampusId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCampusesCampusId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdCategoriesCategoryId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCategoriesCategoryIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: \"Category ID\",\n      name: \"getSignupsSignupIdCategoriesCategoryId_categoryId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdCategoriesCategoryIdCategoryId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdCategoriesCategoryId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdNextSignupTimeNextSignupTimeId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n    },\n    {\n      displayName: \"Next Signup Time ID\",\n      name: \"getSignupsSignupIdNextSignupTimeNextSignupTimeId_nextSignupTimeId\",\n      type: \"string\",\n      default: '',\n      required: true,\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: \"Registration ID\",\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_registrationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignupsSignupIdRegistrationsRegistrationId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Created By\",\"value\":\"created_by\"},{\"name\":\"Registrant Contact\",\"value\":\"registrant_contact\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdRegistrationsRegistrationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSelectionTypesSelectionTypeId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n    },\n    {\n      displayName: \"Selection Type ID\",\n      name: \"getSignupsSignupIdSelectionTypesSelectionTypeId_selectionTypeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSelectionTypesSelectionTypeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupLocationSignupLocationId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n    },\n    {\n      displayName: \"Signup Location ID\",\n      name: \"getSignupsSignupIdSignupLocationSignupLocationId_signupLocationId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupLocationSignupLocationId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupIdSignupTimesSignupTimeId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n    },\n    {\n      displayName: \"Signup Time ID\",\n      name: \"getSignupsSignupIdSignupTimesSignupTimeId_signupTimeId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupIdSignupTimesSignupTimeId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n    {\n      displayName: \"Signup ID\",\n      name: \"getSignupsSignupId_signupId\",\n      type: \"resourceLocator\",\n      default: {\"mode\":\"list\",\"value\":\"\"},\n      required: true,\n      modes: [{\"displayName\":\"List\",\"name\":\"list\",\"type\":\"list\",\"typeOptions\":{\"searchListMethod\":\"searchGetSignupsSignupIdSignupId\",\"searchable\":true}},{\"displayName\":\"ID\",\"name\":\"id\",\"type\":\"string\",\"placeholder\":\"e.g. 12345\"}],\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n    },\n    {\n      displayName: \"Include\",\n      name: \"getSignupsSignupId_include\",\n      type: 'fixedCollection',\n      default: {},\n      placeholder: \"Include data\",\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n      options: [{\"displayName\":\"Include\",\"name\":\"include\",\"values\":[{\"displayName\":\"Value\",\"name\":\"value\",\"type\":\"options\",\"options\":[{\"name\":\"Campuses\",\"value\":\"campuses\"},{\"name\":\"Categories\",\"value\":\"categories\"},{\"name\":\"Next Signup Time\",\"value\":\"next_signup_time\"},{\"name\":\"Selection Types\",\"value\":\"selection_types\"},{\"name\":\"Signup Location\",\"value\":\"signup_location\"},{\"name\":\"Signup Times\",\"value\":\"signup_times\"}],\"default\":\"\"}]}],\n    },\n    {\n      displayName: 'Additional Query Parameters',\n      name: 'additionalQueryParameters',\n      type: 'fixedCollection',\n      default: {},\n      placeholder: 'Add Parameter',\n      typeOptions: { multipleValues: true },\n      displayOptions: {\"show\":{\"resource\":[\"Signup\"],\"operation\":[\"getSignupsSignupId\"]}},\n      options: [{\n        displayName: 'Parameter',\n        name: 'parameters',\n        values: [\n          { displayName: 'Name', name: 'name', type: 'string', default: '' },\n          { displayName: 'Value', name: 'value', type: 'string', default: '' },\n        ],\n      }],\n    },\n  ]")() as any;

function lookupResultName(item: any, lookup: GeneratedLookup): string {
  const id = item?.id === undefined || item?.id === null ? '' : String(item.id);
  const attributes = item?.attributes && typeof item.attributes === 'object' ? item.attributes as Record<string, unknown> : {};
  const display = lookup.labelFields
    .map((field) => {
      const values = field.split(' ').map((part) => attributes[part]);
      if (values.some((value) => typeof value !== 'string' || !value.trim())) return '';
      return values.map((value) => String(value).trim()).join(' ');
    })
    .find((value) => value.trim());

  return display ? String(display) + ' (' + id + ')' : id;
}

function lookupPath(context: ILoadOptionsFunctions, lookup: GeneratedLookup): string | undefined {
  let path = lookup.sourcePath;
  for (const binding of lookup.parentBindings) {
    const id = extractResourceLocatorId(context.getNodeParameter(binding.fieldName, ''));
    if (!id) return undefined;
    path = path.replace('{' + binding.sourceName + '}', encodeURIComponent(id));
  }

  return path;
}

async function requestLookup(context: ILoadOptionsFunctions, path: string, qs: IDataObject): Promise<any[]> {
  const response = await planningCenterApiRequest.call(context as unknown as IExecuteFunctions, { method: 'GET', path, qs });
  return Array.isArray((response as any)?.data) ? (response as any).data : [];
}

function lookupResults(dataSets: any[][], lookup: GeneratedLookup): INodeListSearchResult {
  const seen = new Set<string>();
  const results: INodeListSearchResult['results'] = [];

  for (const data of dataSets) {
    for (const item of data) {
      const value = item?.id === undefined || item?.id === null ? '' : String(item.id);
      if (!value || seen.has(value)) continue;
      seen.add(value);
      results.push({ name: lookupResultName(item, lookup), value });
      if (results.length >= lookup.resultLimit) return { results };
    }
  }

  return { results };
}

function splitNameRequests(lookup: GeneratedLookup, filter: string): IDataObject[] {
  const terms = filter.trim().split(/\s+/).filter(Boolean);
  const splitNameSearch = lookup.splitNameSearch;
  if (!terms.length || !splitNameSearch) return [];

  return [
    { per_page: lookup.resultLimit, [splitNameSearch.firstNameFilter]: terms[0] },
    { per_page: lookup.resultLimit, [splitNameSearch.lastNameFilter]: terms[terms.length - 1] },
  ];
}

async function searchLookup(context: ILoadOptionsFunctions, lookup: GeneratedLookup, filter?: string): Promise<INodeListSearchResult> {
  const path = lookupPath(context, lookup);
  if (!path) return { results: [] };

  const trimmedFilter = filter?.trim() ?? '';
  let requests: IDataObject[] = [{ per_page: lookup.resultLimit }];
  if (trimmedFilter && lookup.searchFilter) {
    requests = [{ per_page: lookup.resultLimit, [lookup.searchFilter]: trimmedFilter }];
  } else if (trimmedFilter && lookup.splitNameSearch) {
    requests = splitNameRequests(lookup, trimmedFilter);
  }

  const dataSets = await Promise.all(requests.map((qs) => requestLookup(context, path, qs)));
  return lookupResults(dataSets, lookup);
}

function addAdditionalQuery(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  const additional = context.getNodeParameter('additionalQueryParameters', itemIndex, {}) as { parameters?: Array<{ name?: string; value?: unknown }> };
  for (const parameter of additional.parameters ?? []) {
    if (parameter.name) {
      qs[parameter.name] = parameter.value;
    }
  }
}

function queryOptionSelections(
  groupOptions: Record<string, QueryOptionSelection | QueryOptionSelection[] | undefined>,
  optionName: string,
): QueryOptionSelection[] {
  const selected = groupOptions[optionName];
  if (Array.isArray(selected)) return selected;
  return selected ? [selected] : [];
}

function addQueryStringValue(qs: Record<string, unknown>, sourceName: string, value: unknown): void {
  if (qs[sourceName] === undefined) {
    qs[sourceName] = value;
    return;
  }

  qs[sourceName] = String(qs[sourceName]) + ',' + String(value);
}

function addQueryOptions(context: IExecuteFunctions, itemIndex: number, operation: Operation, qs: Record<string, unknown>): void {
  for (const option of operation.queryOptions) {
    const options = context.getNodeParameter(`${operation.id}_${option.group}`, itemIndex, {}) as Record<string, QueryOptionSelection | QueryOptionSelection[] | undefined>;
    for (const selected of queryOptionSelections(options, option.name)) {
      const value = option.lookup ? extractResourceLocatorId(selected.value) : selected.value;
      if (value === undefined || value === '') continue;

      if (option.kind === 'operator') {
        const operator = option.operators?.find((candidate) => candidate.value === selected.operator) ?? option.operators?.[0];
        if (operator) addQueryStringValue(qs, operator.sourceName, value);
        continue;
      }

      if (option.sourceName) {
        addQueryStringValue(qs, option.sourceName, value);
      }
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
    const attributeValue = field.lookup ? extractResourceLocatorId(value) : value;
    if (attributeValue !== undefined && attributeValue !== '') {
      attributes[field.sourceName] = attributeValue;
    }
  }

  const relationships: Record<string, unknown> = {};
  for (const field of operation.relationshipFields) {
    const rawValue = context.getNodeParameter(`${operation.id}_${field.name}`, itemIndex, '');
    const value = field.lookup ? extractResourceLocatorId(rawValue) : String(rawValue);
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
      type: operation.jsonApiType ?? operation.resource,
      ...(Object.keys(attributes).length ? { attributes } : {}),
      ...(Object.keys(relationships).length ? { relationships } : {}),
    },
  };
}

function buildPath(context: IExecuteFunctions, itemIndex: number, operation: Operation): string {
  let path = operation.path;
  for (const parameter of operation.pathParameters) {
    const value = extractResourceLocatorId(context.getNodeParameter(`${operation.id}_${parameter.name}`, itemIndex));
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
    subtitle: "={{({\"getAttendees\":\"GET /attendees\",\"getAttendeesAttendeeIdEmergencyContact\":\"GET /attendees/{attendee_id}/emergency_contact\",\"getAttendeesAttendeeIdPerson\":\"GET /attendees/{attendee_id}/person\",\"getAttendeesAttendeeIdRegistration\":\"GET /attendees/{attendee_id}/registration\",\"getAttendeesAttendeeIdSelectionType\":\"GET /attendees/{attendee_id}/selection_type\",\"getAttendeesAttendeeId\":\"GET /attendees/{attendee_id}\",\"getAttendeesAttendeeIdEmergencyContactEmergencyContactId\":\"GET /attendees/{attendee_id}/emergency_contact/{emergency_contact_id}\",\"getAttendeesAttendeeIdPersonPersonId\":\"GET /attendees/{attendee_id}/person/{person_id}\",\"getAttendeesAttendeeIdRegistrationRegistrationId\":\"GET /attendees/{attendee_id}/registration/{registration_id}\",\"getAttendeesAttendeeIdSelectionTypeSelectionTypeId\":\"GET /attendees/{attendee_id}/selection_type/{selection_type_id}\",\"getCampuses\":\"GET /campuses\",\"getCampusesCampusId\":\"GET /campuses/{campus_id}\",\"getCategories\":\"GET /categories\",\"getCategoriesCategoryId\":\"GET /categories/{category_id}\",\"getPeople\":\"GET /people\",\"getMe\":\"GET /me\",\"getPeoplePersonId\":\"GET /people/{person_id}\",\"getRegistrationsRegistrationIdCreatedBy\":\"GET /registrations/{registration_id}/created_by\",\"getRegistrationsRegistrationIdRegistrantContact\":\"GET /registrations/{registration_id}/registrant_contact\",\"getRegistrations\":\"GET /registrations\",\"getRegistrationsRegistrationIdCreatedByCreatedById\":\"GET /registrations/{registration_id}/created_by/{created_by_id}\",\"getRegistrationsRegistrationIdRegistrantContactRegistrantContactId\":\"GET /registrations/{registration_id}/registrant_contact/{registrant_contact_id}\",\"getRegistrationsRegistrationId\":\"GET /registrations/{registration_id}\",\"getSignupsSignupIdAttendees\":\"GET /signups/{signup_id}/attendees\",\"getSignupsSignupIdCampuses\":\"GET /signups/{signup_id}/campuses\",\"getSignupsSignupIdCategories\":\"GET /signups/{signup_id}/categories\",\"getSignupsSignupIdNextSignupTime\":\"GET /signups/{signup_id}/next_signup_time\",\"getSignupsSignupIdRegistrations\":\"GET /signups/{signup_id}/registrations\",\"getSignupsSignupIdSelectionTypes\":\"GET /signups/{signup_id}/selection_types\",\"getSignupsSignupIdSignupLocation\":\"GET /signups/{signup_id}/signup_location\",\"getSignupsSignupIdSignupTimes\":\"GET /signups/{signup_id}/signup_times\",\"getSignups\":\"GET /signups\",\"getSignupsSignupIdAttendeesAttendeeId\":\"GET /signups/{signup_id}/attendees/{attendee_id}\",\"getSignupsSignupIdCampusesCampusId\":\"GET /signups/{signup_id}/campuses/{campus_id}\",\"getSignupsSignupIdCategoriesCategoryId\":\"GET /signups/{signup_id}/categories/{category_id}\",\"getSignupsSignupIdNextSignupTimeNextSignupTimeId\":\"GET /signups/{signup_id}/next_signup_time/{next_signup_time_id}\",\"getSignupsSignupIdRegistrationsRegistrationId\":\"GET /signups/{signup_id}/registrations/{registration_id}\",\"getSignupsSignupIdSelectionTypesSelectionTypeId\":\"GET /signups/{signup_id}/selection_types/{selection_type_id}\",\"getSignupsSignupIdSignupLocationSignupLocationId\":\"GET /signups/{signup_id}/signup_location/{signup_location_id}\",\"getSignupsSignupIdSignupTimesSignupTimeId\":\"GET /signups/{signup_id}/signup_times/{signup_time_id}\",\"getSignupsSignupId\":\"GET /signups/{signup_id}\"})[$parameter[\"operation\"]] || $parameter[\"operation\"]}}",
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

  methods = {
    listSearch: {
      searchGetAttendeesAttendeeIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdEmergencyContactAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdEmergencyContactAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdEmergencyContactEmergencyContactIdEmergencyContactId"], filter);
      },
      searchGetAttendeesAttendeeIdPersonAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdPersonAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdPersonPersonIdAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdPersonPersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdPersonPersonIdPersonId"], filter);
      },
      searchGetAttendeesAttendeeIdRegistrationAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdRegistrationAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdRegistrationRegistrationIdAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdRegistrationRegistrationIdRegistrationId"], filter);
      },
      searchGetAttendeesAttendeeIdSelectionTypeAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdSelectionTypeAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdAttendeeId"], filter);
      },
      searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetAttendeesAttendeeIdSelectionTypeSelectionTypeIdSelectionTypeId"], filter);
      },
      searchGetCampusesCampusIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCampusesCampusIdCampusId"], filter);
      },
      searchGetCategoriesCategoryIdCategoryId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetCategoriesCategoryIdCategoryId"], filter);
      },
      searchGetPeoplePersonIdPersonId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetPeoplePersonIdPersonId"], filter);
      },
      searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetRegistrationsRegistrationIdCreatedByCreatedByIdRegistrationId"], filter);
      },
      searchGetRegistrationsRegistrationIdCreatedByRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetRegistrationsRegistrationIdCreatedByRegistrationId"], filter);
      },
      searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetRegistrationsRegistrationIdRegistrantContactRegistrantContactIdRegistrationId"], filter);
      },
      searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetRegistrationsRegistrationIdRegistrantContactRegistrationId"], filter);
      },
      searchGetRegistrationsRegistrationIdRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetRegistrationsRegistrationIdRegistrationId"], filter);
      },
      searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdAttendeesAttendeeIdAttendeeId"], filter);
      },
      searchGetSignupsSignupIdAttendeesAttendeeIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdAttendeesAttendeeIdSignupId"], filter);
      },
      searchGetSignupsSignupIdAttendeesSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdAttendeesSignupId"], filter);
      },
      searchGetSignupsSignupIdCampusesCampusIdCampusId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCampusesCampusIdCampusId"], filter);
      },
      searchGetSignupsSignupIdCampusesCampusIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCampusesCampusIdSignupId"], filter);
      },
      searchGetSignupsSignupIdCampusesSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCampusesSignupId"], filter);
      },
      searchGetSignupsSignupIdCategoriesCategoryIdCategoryId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCategoriesCategoryIdCategoryId"], filter);
      },
      searchGetSignupsSignupIdCategoriesCategoryIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCategoriesCategoryIdSignupId"], filter);
      },
      searchGetSignupsSignupIdCategoriesSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdCategoriesSignupId"], filter);
      },
      searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdNextSignupTimeNextSignupTimeIdSignupId"], filter);
      },
      searchGetSignupsSignupIdNextSignupTimeSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdNextSignupTimeSignupId"], filter);
      },
      searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdRegistrationsRegistrationIdRegistrationId"], filter);
      },
      searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdRegistrationsRegistrationIdSignupId"], filter);
      },
      searchGetSignupsSignupIdRegistrationsSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdRegistrationsSignupId"], filter);
      },
      searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSelectionTypeId"], filter);
      },
      searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSelectionTypesSelectionTypeIdSignupId"], filter);
      },
      searchGetSignupsSignupIdSelectionTypesSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSelectionTypesSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupLocationSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupLocationSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupLocationSignupLocationIdSignupLocationId"], filter);
      },
      searchGetSignupsSignupIdSignupTimesSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupTimesSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupId"], filter);
      },
      searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsSignupIdSignupTimesSignupTimeIdSignupTimeId"], filter);
      },
      searchGetSignupsWhereid: async function(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
        return searchLookup(this, LOOKUP_SOURCES["searchGetSignupsWhereid"], filter);
      },
    },
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
