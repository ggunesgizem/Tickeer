import {StackNavigationOptions} from '@react-navigation/stack';
import {Icon} from '@ui-kitten/components';
import React from 'react';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export const DefaultHeaderStyle = (): StackNavigationOptions => {
  const {themeVariables} = useStyle();
  return {
    headerTitle: () => <Icon name={IconType.Logo} size={30} color="white" />,
    headerBackTitle: ' ',
    headerTintColor: themeVariables.eva[ThemeKeys.colorWhite],
    headerTitleAlign: 'center',
  };
};
