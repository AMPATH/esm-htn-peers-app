export const PeerEncounterFormSchema = {
    "name": "PT4A STUDY PEER MEDICATION DELIVERY FORM",
    "id": "PT4A_STUDY_PEER_MEDICATION_DELIVERY_FORMv1",
    "sections": [
        {
            "id": "peerinfo",    
            "name": "Peer Information",
            "fields": [
                {
                    "label": "First name",
                    "id": "peer_fname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Second name",
                    "id": "peer_sname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Last name",
                    "id": "peer_lname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Date of encounter",
                    "id": "enc_date",
                    "render": "date",
                    "type": "obs"
                },
                {
                    "label": "Gender",
                    "id": "peer_gender",
                    "render": "radio",
                    "questionOptions": {
                        "concept": "b2343ae7-e435-4bc7-9615-74322d5201d4",
                        "answers": [
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53c1",
                                "label": "M"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53c2",
                                "label": "F"
                            }
                        ]
                    },
                    "type": "personAttribute"
                },
                {
                    "label": "Location of encounter",
                    "id": "enc_location",
                    "render": "select",
                    "questionOptions": {
                        "concept": "b2343ae7-e435-4bc7-9615-74322d5201e4",
                        "answers": [
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53b1",
                                "label": "AMPATH Facility"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53b2",
                                "label": "Community (Church, School etc.)"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53b3",
                                "label": "Patient’s home"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53b4",
                                "label": "Phone call"
                            }
                        ]
                    },
                    "type": "obs"
                }
            ]
        },
        {
            "id": "patientinfo",    
            "name": "Patient Information",
            "fields": [
                {
                    "label": "First name",
                    "id": "patient_fname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Second name",
                    "id": "patient_sname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Last name",
                    "id": "patient_lname",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "AMRS ID",
                    "id": "amrs_id",
                    "render": "text",
                    "type": "obs"
                },
                {
                    "label": "Gender",
                    "id": "patient_gender",
                    "render": "radio",
                    "questionOptions": {
                        "concept": "b2343ae7-e435-4bc7-9615-74322d5201f4",
                        "answers": [
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53f1",
                                "label": "M"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53f2",
                                "label": "F"
                            }
                        ]
                    },
                    "type": "personAttribute"
                },
                {
                    "label": "Mobile number (confirmed every visit)",
                    "id": "patient_phone",
                    "render": "text",
                    "type": "presonAttribute"
                },
                {
                    "label": "Alternative number",
                    "id": "patient_alt_phone",
                    "render": "text",
                    "type": "personAttribute"
                },
                {
                    "label": "Patient covered by NHIF",
                    "id": "covered_nhif",
                    "render": "checkbox",
                    "questionOptions": {
                        "concept": "b2343ae7-e435-4bc7-9615-74322d5201a4",
                        "answers": [
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53a1",
                                "label": "Yes"
                            },
                            {
                                "concept": "7ccac7e4-f399-48b9-b2c7-944b98ec53a2",
                                "label": "No"
                            }
                        ]
                    },
                    "type": "obs"
                }
            ]
        }
    ]
};
