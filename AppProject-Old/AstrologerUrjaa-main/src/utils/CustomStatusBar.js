import React from 'react';
import {StatusBar} from 'react-native';

export const StatusBarDark = () => (
  <StatusBar
    backgroundColor={'transparent'}
    translucent={true}
    barStyle={'dark-content'}
  />
);
export const StatusBarLight = () => (
  <StatusBar
    backgroundColor={'transparent'}
    translucent={true}
    barStyle={'light-content'}
  />
);
