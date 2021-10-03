import React, {useEffect, useRef, useState} from 'react';
import {EmomSceneProps} from '~/Navigator/NavigatorTypes';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {percentegaTime, secondToTime} from '~/Helpers/TimeHelper';
import {getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import WorkoutTimer from '~/Components/WorkoutTimer';
import {AmrapWorkoutType} from './CreateAmrap';
import {LangKeys} from '~/Locale/LangKeys';
import {getWorkoutLog, setWorkoutLog} from '~/Helpers/AsyncStorageHelper';
import moment from 'moment';
import {Alert} from 'react-native';
import Router from '~/Navigator/Router';
import WorkoutSuccess from '~/Components/WorkoutSuccess';

type EmomRefType = {};

type Props = {
  containerProps?: ContainerProps;
};

const Emom = React.forwardRef(
  (props: EmomSceneProps & Props, _ref: React.Ref<EmomRefType>) => {
    const {t} = useTranslation();
    const {layoutStyles} = useStyle();
    const workoutSetCount = useRef<number>(0);

    const [remainingTotalTime, setRemaininTotalTime] = useState(
      props.workoutData.for * props.workoutData.every,
    );

    const _workoutList: AmrapWorkoutType[] = Array.apply(
      null,
      Array(props.workoutData.for),
    ).map(() => {
      return {
        minute: props.workoutData.every,
        rest: 0,
      };
    });

    const [isWorkoutFinish, setIsWorkoutFinish] = useState<boolean>(false);

    //WORKOUT TIMER STATES
    const [timerKey, setTimerKey] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [workoutTime, setWorkoutTime] = useState<number>(
      _workoutList[0].minute,
    );

    //START TIMER STATES
    const [showStartTimer, setShowStartTimer] = useState<boolean>(true);
    const [isPlayStartTimer, setIsPlayStartTimer] = useState<boolean>(
      props.initialPlay ?? false,
    );
    useEffect(() => {
      if (!showStartTimer) {
        setShowStartTimer(false);
        setIsPlay(true);
        workoutSetCount.current += 1;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStartTimer]);

    const decreaseTotalTime = () => {
      !showStartTimer && setRemaininTotalTime((time) => time - 1);
    };

    const handleTimeChange = (remainingTime: number) => {
      decreaseTotalTime();
      setCurrentTime(percentegaTime(remainingTime, workoutTime));
    };

    const handleFinish = () => {
      if (workoutSetCount.current < _workoutList.length) {
        setWorkoutTime(_workoutList[workoutSetCount.current].minute);
        workoutSetCount.current += 1;
        setTimerKey((key) => key + 1);
      } else {
        handleWorkoutFinish();
      }
    };

    const handleWorkoutFinish = () => {
      if (props.onCombineWorkoutFinish) {
        props.onCombineWorkoutFinish();
      } else {
        setIsWorkoutFinish(true);
      }

      const workoutLog = {
        workoutData: props.workoutData,
        workoutType: WorkoutType.EMOM,
        date: moment().format('DD.MM.YYYY HH:mm'),
      };
      setWorkoutLog(workoutLog);
    };

    return (
      <Container
        style={[layoutStyles.justifyCenter, layoutStyles.alignCenter]}
        {...props.containerProps}>
        {isWorkoutFinish ? (
          <WorkoutSuccess
            type={WorkoutType.EMOM}
            onPress={() => {
              getWorkoutLog().then((response) => {
                if (response.data) {
                  Router.WorkoutLog({
                    workoutLog: response.data[0],
                  });
                } else {
                  Alert.alert(t(LangKeys.general_warning_message));
                }
              });
            }}
          />
        ) : (
          <>
            <Text appearance="light" category="hero">
              {`${getWorkoutLabel(WorkoutType.EMOM, t)}`}
            </Text>
            <Text appearance="light" category="hero">
              {`${showStartTimer ? 1 : workoutSetCount.current}/${
                _workoutList.length
              }`}
            </Text>
            <WorkoutTimer
              style={layoutStyles.marginTopBase}
              showStartTimer={showStartTimer}
              currentTime={currentTime}
              workoutType={WorkoutType.EMOM}
              handleTimerPress={() => setIsPlay(!isPlay)}
              timerComponentKey={timerKey}
              isPlay={isPlay}
              handleTimeChange={handleTimeChange}
              handleFinish={handleFinish}
              workoutTime={workoutTime}
              startTimerTime={props.restTime}
              isPlayStartTimer={isPlayStartTimer}
              handleStartTimerFinish={() => {
                setTimeout(() => {
                  setShowStartTimer(false);
                }, 500);
              }}
              handleStartTimerPress={setIsPlayStartTimer}
            />
            <Text style={layoutStyles.marginTopBase} appearance="light">
              {`Total time: ${secondToTime(remainingTotalTime)}`}
            </Text>
          </>
        )}
      </Container>
    );
  },
);
export default Emom;
