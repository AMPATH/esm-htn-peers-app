import React from 'react';


import { getField } from './section-helper';
import styles from './section.scss'

export interface PeerInfoSectionProps {
  id: string;
  name: string,
  fields: Array<any>;
}

export const PeerInfoSection: React.FC<PeerInfoSectionProps> = ({ fields }) => {
  return (
    <section className={styles.formSection} aria-label="Peer Info Section">
      {fields.map((field) => (
        <div key={field.id}>{getField(field)}</div>
      ))}
    </section>
  );
};
