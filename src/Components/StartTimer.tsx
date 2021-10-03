import React, {useEffect, useState} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {getCountdownTimePreference} from '~/Helpers/AsyncStorageHelper';
import {WorkoutType} from '~/Helpers/Enums';
import AnimationCircle from './AnimationCircle';
import Timer from './Timer';

type Props = {
  isPlay?: boolean;
  type: WorkoutType;
  onPress: (isPlayReverse: boolean) => void;
  onFinish: () => void;
  style?: StyleProp<ViewStyle>;
  time?: number;
};

const StartTimer: React.FC<Props> = (props) => {
  const [defaultTime, setDefaultTime] = useState<number>();
  useEffect(() => {
    getCountdownTimePreference().then((time) => {
      if (time) {
        setDefaultTime(time);
      } else {
        setDefaultTime(10);
      }
    });
  }, []);
  return (
    <AnimationCircle style={props.style} size={0} workoutType={props.type}>
      <TouchableOpacity onPress={() => props.onPress(!props.isPlay)}>
        {defaultTime && (
          <Timer
            isStartTimer
            isPlay={!!props.isPlay}
            onFinish={props.onFinish}
            time={props.time ?? defaultTime}
            workoutType={props.type}
          />
        )}
      </TouchableOpacity>
    </AnimationCircle>
  );
};
export default StartTimer;
