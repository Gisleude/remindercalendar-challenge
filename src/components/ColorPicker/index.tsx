import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { CirclePicker, ColorChangeHandler } from 'react-color';

interface IColorPickerProps {
  name: string;
  className: string;
  color: string;

  onChangeComplete?: ColorChangeHandler;
}

const ColorPicker: React.FC<IColorPickerProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <CirclePicker ref={inputRef} {...rest} />;
};

export default ColorPicker;
