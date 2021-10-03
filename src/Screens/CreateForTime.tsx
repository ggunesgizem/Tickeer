import React, {useImperativeHandle, useState} from 'react';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components';
import {getSetPickerData, getTimePickerData} from '~/Helpers/PickerData';
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
import {View} from 'react-native';
import PickerGroup from '~/Components/PickerGroup';
import Router from '~/Navigator/Router';

export type ForTimeWorkoutType = {
  minute: number;
  sets?: number;
  rest?: number;
};

export type CreateForTimeRefType = {
  handleSubmit: () => ForTimeWorkoutType;
};

export type CreateForTimeType = {
  isCombine?: boolean;
  containerProps?: ContainerProps;
};

const CreateForTime = React.forwardRef(
  (props: CreateForTimeType, ref: React.Ref<CreateForTimeRefType>) => {
    const {t} = useTranslation();
    const {themeVariables, layoutStyles} = useStyle();
    const timePickerData = getTimePickerData();
    const setsPickerData = getSetPickerData();

    const _color = getWorkoutColor(WorkoutType.FORTIME, themeVariables);
    const _label = getWorkoutLabel(WorkoutType.FORTIME, t);

    const [workoutData, setWorkoutData] = useState<ForTimeWorkoutType>({
      minute: timePickerData[0].value,
    });

    const updateObject = (value: number, key: string) => {
      const _workoutData: ForTimeWorkoutType = workoutData;
      _workoutData[key] = value;
      setWorkoutData({..._workoutData});
    };

    const handleAddMoreWorkout = () => {
      const data: ForTimeWorkoutType = {
        minute: workoutData.minute,
        sets: setsPickerData[0].value,
        rest: timePickerData[0].value,
      };
      setWorkoutData({...data});
    };

    const handleDelete = () => {
      const data: ForTimeWorkoutType = {
        minute: workoutData.minute,
        sets: undefined,
        rest: undefined,
      };
      setWorkoutData({...data});
    };

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        return workoutData;
      },
    }));

    return (
      <Container
        style={layoutStyles.horizontalPadding}
        {...props.containerProps}>
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
            style={layoutStyles.marginTopLarge}
            appearance="light"
            category="p1">
            {t(LangKeys.createForTimeDesc)}
          </Text>
          <Picker
            style={layoutStyles.marginTopSmall}
            isLeftLabel
            label={t(LangKeys.timeCap)}
            data={timePickerData}
            selected={workoutData.minute}
            selectedLabel={secondToTime(workoutData.minute)}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'minute')
            }
            color={_color}
          />
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

        {!props.isCombine && (
          <Button
            workoutType={WorkoutType.FORTIME}
            label={t(LangKeys.startTimer)}
            onPress={() => {
              Router.ForTimeScene({
                workoutData,
              });
            }}
          />
        )}
      </Container>
    );
  },
);
export default CreateForTime;
