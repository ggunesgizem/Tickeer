import {Icon, Text} from '@ui-kitten/components';
import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {getSoundPreference} from '~/Helpers/AsyncStorageHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {playSound, SoundList} from '~/Helpers/SoundHelper';
import {secondToTime} from '~/Helpers/TimeHelper';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';

type Props = {
  isPlay: boolean;
  time: number;
  onFinish: () => void;
  reverse?: boolean;
  workoutType: WorkoutType;
  onTimeChange?: (currentTime: number) => void;
  isStartTimer?: boolean;
};

const Timer: React.FC<Props> = (props) => {
  const [time, setTime] = useState<number>(props.reverse ? 0 : props.time);
  const timerInterval = useRef<any>();
  const isPlayRef = useRef<boolean>();
  const {layoutStyles, themeVariables} = useStyle();
  const isSoundEnabled = useRef<boolean>(true);

  useEffect(() => {
    isPlayRef.current = props.isPlay;
  }, [props.isPlay]);

  useEffect(() => {
    getSoundPreference().then((response) => {
      if (!response) {
        isSoundEnabled.current = response;
      }
    });
  }, []);

  const handleInterval = () => {
    if (isPlayRef.current) {
      setTime((t) => (props.reverse ? t + 1 : t - 1));
    }
  };

  const isRestWorkout = () => {
    return props.workoutType === WorkoutType.REST;
  };

  useEffect(() => {
    timerInterval.current = setInterval(handleInterval, 1000);
    return () => {
      clearInterval(timerInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSoundEnabled.current) {
      let _time = time;
      if (props.reverse) {
        _time = props.time - time;
      }
      const _isRest = isRestWorkout();
      if (props.isStartTimer || _isRest) {
        if (time === 3) {
          playSound(SoundList.START_TIMER_321);
        }
      } else {
        if (_time === Math.floor(props.time / 2)) {
          playSound(SoundList.TIMER_HALF);
        } else if (_time === 10) {
          playSound(SoundList.TIMER_LAST_TEN);
        } else if (_time === 3) {
          playSound(SoundList.TIMER_END);
        }
      }
    }

    props.onTimeChange && props.onTimeChange(time);
    if (props.reverse ? time === props.time : time === 0) {
      clearInterval(timerInterval.current);
      props.onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const renderPlayScreen = () => {
    return (
      <>
        <Text
          category="time"
          style={{
            color: getWorkoutColor(props.workoutType, themeVariables),
          }}>
          {secondToTime(time)}
        </Text>
        <Text appearance="light">tap to pause</Text>
      </>
    );
  };

  const renderPauseScreen = () => {
    return (
      <>
        <Text
          category="p1"
          style={{
            color: getWorkoutColor(props.workoutType, themeVariables),
          }}>
          {secondToTime(time)}
        </Text>
        <Icon
          style={layoutStyles.marginTopBase}
          name={IconType.Pause}
          color={getWorkoutColor(props.workoutType, themeVariables)}
          size={50}
        />
        <Text style={layoutStyles.marginTopBase} appearance="light">
          tap to resume
        </Text>
      </>
    );
  };

  const renderStartTimerPlayScreen = () => {
    return (
      <>
        <Text
          category="time"
          style={{
            color: getWorkoutColor(props.workoutType, themeVariables),
          }}>
          {time === 0 ? 'GO' : secondToTime(time)}
        </Text>
        <Text appearance="light">tap to pause</Text>
      </>
    );
  };

  const renderStartTimerPauseScreen = () => {
    return (
      <>
        <Icon
          style={layoutStyles.marginTopBase}
          name={IconType.Play}
          color={getWorkoutColor(props.workoutType, themeVariables)}
          size={50}
        />
        <Text style={layoutStyles.marginTopBase} appearance="light">
          tap to start
        </Text>
      </>
    );
  };

  const renderTimer = () => {
    if (props.isStartTimer) {
      return props.isPlay
        ? renderStartTimerPlayScreen()
        : renderStartTimerPauseScreen();
    } else {
      return props.isPlay ? renderPlayScreen() : renderPauseScreen();
    }
  };

  return (
    <View style={[layoutStyles.justifyCenter, layoutStyles.alignCenter]}>
      {renderTimer()}
    </View>
  );
};
export default Timer;
