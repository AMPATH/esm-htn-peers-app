import React from 'react';
import { RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { useField } from 'formik';

interface RadioInputProps {
  id: string;
  legendText: string;
  defaultSelected?: string;
  name: string;
  options: Array<any>;
}

export const Radio: React.FC<RadioInputProps> = ({ id, name, options, legendText }) => {
  const [field, meta] = useField(name);
  const inputOptions = [
    ...options.map((currentOption, index) => (
      <RadioButton labelText={currentOption.label} value={currentOption.concept} id={id + '-' + index} />
    )),
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <RadioButtonGroup {...field} legendText={legendText} name={name}>
        {inputOptions}
      </RadioButtonGroup>
    </div>
  );
};
