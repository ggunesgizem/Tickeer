import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Pressable} from 'react-native';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import {useStyle} from '~/Theme/ThemeHelper';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  checked?: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
  workoutType: WorkoutType;
  label: string;
};

const Checkbox: React.FC<Props> = (props) => {
  const {layoutStyles, themeVariables} = useStyle();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      width: 20,
      height: 20,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeContainer: {
      borderRadius: 5,
      width: 10,
      height: 10,
      backgroundColor: getWorkoutColor(props.workoutType, themeVariables),
    },
    text: {
      marginLeft: 8,
    },
  });

  const handlePress = () => {
    props.onCheckedChange && props.onCheckedChange(!props.checked);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={[
        layoutStyles.rowContainer,
        layoutStyles.alignCenter,
        props.containerStyle,
      ]}>
      <View style={styles.container}>
        {props.checked && <View style={styles.activeContainer} />}
      </View>
      <Text appearance="light" style={styles.text}>
        {props.label}
      </Text>
    </Pressable>
  );
};
export default Checkbox;
