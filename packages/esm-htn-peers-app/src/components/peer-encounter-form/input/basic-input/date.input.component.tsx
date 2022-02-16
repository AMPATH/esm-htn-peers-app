import React, { useMemo } from 'react';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';

interface DateProps {
  id: string;
  name: string;
  labelText: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const Date: React.FC<DateProps> = ({ ...props }) => {
  const [field, meta] = useField(props.name);
  const value = field.value;
  return (
    <div style={{ marginBottom: '1rem' }}>
      <DatePicker datePickerType="single">
        <DatePickerInput {...props} value={value} placeholder="mm/dd/yyyy" />
      </DatePicker>
    </div>
  );
};
