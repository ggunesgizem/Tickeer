import React, {useEffect, useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components';
import {
  getForAndRoundPickerData,
  getSetPickerData,
  getTimePickerData,
} from '~/Helpers/PickerData';
import {useTranslation} from 'react-i18next';
import {
  getButtonStatus,
  getWorkoutColor,
  getWorkoutLabel,
} from '~/Helpers/WorkoutHelper';
import {WorkoutType} from '~/Helpers/Enums';
import Picker from '~/Components/Picker';
import {secondToTime} from '~/Helpers/TimeHelper';
import {LangKeys} from '~/Locale/LangKeys';
import IconButton from '~/Components/IconButton';
import IconType from '~/Styles/IconType';
import Button from '~/Components/Button';
import {StyleProp, View, ViewStyle} from 'react-native';
import PickerGroup from '~/Components/PickerGroup';
import Router from '~/Navigator/Router';

export type TabataWorkoutType = {
  rounds: number;
  work: number;
  workoutRest: number;
  sets?: number;
  rest?: number;
};

const CreateTabata: React.FC<DefaultNavigationProps<'CreateTabata'>> = () => {
  const pickerContainer: StyleProp<ViewStyle> = {alignItems: 'flex-start'};
  const {t} = useTranslation();
  const {themeVariables, layoutStyles} = useStyle();
  const timePickerData = getTimePickerData();
  const setsPickerData = getSetPickerData();
  const roundPickerData = getForAndRoundPickerData();

  const _color = getWorkoutColor(WorkoutType.TABATA, themeVariables);
  const _label = getWorkoutLabel(WorkoutType.TABATA, t);

  const [workoutData, setWorkoutData] = useState<TabataWorkoutType>({
    rounds: roundPickerData[0].value,
    work: timePickerData[0].value,
    workoutRest: timePickerData[0].value,
  });

  const updateObject = (value: number, key: string) => {
    const _workoutData: TabataWorkoutType = workoutData;
    _workoutData[key] = value;
    setWorkoutData({..._workoutData});
  };

  const handleAddMoreWorkout = () => {
    const _workoutData = workoutData;
    _workoutData.sets = setsPickerData[0].value;
    _workoutData.rest = timePickerData[0].value;
    setWorkoutData({..._workoutData});
  };

  const handleDelete = () => {
    const data: TabataWorkoutType = {
      rounds: workoutData.rounds,
      work: workoutData.work,
      workoutRest: workoutData.workoutRest,
      sets: undefined,
      rest: undefined,
    };
    setWorkoutData({...data});
  };
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    let workoutTotal =
      workoutData.rounds * workoutData.work +
      (workoutData.rounds - 1) * workoutData.workoutRest;

    workoutTotal = workoutData.sets
      ? workoutData.sets * workoutTotal
      : workoutTotal;
    const workoutRest =
      workoutData.rest && workoutData.sets
        ? (workoutData.sets - 1) * workoutData.rest
        : 0;

    setTotalTime(workoutTotal + workoutRest);
  }, [workoutData]);
  return (
    <Container style={layoutStyles.horizontalPadding}>
      <View
        style={[
          layoutStyles.fullscreenContainer,
          layoutStyles.alignCenter,
          layoutStyles.justifyCenter,
        ]}>
        <Text appearance="light" category="hero">
          {_label}
        </Text>
        <Text
          style={layoutStyles.marginTopSmall}
          appearance="light"
          category="p1">
          {t(LangKeys.createTabataDesc)}
        </Text>
        <View style={pickerContainer}>
          <Picker
            style={layoutStyles.marginTopSmall}
            label={t(LangKeys.rounds)}
            data={roundPickerData}
            selected={workoutData.rounds}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'rounds')
            }
            color={_color}
          />
          <Picker
            style={layoutStyles.marginTopSmall}
            label={t(LangKeys.work)}
            data={timePickerData}
            selected={workoutData.work}
            selectedLabel={secondToTime(workoutData.work)}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'work')
            }
            color={_color}
          />
          <Picker
            style={layoutStyles.marginTopSmall}
            label={t(LangKeys.rest)}
            data={timePickerData}
            selected={workoutData.workoutRest}
            selectedLabel={secondToTime(workoutData.workoutRest)}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'workoutRest')
            }
            color={_color}
          />
        </View>
        {workoutData.sets && workoutData.rest ? (
          <PickerGroup
            style={layoutStyles.marginTopMedium}
            onDeletePress={handleDelete}
            color={_color}
            firstPickerSelected={workoutData.sets}
            firstSelectedLabel={workoutData.sets.toString()}
            firstPickerData={setsPickerData}
            firstPickerLabel={t(LangKeys.sets)}
            onFirstSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'sets')
            }
            secondPickerSelected={workoutData.rest}
            secondSelectedLabel={secondToTime(workoutData.rest)}
            secondPickerData={timePickerData}
            secondPickerLabel={t(LangKeys.rest)}
            onSecondSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'rest')
            }
          />
        ) : (
          <IconButton
            onPress={handleAddMoreWorkout}
            style={layoutStyles.marginTopBase}
            icon={IconType.AddWithCircle}
            label={t(LangKeys.addOptionalForTime)}
          />
        )}
      </View>
      <Text
        appearance="light"
        style={[{alignSelf: 'center'}, layoutStyles.marginTopSmall]}>
        {t(LangKeys.totalTime, {totalTime: secondToTime(totalTime)})}
      </Text>
      <Button
        workoutType={WorkoutType.TABATA}
        label={t(LangKeys.startTimer)}
        onPress={() =>
          Router.Tabata({
            workoutData,
          })
        }
      />
    </Container>
  );
};
export default CreateTabata;
