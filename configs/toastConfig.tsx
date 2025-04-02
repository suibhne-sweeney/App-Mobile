import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { BaseToastProps } from 'react-native-toast-message';
import { Appearance } from 'react-native';

let currentColorScheme = Appearance.getColorScheme();

Appearance.addChangeListener(({ colorScheme }) => {
  currentColorScheme = colorScheme;
});

const toastConfig = {
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        backgroundColor: currentColorScheme === 'dark' ? '#0f0f0f' : 'white',
      }}
      text1Style={{
        color: currentColorScheme === 'dark' ? 'white' : 'black'
      }}
    />
  ),
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        backgroundColor: currentColorScheme === 'dark' ? '#0f0f0f' : 'white',
      }}
      text1Style={{
        color: currentColorScheme === 'dark' ? 'white' : 'black'
      }}
    />
  ),
};

export default toastConfig;
