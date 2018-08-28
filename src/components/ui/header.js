import React from 'react';
import { Text, View } from 'react-native';
import { colors } from './config';

/**
 * 
 * @param {headerText} props 
 */

const Header = (props) => {
  const { innerContainer, outerContainer } = styles;

  return (
    <View style={outerContainer}>
      <Text style={innerContainer}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  outerContainer: {
    backgroundColor: colors.primary,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Header;