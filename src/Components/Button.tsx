import React, {ReactElement} from 'react';
import {Icon, Text} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import IconType from '~/Styles/IconType';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import {useStyle} from '~/Theme/ThemeHelper';
import Fonts from '~/Styles/Fonts';

type Props = {
  workoutType?: WorkoutType;
  label?: string | ReactElement;
  fill?: boolean;
  rightItem?: ReactElement;
  leftItem?: ReactElement;
} & TouchableOpacityProps;

const Button: React.FC<Props> = (props) => {
  const {workoutType, label, style, ...remainingProps} = props;
  const {themeVariables} = useStyle();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 30,
      paddingVertical: 19,
      borderWidth: 0,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      opacity: 0.9,
    },
    textStyle: {
      fontFamily: Fonts.bold,
      fontWeight: '500',
    },
    fillContainer: {
      backgroundColor: getWorkoutColor(
        workoutType ?? WorkoutType.REST,
        themeVariables,
        true,
      ),
      paddingHorizontal: 16,
    },
    multipleContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity
      {...remainingProps}
      style={[styles.container, props.fill && styles.fillContainer, style]}>
      <View style={styles.iconContainer}>
        <Icon
          name={IconType.Button}
          size={90}
          color={getWorkoutColor(
            workoutType ?? WorkoutType.REST,
            themeVariables,
          )}
        />
      </View>
      <View style={props.leftItem && props.rightItem && styles.multipleContent}>
        {props.leftItem}
        <Text appearance="light" category="h4" style={styles.textStyle}>
          {label}
        </Text>
        {props.rightItem}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
