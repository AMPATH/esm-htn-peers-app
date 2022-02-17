import React from 'react';

import { PeerInfoSection, PeerInfoSectionProps } from './peer-info.component';
import { PatientInfoSection, PatientInfoSectionProps } from './patient-info.component';
import { SectionWrapper } from './section-wrapper.component';
import { Text } from '../input/basic-input/text.input.component';
import { Date } from '../input/basic-input/date.input.component';
import { Radio } from '../input/basic-input/radio-input.component';
import { SelectInput } from '../input/basic-input/select-input.component';
import { CheckboxInput } from '../input/basic-input/checkbox-input.component';

export function getField(field: any) {
  switch (field.render) {
    case 'text':
      return <Text id={field.id} name={field.id} labelText={field.label} light />;
    case 'select':
      return <SelectInput id={field.id} name={field.id} label={field.label} options={field.questionOptions.answers} />;
    case 'radio':
      return <Radio id={field.id} name={field.id} legendText={field.label} options={field.questionOptions.answers} />;
    case 'checkbox':
      return (
        <CheckboxInput id={field.id} name={field.id} legendText={field.label} options={field.questionOptions.answers} />
      );
    case 'date':
      return <Date id={field.id} name={field.id} labelText={field.label} />;
    default:
      return <div>Unknown Field {field.label} </div>;
  }
}

function renderSection(sectionProps: SectionProps) {
  switch (sectionProps.id) {
    case 'peerinfo':
      return <PeerInfoSection {...sectionProps} />;
    case 'patientinfo':
      return <PatientInfoSection {...sectionProps} />;
    default:
      return <div>Unknown Section {sectionProps.id}</div>;
  }
}

export interface DefaultSectionProps {
  id: 'default';
  name: string;
  fields: Array<any>;
}

export type SectionProps = DefaultSectionProps | PeerInfoSectionProps | PatientInfoSectionProps;

export function getSection(sectionProps: SectionProps & { name: string }, index: number) {
  return (
    <SectionWrapper {...sectionProps} index={index}>
      {renderSection(sectionProps)}
    </SectionWrapper>
  );
}
