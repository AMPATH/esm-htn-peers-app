import React, { useMemo } from 'react';
import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

interface TextProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
  checkWarning?(value: string): string;
}

export const Text: React.FC<TextProps> = ({ checkWarning, ...props }) => {
  const [field, meta] = useField(props.name);
  const { t } = useTranslation();

  const value = field.value || '';
  const invalidText = meta.error && t(meta.error);
  const warnText = useMemo(() => {
    if (!invalidText && typeof checkWarning === 'function') {
      const warning = checkWarning(value);
      return warning && t(warning);
    }

    return undefined;
  }, [checkWarning, invalidText, value, t]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextInput
        {...props}
        {...field}
        invalid={!!(meta.touched && meta.error)}
        invalidText={invalidText}
        warn={!!warnText}
        warnText={warnText}
        value={value}
      />
    </div>
  );
};
