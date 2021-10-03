import React, {useEffect, useRef, useState} from 'react';
import {AmrapSceneProps} from '~/Navigator/NavigatorTypes';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {percentegaTime, secondToTime} from '~/Helpers/TimeHelper';
import {
  getButtonStatus,
  getWorkoutColor,
  getWorkoutLabel,
  RecordType,
  RoundRecorType,
  WorkoutLogType,
} from '~/Helpers/WorkoutHelper';
import {Icon, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import WorkoutTimer from '~/Components/WorkoutTimer';
import Success from '~/Components/Success';
import _ from 'lodash';
import {Alert, View} from 'react-native';
import {getWorkoutLog, setWorkoutLog} from '~/Helpers/AsyncStorageHelper';
import Button from '~/Components/Button';
import Router from '~/Navigator/Router';
import moment from 'moment';
import IconType from '~/Styles/IconType';
import WorkoutSuccess from '~/Components/WorkoutSuccess';

type AmrapRefType = {};

type Props = {
  containerProps?: ContainerProps;
};

const Amrap = React.forwardRef(
  (props: AmrapSceneProps & Props, _ref: React.Ref<AmrapRefType>) => {
    const {t} = useTranslation();
    const {layoutStyles, themeVariables} = useStyle();
    const workoutSetCount = useRef<number>(0);

    const [isWorkoutFinish, setIsWorkoutFinish] = useState<boolean>(false);

    //WORKOUT TIMER STATES
    const [timerKey, setTimerKey] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [workoutTime, setWorkoutTime] = useState<number>(
      props.workoutList[0].minute,
    );

    const actualTime = useRef<number>(0);
    const [roundRecords, setRoundRecord] = useState<RecordType>({});

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
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStartTimer]);

    const handleBackgroundPress = () => {
      if (!showStartTimer && isPlay && !isWorkoutFinish && !isRest) {
        let records = roundRecords;
        let setRecord: RoundRecorType[] = records[workoutSetCount.current];
        let _time = actualTime.current;
        let _diff;
        console.log(actualTime.current);
        if (setRecord) {
          _diff = _.last(setRecord).time - actualTime.current;
        } else {
          setRecord = [];
          _diff = workoutTime - actualTime.current;
        }

        setRecord.push({
          time: _time,
          diff: _diff,
        });
        records[workoutSetCount.current] = setRecord;
        setRoundRecord({...records});
      }
    };

    useEffect(() => {
      console.table(roundRecords);
    }, [roundRecords]);

    const handleTimeChange = (remainingTime: number) => {
      actualTime.current = remainingTime;
      setCurrentTime(percentegaTime(remainingTime, workoutTime));
    };

    const handleFinish = () => {
      if (workoutSetCount.current < props.workoutList.length) {
        if (isRest) {
          setIsRest(false);
          setWorkoutTime(props.workoutList[workoutSetCount.current].minute);
          workoutSetCount.current += 1;
        } else {
          setIsRest(true);
          setWorkoutTime(props.workoutList[workoutSetCount.current].rest);
        }
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

      const workoutLog: WorkoutLogType = {
        roundRecords,
        workoutData: props.workoutList,
        workoutType: WorkoutType.AMRAP,
        date: moment().format('DD.MM.YYYY HH:mm'),
      };
      setWorkoutLog(workoutLog);
    };

    return (
      <Container
        style={[layoutStyles.justifyCenter, layoutStyles.alignCenter]}
        onPress={handleBackgroundPress}
        {...props.containerProps}>
        {isWorkoutFinish ? (
          <WorkoutSuccess
            type={WorkoutType.AMRAP}
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
          <View
            style={[
              layoutStyles.fullscreenContainer,
              layoutStyles.justifyCenter,
              layoutStyles.alignCenter,
            ]}>
            <Text appearance="light" category="hero">
              {`${getWorkoutLabel(WorkoutType.AMRAP, t)} ${
                showStartTimer ? 1 : workoutSetCount.current
              } of ${props.workoutList.length}`}
            </Text>
            <Text appearance="light" category="h4">
              {`${secondToTime(workoutTime)} ${t(LangKeys.minutes)}`}
              {roundRecords[workoutSetCount.current]?.length > 0
                ? ` ${t(LangKeys.lastRound)} ${secondToTime(
                    _.last(roundRecords[workoutSetCount.current])?.diff!,
                  )}`
                : ''}
            </Text>
            <WorkoutTimer
              style={layoutStyles.marginTopBase}
              showStartTimer={showStartTimer}
              currentTime={currentTime}
              isRest={isRest}
              workoutType={WorkoutType.AMRAP}
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
          </View>
        )}
        {!isWorkoutFinish && (
          <Text appearance="light">{`${t(LangKeys.roundCounter)} ${
            roundRecords[workoutSetCount.current]?.length ?? 0
          }`}</Text>
        )}
      </Container>
    );
  },
);

export default Amrap;
