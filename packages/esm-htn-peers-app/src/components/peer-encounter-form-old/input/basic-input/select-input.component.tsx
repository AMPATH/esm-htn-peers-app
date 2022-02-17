import React from 'react';
import { Select, SelectItem } from 'carbon-components-react';
import { useField } from 'formik';

interface SelectInputProps {
  id: string;
  name: string;
  options: Array<any>;
  label: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ id, name, options, label }) => {
  const [field, meta] = useField(name);
  const selectOptions = [
    <SelectItem disabled hidden text={`Select ${label}`} key="" value="" />,
    ...options.map((currentOption, index) => (
      <SelectItem text={currentOption.label} value={currentOption.concept} key={index} />
    )),
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Select id={id} {...field} labelText={label} light>
        {selectOptions}
      </Select>
    </div>
  );
};
