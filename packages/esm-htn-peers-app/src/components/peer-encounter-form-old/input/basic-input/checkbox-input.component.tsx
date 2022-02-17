import React from 'react';
import { Checkbox } from 'carbon-components-react';
import { useField } from 'formik';

interface CheckboxInputProps {
  id: string;
  legendText: string;
  name: string;
  options: Array<any>;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ id, name, options, legendText }) => {
  const [field, meta] = useField(name);
  const inputOptions = [
    ...options.map((currentOption, index) => (
      <Checkbox name={name} labelText={currentOption.label} id={id + '-' + index} />
    )),
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <fieldset>
        <legend>{legendText}</legend>
        <div style={{ display: 'flex', marginTop: '0.65rem' }}>{inputOptions}</div>
      </fieldset>
    </div>
  );
};
