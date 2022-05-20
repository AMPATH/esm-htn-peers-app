export async function fetchPatientIdentifierTypesWithSources() {
    return identifiersWithSources;
}

const identifiersWithSources = [
    {
        "name": "AMRS Medical Record Number",
        "fieldName": "amrsMedicalRecordNumber",
        "required": false,
        "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
        "format": null,
        "isPrimary": true,
        "uniquenessBehavior": null,
        "identifierSources": [
            {
                "uuid": "9ae50781-c960-4a2a-aef3-afec5615ed8b",
                "name": "Busia(Don't Use)",
                "description": "Busia amrs ids(Don't Use)",
                "nextSequenceValue": 13347,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "BS",
                "firstIdentifierBase": "23000",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/9ae50781-c960-4a2a-aef3-afec5615ed8b",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "580a1629-230d-4c4b-8ad0-2dcef53de412",
                "name": "Osieko",
                "description": "Identifiers for Osieko",
                "nextSequenceValue": 1201,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "SE",
                "firstIdentifierBase": "1001",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/580a1629-230d-4c4b-8ad0-2dcef53de412",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "ac4132b4-29e6-49a1-af80-bb00cae85c6a",
                "name": "PT4A Patient IDs",
                "description": "",
                "nextSequenceValue": 25500,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "",
                "firstIdentifierBase": "PT4A",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/ac4132b4-29e6-49a1-af80-bb00cae85c6a",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "9d2f0ea0-2964-408a-a95d-39becaf28934",
                "name": "Webuye (Dont Use)",
                "description": "",
                "nextSequenceValue": 7401,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "WB",
                "firstIdentifierBase": "5401",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/9d2f0ea0-2964-408a-a95d-39becaf28934",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "b66e52c4-0286-4757-878a-ad03cf427cb5",
                "name": "Webuye Identifiers",
                "description": "",
                "nextSequenceValue": 55002,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "WB",
                "firstIdentifierBase": "54001",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/b66e52c4-0286-4757-878a-ad03cf427cb5",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "fa9a5008-dc36-48de-9903-f897d6bff79a",
                "name": "Iten ",
                "description": "Identifiers to be used in Iten",
                "nextSequenceValue": 5100,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "TE",
                "firstIdentifierBase": "4100",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/fa9a5008-dc36-48de-9903-f897d6bff79a",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "1391bf96-b23d-436a-b81c-db27ca48ec5d",
                "name": "Webuye Identifiers",
                "description": "",
                "nextSequenceValue": 55260,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "WB",
                "firstIdentifierBase": "54260",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/1391bf96-b23d-436a-b81c-db27ca48ec5d",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "af6712d7-0d5c-444c-870c-c78304022592",
                "name": "PT4A Identifiers",
                "description": "",
                "nextSequenceValue": 4001,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "PT",
                "firstIdentifierBase": "1000",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/af6712d7-0d5c-444c-870c-c78304022592",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "4a9ba044-d14d-4f61-bb9f-de03226e01c0",
                "name": "Pioneer Identifiers",
                "description": "starting 1980",
                "nextSequenceValue": 3980,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "MO",
                "firstIdentifierBase": "1980",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/4a9ba044-d14d-4f61-bb9f-de03226e01c0",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "fced0702-da78-4691-a588-a66cefc1cc6f",
                "name": "Uasin Gishu District Hospital IDs",
                "description": "From 18000",
                "nextSequenceValue": 19000,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "DH",
                "firstIdentifierBase": "18000",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/fced0702-da78-4691-a588-a66cefc1cc6f",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "d554f6cf-d5a8-4db0-8a7a-08c8cd83beb5",
                "name": "Huruma Sub County Hospital",
                "description": "From 10000 to 10999",
                "nextSequenceValue": 21000,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "DH",
                "firstIdentifierBase": "10000",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/d554f6cf-d5a8-4db0-8a7a-08c8cd83beb5",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "2a0c354c-2f3e-49f5-b9c1-738f58aec8cc",
                "name": "Bumala B ",
                "description": "from 2001 to 3000",
                "nextSequenceValue": 3001,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "BB",
                "firstIdentifierBase": "2001",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/2a0c354c-2f3e-49f5-b9c1-738f58aec8cc",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "d355b1bf-c25f-4d24-b38a-06b989605beb",
                "name": "Bumala A",
                "description": "Bumala A Identifiers",
                "nextSequenceValue": 5828,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "BM",
                "firstIdentifierBase": "4828",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/d355b1bf-c25f-4d24-b38a-06b989605beb",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "4b85bd80-786c-47e7-a1a2-e38933b04f6b",
                "name": "Teso Identifiers",
                "description": "Beginning 7413",
                "nextSequenceValue": 8413,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "TS",
                "firstIdentifierBase": "7413",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/4b85bd80-786c-47e7-a1a2-e38933b04f6b",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "f2a8175c-6fe3-4460-a85e-d81b42854c98",
                "name": "Mt. Elgon",
                "description": "Identifiers from 4000",
                "nextSequenceValue": 6000,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "EG",
                "firstIdentifierBase": "4000",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/f2a8175c-6fe3-4460-a85e-d81b42854c98",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            },
            {
                "uuid": "3bc673a6-477f-4fba-ac7e-737acf2a0eaf",
                "name": "Busia IDS 25500",
                "description": "Busia IDs from 25500 ",
                "nextSequenceValue": 26500,
                "baseCharacterSet": "0123456789",
                "prefix": "",
                "suffix": "BS",
                "firstIdentifierBase": "25500",
                "minLength": null,
                "maxLength": null,
                "identifierType": {
                    "uuid": "58a46e2e-1359-11df-a1f1-0026b9348838",
                    "display": "AMRS Medical Record Number",
                    "name": "AMRS Medical Record Number",
                    "description": "Newer AMPATH Medical Record System (AMRS) Medical Record Number",
                    "format": null,
                    "formatDescription": null,
                    "required": false,
                    "validator": null,
                    "locationBehavior": null,
                    "uniquenessBehavior": null,
                    "retired": false,
                    "auditInfo": {
                        "creator": {
                            "uuid": "5a999ea2-13a9-11df-a1f1-0026b9348838",
                            "display": "admin",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/5a999ea2-13a9-11df-a1f1-0026b9348838",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateCreated": "2006-02-07T00:00:00.000+0300",
                        "changedBy": {
                            "uuid": "f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                            "display": "eidlabsync",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/user/f1aa2ea9-9ab4-492b-9a87-8b86268a1496",
                                    "resourceAlias": "user"
                                }
                            ]
                        },
                        "dateChanged": "2022-02-17T13:37:54.000+0300"
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/patientidentifiertype/58a46e2e-1359-11df-a1f1-0026b9348838",
                            "resourceAlias": "patientidentifiertype"
                        }
                    ],
                    "resourceVersion": "2.0"
                },
                "links": [
                    {
                        "rel": "self",
                        "uri": "https://ngx.ampath.or.ke/amrs/ws/rest/v1/idgen/identifiersource/3bc673a6-477f-4fba-ac7e-737acf2a0eaf",
                        "resourceAlias": "identifiersource"
                    }
                ],
                "type": "sequentialidentifiergenerator",
                "resourceVersion": "1.8"
            }
        ]
    }
];