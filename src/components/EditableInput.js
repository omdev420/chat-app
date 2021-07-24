import React, { useState, useCallback } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  wrapperClassName = '',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          disabled={!isEditable}
          {...inputProps}
          placeholder={placeholder}
          onChange={onInputChange}
          value={input}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
