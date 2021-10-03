import {Text, Toggle as UIToggle} from '@ui-kitten/components';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeTypes';

type PropTypes = {
  text?: string;
  checked: boolean;
  onCheckChanged: (isChecked: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

const Toggle: React.FC<PropTypes> = (props) => {
  const {themeVariables} = useStyle();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginRight: 12,
      color: themeVariables.eva[ThemeKeys.colorInkMid],
    },
  });
  return (
    <View style={[styles.container, props.style]}>
      {props.text && (
        <Text style={styles.text} category="p2">
          {props.text}
        </Text>
      )}
      <UIToggle
        checked={props.checked}
        onChange={props.onCheckChanged}
        status="success"
      />
    </View>
  );
};

export default Toggle;
