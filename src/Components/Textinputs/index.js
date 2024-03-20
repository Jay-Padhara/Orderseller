import {TextInput} from 'react-native';
import React from 'react';

export const Textinputs = ({
  refe,
  placeholder,
  color,
  style,
  onSubmitEditing,
  returnKeyType,
  keyboardType,
  onChangeText,
  max,
  value,
  multiline,
}) => {
  return (
    <TextInput
      ref={refe}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={color}
      blurOnSubmit
      multiline={multiline}
      style={style}
      maxLength={max}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType ? keyboardType : 'default'}
      onChangeText={onChangeText}
    />
  );
};
