import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface ITextareaProps {
  id?: string;
  name: string;
  maxLength: number;
  rows?: number;
  required?: boolean;
}

const Textarea: React.FC<ITextareaProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <textarea ref={inputRef} defaultValue={defaultValue} {...rest} />;
};

export default Textarea;
