import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface IInputProps {
  name: string;
  type: string;
  hidden?: boolean;
  id?: string;
  required?: boolean;
}

const Input: React.FC<IInputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
};

export default Input;
