import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const Button = ({style, text, textstyle, onPress, disable}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disable}>
      <Text style={textstyle}>{text}</Text>
    </TouchableOpacity>
  );
};
