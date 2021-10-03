import {Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

type Props = {
  workoutType: WorkoutType;
  label: string;
  style?: StyleProp<ViewStyle>;
};

const Success: React.FC<Props> = (props) => {
  const {themeVariables, layoutStyles} = useStyle();
  const styles = StyleSheet.create({
    container: {alignItems: 'center'},
    iconContainer: {
      backgroundColor: getWorkoutColor(props.workoutType, themeVariables),
      borderRadius: 40,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.iconContainer}>
        <Icon
          name={IconType.Check}
          color={themeVariables.eva[ThemeKeys.colorWhite]}
          size={50}
        />
      </View>
      <Text style={layoutStyles.marginTopBase} appearance="light" category="h1">
        {props.label}
      </Text>
    </View>
  );
};
export default Success;
