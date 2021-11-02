import React, {useEffect, useState} from 'react';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {
  getButtonStatus,
  getWorkoutColor,
  getWorkoutLabel,
} from '~/Helpers/WorkoutHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {LangKeys} from '~/Locale/LangKeys';
import Picker from '~/Components/Picker';
import {getTimePickerData} from '~/Helpers/PickerData';
import {secondToTime} from '~/Helpers/TimeHelper';
import IconButton from '~/Components/IconButton';
import IconType from '~/Styles/IconType';
import {
  deleteElementFromArrayWithIndex,
  updateArrayElement,
} from '~/Utils/Array';
import PickerGroup from '~/Components/PickerGroup';
import {ScrollView, View} from 'react-native';
import Button from '~/Components/Button';
import {useImperativeHandle} from 'react';
import Router from '~/Navigator/Router';
import _ from 'lodash';

export type AmrapWorkoutType = {
  minute: number;
  rest: number;
};

export type CreateAmrapRefType = {
  handleSubmit: () => AmrapWorkoutType[];
};

export type CreateAmrapType = {
  isCombine?: boolean;
  containerProps?: ContainerProps;
};

const CreateAmrap = React.forwardRef(
  (props: CreateAmrapType, ref: React.Ref<CreateAmrapRefType>) => {
    const {t} = useTranslation();
    const {themeVariables, layoutStyles} = useStyle();
    const timePickerData = getTimePickerData();
    const _color = getWorkoutColor(WorkoutType.AMRAP, themeVariables);
    const _label = getWorkoutLabel(WorkoutType.AMRAP, t);

    const defaultWorkout: AmrapWorkoutType = {
      minute: timePickerData[0].value,
      rest: 0,
    };

    const defaultAdditionalWorkout: AmrapWorkoutType = {
      minute: timePickerData[0].value,
      rest: timePickerData[0].value,
    };

    const [workoutList, setWorkoutList] = useState<AmrapWorkoutType[]>([
      defaultWorkout,
    ]);

    const [totalTime, setTotalTime] = useState<number>(0);

    useEffect(() => {
      const _totalTime = _.reduce(
        workoutList,
        (memo, data) => {
          return memo + data.minute;
        },
        0,
      );

      const _totalRest = _.reduce(
        workoutList,
        (memo, data) => {
          return memo + data.rest;
        },
        0,
      );

      setTotalTime(_totalRest + _totalTime);
    }, [workoutList]);

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        return workoutList;
      },
    }));

    const updateWorkoutList = (value: number, index: number) => {
      setWorkoutList([
        ...updateArrayElement(workoutList, value, index, 'minute'),
      ]);
    };

    const updateRestList = (value: number, index: number) => {
      setWorkoutList([
        ...updateArrayElement(workoutList, value, index, 'rest'),
      ]);
    };

    const deleteFromWorkoutList = (index: number) => {
      setWorkoutList([...deleteElementFromArrayWithIndex(workoutList, index)]);
    };

    const renderAdditionalWorkouts = () => {
      const additionalWorkoutLength = workoutList.length - 1;
      return additionalWorkoutLength
        ? Array.apply(null, Array(additionalWorkoutLength)).map((_, index) => {
            const _index = index + 1;
            return (
              <PickerGroup
                title={`${_index}. ${_label}`}
                key={index}
                style={layoutStyles.marginTopBase}
                color={_color}
                firstPickerData={timePickerData}
                firstPickerLabel={t(LangKeys.rest)}
                firstPickerSelected={workoutList[_index].rest}
                firstSelectedLabel={secondToTime(workoutList[_index].rest)}
                secondPickerData={timePickerData}
                secondPickerLabel={t(LangKeys.minutes)}
                secondPickerSelected={workoutList[_index].minute}
                secondSelectedLabel={secondToTime(workoutList[_index].minute)}
                onFirstSelectedChange={(selectedVal) => {
                  updateRestList(selectedVal, _index);   
                }}
                onSecondSelectedChange={(selectedVal) => {
                  updateWorkoutList(selectedVal, _index);
                }}
                onDeletePress={() => {
                  deleteFromWorkoutList(_index);
                }}
              />
            );
          })
        : null;
    };

    const handleAddMoreWorkout = () => {
      setWorkoutList((list) => [...list, defaultAdditionalWorkout]);
    };

    return (
      <Container
        style={layoutStyles.horizontalPadding}
        {...props.containerProps}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[
            layoutStyles.flexGrow,
            layoutStyles.justifyCenter,
            layoutStyles.alignCenter,
            layoutStyles.bottomPadding,
          ]}>
          <Text appearance="light" category="hero">
            {`${
              workoutList.length > 1 ? workoutList.length + 'x' : ''
            } ${_label}`}
          </Text>
          <Text
            style={layoutStyles.marginTopLarge}
            appearance="light"
            category="p1">
            {t(LangKeys.createAmrapDesc)}
          </Text>
          <Picker
            style={layoutStyles.marginTopSmall}
            label={t(LangKeys.minutes)}
            data={timePickerData}
            selected={workoutList[0].minute}
            selectedLabel={secondToTime(workoutList[0].minute)}
            onSelectedChange={(selectedValue) => {
              updateWorkoutList(selectedValue, 0);
            }}
            color={_color}
          />
          {renderAdditionalWorkouts()}
          <IconButton
            onPress={handleAddMoreWorkout}
            style={layoutStyles.marginTopBase}
            icon={IconType.AddWithCircle}
            label={t(LangKeys.addOptionalAmrap)}
          />
        </ScrollView>
        <Text
          appearance="light"
          style={[{alignSelf: 'center'}, layoutStyles.marginTopSmall]}>
          {t(LangKeys.totalTime, {totalTime: secondToTime(totalTime)})}
        </Text>
        {!props.isCombine && (
          <Button
            style={layoutStyles.marginTopSmall}
            workoutType={WorkoutType.AMRAP}
            label={t(LangKeys.startTimer)}
            onPress={() =>
              Router.AmrapScene({
                workoutList,
              })
            }
          />
        )}
      </Container>
    );
  },
);
export default CreateAmrap;
