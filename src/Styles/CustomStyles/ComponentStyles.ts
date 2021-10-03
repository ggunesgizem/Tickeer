import {StyleSheet} from 'react-native';
import {ThemeType, ThemeKeys} from '~/Theme/ThemeTypes';
export const componentStyles = (theme: ThemeType, eva: Record<string, any>) => {
  return StyleSheet.create({
    centerText: {
      textAlign: 'center',
    },
    shadow: {
      shadowColor: eva[ThemeKeys.colorBlack],
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowRadius: 10,
      shadowOpacity: 0.3,
      elevation: 0.8,
    },
  });
};
