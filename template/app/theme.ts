import {DefaultTheme, MD3Theme, useTheme} from 'react-native-paper';

export interface Theme extends MD3Theme {
  spacing: {
    medium: number;
  };
}

export const theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#002b70',
    accent: '#f1c40f',
  },
  spacing: {
    medium: 15,
  },
};

export const useCustomTheme = (): Theme => useTheme() as Theme;
