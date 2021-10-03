import {Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {Insets, TouchableOpacity} from 'react-native';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

type Props = {
  icon: IconType;
  size?: number;
  color?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  hitSlop?: number;
};

const IconButton: React.FC<Props> = (props) => {
  const {themeVariables} = useStyle();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: themeVariables.spacing.horizontal / 2,
    },
  });
  return (
    <TouchableOpacity
      hitSlop={{
        top: props.hitSlop,
        bottom: props.hitSlop,
        left: props.hitSlop,
        right: props.hitSlop,
      }}
      onPress={props.onPress}
      style={[styles.container, props.style]}>
      <Icon
        name={props.icon}
        size={props.size ?? 16}
        color={props.color ?? themeVariables.eva[ThemeKeys.colorWhite]}
      />
      {props.label && (
        <Text style={styles.text} category="p1" appearance="light">
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default IconButton;
