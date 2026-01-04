import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: spacing.large,
    borderRadius: 25, // More rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    marginVertical: spacing.small,
  },
  text: {
    ...typography.button,
  },
});

export default Button;
