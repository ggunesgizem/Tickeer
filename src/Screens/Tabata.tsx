import React, {useEffect, useRef, useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {percentegaTime} from '~/Helpers/TimeHelper';
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

const Tabata: React.FC<DefaultNavigationProps<'Tabata'>> = (props) => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();

  const workoutSetCount = useRef<number>(0);
  const tabataSetCount = useRef<number>(0);

  const _props = props.route.params;

  const _workoutList: AmrapWorkoutType[] = Array.apply(
    null,
    Array(_props.workoutData.rounds),
  ).map(() => {
    return {
      minute: _props.workoutData.work,
      rest: _props.workoutData.workoutRest,
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
  //SET CHANGE STATES
  const [isRest, setIsRest] = useState<boolean>(false);

  //START TIMER STATES
  const [showStartTimer, setShowStartTimer] = useState<boolean>(true);
  const [isPlayStartTimer, setIsPlayStartTimer] = useState<boolean>(false);

  useEffect(() => {
    if (!showStartTimer) {
      setShowStartTimer(false);
      setIsPlay(true);
      workoutSetCount.current += 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStartTimer]);

  const handleTimeChange = (remainingTime: number) => {
    setCurrentTime(percentegaTime(remainingTime, workoutTime));
  };

  const handleFinish = () => {
    if (workoutSetCount.current < _workoutList.length) {
      if (isRest) {
        setIsRest(false);
        setWorkoutTime(_workoutList[workoutSetCount.current].minute);
        workoutSetCount.current += 1;
      } else {
        setIsRest(true);
        setWorkoutTime(_workoutList[workoutSetCount.current].rest);
      }
      setTimerKey((key) => key + 1);
    } else {
      if (
        _props.workoutData.sets &&
        tabataSetCount.current < _props.workoutData.sets
      ) {
        if (isRest) {
          setIsRest(false);
          setWorkoutTime(_workoutList[0].minute);
          workoutSetCount.current = 1;
          tabataSetCount.current += 1;
        } else {
          setIsRest(true);
          setWorkoutTime(_props.workoutData.rest!);
        }
        setTimerKey((key) => key + 1);
      } else {
        handleWorkoutFinish();
      }
    }
  };

  const handleWorkoutFinish = () => {
    setIsWorkoutFinish(true);

    const workoutLog = {
      workoutData: _props.workoutData,
      workoutType: WorkoutType.TABATA,
      date: moment().format('DD.MM.YYYY HH:mm'),
    };
    setWorkoutLog(workoutLog);
  };

  return (
    <Container style={[layoutStyles.justifyCenter, layoutStyles.alignCenter]}>
      {isWorkoutFinish ? (
        <WorkoutSuccess
          type={WorkoutType.TABATA}
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
            {`${getWorkoutLabel(WorkoutType.TABATA, t)} ${
              tabataSetCount.current
            } of ${_props.workoutData.sets ?? 1}`}
          </Text>
          <Text appearance="light" category="h4">
            {`${showStartTimer ? 1 : workoutSetCount.current}/${
              _workoutList.length
            } - Work`}
          </Text>
          <WorkoutTimer
            style={layoutStyles.marginTopBase}
            isRest={isRest}
            showStartTimer={showStartTimer}
            currentTime={currentTime}
            workoutType={WorkoutType.TABATA}
            handleTimerPress={() => setIsPlay(!isPlay)}
            timerComponentKey={timerKey}
            isPlay={isPlay}
            handleTimeChange={handleTimeChange}
            handleFinish={handleFinish}
            workoutTime={workoutTime}
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
};
export default Tabata;
