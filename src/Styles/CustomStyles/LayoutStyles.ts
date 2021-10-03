import {StyleSheet} from 'react-native';
import {ThemeType, ThemeKeys} from '~/Theme/ThemeTypes';
export const layoutStyles = (theme: ThemeType, eva: Record<string, any>) => {
  return StyleSheet.create({
    fullscreenContainer: {
      flex: 1,
      position: 'relative',
    },
    flexGrow: {
      flexGrow: 1,
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    rowContainer: {
      flexDirection: 'row',
    },
    alignCenter: {
      alignItems: 'center',
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    horizontalPadding: {
      paddingHorizontal: theme.spacing.horizontal,
    },
    horizontalMargin: {
      marginHorizontal: theme.spacing.horizontal,
    },
    bottomPadding: {
      paddingBottom: (theme.spacing.horizontal / 2) * 5,
    },
    marginTopExtraSmall: {
      marginTop: theme.spacing.horizontal / 4,
    },
    marginTopSmall: {
      marginTop: theme.spacing.horizontal / 2,
    },
    marginTopBase: {
      marginTop: theme.spacing.horizontal,
    },
    marginTopMedium: {
      marginTop: (theme.spacing.horizontal / 2) * 3,
    },
    marginTopLarge: {
      marginTop: theme.spacing.horizontal * 2,
    },
    marginTopExtraLarge: {
      marginTop: (theme.spacing.horizontal / 2) * 5,
    },
    marginTopHuge: {
      marginTop: (theme.spacing.horizontal / 2) * 7,
    },
    marginLeftSmall: {
      marginLeft: theme.spacing.horizontal / 2,
    },
    marginLeftBase: {
      marginLeft: theme.spacing.horizontal,
    },
  });
};
