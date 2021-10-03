import {useHeaderHeight} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, Pressable} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import Bg, {BgTypes} from './Bg';

export type ContainerProps = {
  style?: StyleProp<ViewStyle>;
  bgType?: BgTypes;
  withoutSafeArea?: boolean;
  withoutBg?: boolean;
  onPress?: () => void;
};

const Container: React.FC<ContainerProps> = (props) => {
  const {themeVariables} = useStyle();
  const headerHeight = useHeaderHeight();
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: themeVariables.eva[ThemeKeys.colorTransparent],
    },
    container: {
      flex: 1,
      backgroundColor: themeVariables.eva[ThemeKeys.colorTransparent],
      paddingTop: props.withoutSafeArea ? 0 : headerHeight,
      paddingBottom: props.withoutSafeArea
        ? 0
        : themeVariables.spacing.horizontal * 2,
    },
  });

  const ScreenContainer = props.onPress ? Pressable : View;
  return (
    <>
      {!props.withoutBg && <Bg bgType={props.bgType} />}
      <ScreenContainer
        style={[styles.container, props.style]}
        onPress={props.onPress}>
        {props.children}
      </ScreenContainer>
    </>
  );
};
export default Container;
