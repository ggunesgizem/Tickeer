import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {WorkoutType} from '~/Helpers/Enums';
import AnimationCircle from './AnimationCircle';
import StartTimer from './StartTimer';
import Timer from './Timer';

type Props = {
  style?: StyleProp<ViewStyle>;
  showStartTimer: boolean;
  workoutType: WorkoutType;
  currentTime: number;
  isRest?: boolean;
  timerComponentKey: number;
  isPlay: boolean;
  handleTimeChange: (currentTime: number) => void;
  handleFinish: () => void;
  workoutTime: number;
  isPlayStartTimer?: boolean;
  handleStartTimerFinish: () => void;
  handleStartTimerPress: (isPlayReverse: boolean) => void;
  handleTimerPress: () => void;
  reverse?: boolean;
  startTimerTime?: number;
};

const WorkoutTimer: React.FC<Props> = (props) => {
  const styles = StyleSheet.create({
    noneDisplay: {
      display: 'none',
    },
  });
  return (
    <>
      <AnimationCircle
        style={[props.style, props.showStartTimer && styles.noneDisplay]}
        size={props.currentTime}
        workoutType={props.isRest ? WorkoutType.REST : props.workoutType}>
        <TouchableOpacity onPress={props.handleTimerPress}>
          <Timer
            reverse={props.reverse}
            key={props.timerComponentKey}
            isPlay={props.isPlay}
            onTimeChange={props.handleTimeChange}
            onFinish={props.handleFinish}
            time={props.workoutTime}
            workoutType={props.isRest ? WorkoutType.REST : props.workoutType}
          />
        </TouchableOpacity>
      </AnimationCircle>
      {props.showStartTimer && (
        <StartTimer
          time={props.startTimerTime}
          style={props.style}
          isPlay={props.isPlayStartTimer}
          type={props.workoutType}
          onFinish={props.handleStartTimerFinish}
          onPress={props.handleStartTimerPress}
        />
      )}
    </>
  );
};
export default WorkoutTimer;
