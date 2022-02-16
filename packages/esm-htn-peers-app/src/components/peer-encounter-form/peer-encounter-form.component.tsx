import React, { useState, useEffect, useContext, useMemo } from 'react';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';
import { Button, Grid, Link } from 'carbon-components-react';
import { useSessionUser } from '@openmrs/esm-framework';
import { Formik, Form, FormikHelpers } from 'formik';

import styles from './peer-encounter-form.scss';
import { getSection } from './section/section-helper';
import { cancelSubmission, scrollIntoView } from './peer-encounter-utils';
import { PeerEncounterFormSchema } from "./peer-encounter-form-schema";
import { getPeerEncounterPatientInfo } from "../../services/patient.service";

export interface PeerEncounterFormProps {
    patient: fhir.Patient,
    patientUuid: string
}

export const PeerEncounterForm: React.FC<PeerEncounterFormProps> = ({ patient, patientUuid }) => {
    
    const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
        const abortController = new AbortController();
      };  

    return (
        <Formik
        initialValues={{
            ...getPeerEncounterPatientInfo(patient), 
            ...{a:'b'}
        }} 
        onSubmit={onFormSubmit}>
        {(props) => (
            <Form className={styles.form}>
            <div className={styles.formContainer}>
                <div>
                <div className={styles.stickyColumn}>
                    <h4>Peer Encounter</h4>
                    <p className={styles.label01}>Jump to</p>
                    {PeerEncounterFormSchema.sections.map((section) => (
                    <div className={`${styles.space05} ${styles.touchTarget}`} key={section.name}>
                        <Link className={styles.linkName} onClick={() => scrollIntoView(section.id)}>
                        <XAxis16 /> {section.name}
                        </Link>
                    </div>
                    ))}
                    <Button className={styles.submitButton} type="submit">Save Encounter</Button>
                    <Button className={styles.cancelButton} kind="tertiary" onClick={cancelSubmission}>Cancel</Button>
                </div>
                </div>
                <Grid className={styles.infoGrid}>
                    {PeerEncounterFormSchema.sections.map((section, index) => (
                    <div key={index}>{getSection(section, index)}</div>
                    ))}
                </Grid>
            </div>
            </Form>
        )}
        </Formik>
    );
};