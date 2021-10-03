import React, {useEffect, useRef, useState} from 'react';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {percentegaTime} from '~/Helpers/TimeHelper';
import {getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import WorkoutTimer from '~/Components/WorkoutTimer';
import {AmrapWorkoutType} from './CreateAmrap';
import {ForTimeSceneProps} from '~/Navigator/NavigatorTypes';
import {LangKeys} from '~/Locale/LangKeys';
import {getWorkoutLog, setWorkoutLog} from '~/Helpers/AsyncStorageHelper';
import moment from 'moment';
import {Alert} from 'react-native';
import Router from '~/Navigator/Router';
import WorkoutSuccess from '~/Components/WorkoutSuccess';

type ForTimeRefType = {};

type Props = {
  containerProps?: ContainerProps;
};

const ForTime = React.forwardRef(
  (props: ForTimeSceneProps & Props, _ref: React.Ref<ForTimeRefType>) => {
    const {t} = useTranslation();
    const {layoutStyles} = useStyle();

    const workoutSetCount = useRef<number>(0);
    const forTimeSetCount = useRef<number>(0);

    const _workoutData: AmrapWorkoutType = {
      minute: props.workoutData.minute,
      rest: 0,
    };

    const [isWorkoutFinish, setIsWorkoutFinish] = useState<boolean>(false);

    //WORKOUT TIMER STATES
    const [timerKey, setTimerKey] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [workoutTime, setWorkoutTime] = useState<number>(_workoutData.minute);

    //SET CHANGE STATES
    const [isRest, setIsRest] = useState<boolean>(false);

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
        forTimeSetCount.current += 1;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStartTimer]);

    const handleTimeChange = (remainingTime: number) => {
      setCurrentTime(percentegaTime(remainingTime, workoutTime, !isRest));
    };

    const handleFinish = () => {
      if (workoutSetCount.current < 1) {
        if (isRest) {
          setIsRest(false);
          setWorkoutTime(_workoutData.minute);
          workoutSetCount.current += 1;
        } else {
          setIsRest(true);
          setWorkoutTime(_workoutData.rest);
        }
        setTimerKey((key) => key + 1);
      } else {
        if (
          props.workoutData.sets &&
          forTimeSetCount.current < props.workoutData.sets
        ) {
          if (isRest) {
            setIsRest(false);
            setWorkoutTime(_workoutData.minute);
            workoutSetCount.current = 1;
            forTimeSetCount.current += 1;
          } else {
            setIsRest(true);
            setWorkoutTime(props.workoutData.rest!);
          }
          setTimerKey((key) => key + 1);
        } else {
          handleWorkoutFinish();
        }
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
        workoutType: WorkoutType.FORTIME,
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
            type={WorkoutType.FORTIME}
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
              {`${getWorkoutLabel(WorkoutType.FORTIME, t)} ${
                showStartTimer ? 1 : forTimeSetCount.current
              } of ${props.workoutData.sets ?? 1}`}
            </Text>
            <WorkoutTimer
              reverse={!isRest}
              style={layoutStyles.marginTopBase}
              isRest={isRest}
              showStartTimer={showStartTimer}
              currentTime={currentTime}
              workoutType={WorkoutType.FORTIME}
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
          </>
        )}
      </Container>
    );
  },
);
export default ForTime;
