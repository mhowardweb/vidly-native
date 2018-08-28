import React from "react";
import { View } from 'react-native';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <View>
      <label>{label}</label>
      <Input {...rest} />
      {error && {error}}
    </View>
  );
};

export default Input;
