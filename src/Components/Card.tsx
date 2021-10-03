import React from 'react';
import {StyleSheet, ViewStyle, StyleProp, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WorkoutType} from '~/Helpers/Enums';
import {getGradientColor} from '~/Helpers/WorkoutHelper';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  workoutType?: WorkoutType;
};

const Card: React.FC<Props> = (props) => {
  const {themeVariables, componentStyles} = useStyle();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: themeVariables.eva[ThemeKeys.colorBlackTransparent500],
      padding: 16,
      borderWidth: 0,
    },
  });

  const renderContainer = () => {
    let containerProps: Props = {
      style: [styles.container, componentStyles.shadow, props.style],
    };
    if (props.onPress) {
      containerProps.onPress = props.onPress;
    }

    return (
      <LinearGradient
        colors={
          props.workoutType
            ? getGradientColor(props.workoutType, themeVariables)
            : ['transparent', 'transparent']
        }
        {...containerProps}>
        {props.children}
        {props.onPress && (
          <TouchableOpacity
            onPress={props.onPress}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </LinearGradient>
    );
  };

  return renderContainer();
};
export default Card;
