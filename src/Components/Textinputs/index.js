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
  onBlur,
  secureTextEntry,
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
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType ? keyboardType : 'default'}
      onChangeText={onChangeText}
    />
  );
};
