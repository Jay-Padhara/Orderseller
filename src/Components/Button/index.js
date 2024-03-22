import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export const Button = ({style, text, textstyle, onPress, disable}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disable}>
      <Text style={textstyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export const Customview = ({style, headstyle, head, textstyle, text}) => {
  return (
    <View style={style}>
      <Text style={headstyle}>{head}</Text>
      <Text style={textstyle}>{text}</Text>
    </View>
  );
};
