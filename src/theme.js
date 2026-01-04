// src/theme.js

export const colors = {
  primary: '#00A878', // A friendly, professional green
  secondary: '#3c4144', // Dark gray for text
  background: '#f7f7f7', // Light gray for screen backgrounds
  white: '#ffffff',
  gray: '#e1e1e1', // Borders and dividers
  lightGray: '#f0f0f0',
  error: '#d9534f', // Red for errors
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  body: {
    fontSize: 16,
    color: colors.secondary,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
};
