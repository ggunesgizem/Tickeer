import React, {useImperativeHandle, useState} from 'react';
import Container, {ContainerProps} from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components';
import {
  emomFor,
  getForAndRoundPickerData,
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
import Button from '~/Components/Button';
import {View} from 'react-native';
import Router from '~/Navigator/Router';

export type EmomWorkoutType = {
  every: number;
  for: number;
};

export type CreateEmompRefType = {
  handleSubmit: () => EmomWorkoutType;
};

export type CreateEmomType = {
  isCombine?: boolean;
  containerProps?: ContainerProps;
};

const CreateEmom = React.forwardRef(
  (props: CreateEmomType, ref: React.Ref<CreateEmompRefType>) => {
    const {t} = useTranslation();
    const {themeVariables, layoutStyles} = useStyle();
    const timePickerData = getTimePickerData();

    const _color = getWorkoutColor(WorkoutType.EMOM, themeVariables);
    const _label = getWorkoutLabel(WorkoutType.EMOM, t);

    const [workoutData, setWorkoutData] = useState<EmomWorkoutType>({
      every: timePickerData[0].value,
      for: emomFor(timePickerData[0].value, t)[0].value,
    });

    const updateObject = (value: number, key: string) => {
      const _workoutData: EmomWorkoutType = workoutData;
      _workoutData[key] = value;
      setWorkoutData({..._workoutData});
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
            {t(LangKeys.createEmomDesc, {
              every: secondToTime(workoutData.every),
              for: secondToTime(workoutData.for * workoutData.every),
            })}
          </Text>
          <Picker
            style={layoutStyles.marginTopSmall}
            isLeftLabel
            label={t(LangKeys.every)}
            data={timePickerData}
            selected={workoutData.every}
            selectedLabel={secondToTime(workoutData.every)}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'every')
            }
            color={_color}
          />
          <Picker
            style={layoutStyles.marginTopSmall}
            isLeftLabel
            label={t(LangKeys.for)}
            data={emomFor(workoutData.every, t)}
            selected={workoutData.for}
            selectedLabel={secondToTime(workoutData.for * workoutData.every)}
            onSelectedChange={(selectedValue) =>
              updateObject(selectedValue, 'for')
            }
            color={_color}
          />
        </View>

        {!props.isCombine && (
          <Button
            workoutType={WorkoutType.EMOM}
            label={t(LangKeys.startTimer)}
            onPress={() => {
              Router.EmomScene({
                workoutData,
              });
            }}
          />
        )}
      </Container>
    );
  },
);
export default CreateEmom;
