import React, {useRef, useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {Tab, TabBar} from '@ui-kitten/components';
import {getWorkoutColor, getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {useTranslation} from 'react-i18next';
import {WorkoutType} from '~/Helpers/Enums';
import {useStyle} from '~/Theme/ThemeHelper';
import {StyleSheet, View} from 'react-native';
import CreateAmrap, {CreateAmrapRefType} from './CreateAmrap';
import CreateEmom, {CreateEmompRefType} from './CreateEmom';
import CreateForTime, {CreateForTimeRefType} from './CreateForTime';
import Button from '~/Components/Button';
import {LangKeys} from '~/Locale/LangKeys';
import _ from 'lodash';
import Router from '~/Navigator/Router';
import Picker from '~/Components/Picker';
import {getCombineRestData} from '~/Helpers/PickerData';
import {secondToTime} from '~/Helpers/TimeHelper';

const CreateCombineStepTwo: React.FC<
  DefaultNavigationProps<'CreateCombineStepTwo'>
> = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {t} = useTranslation();
  const {layoutStyles, themeVariables} = useStyle();

  const [combineFirstRest, setCombineFirstRest] = useState<number>(
    getCombineRestData()[0].value,
  );

  const [combineSecondRest, setCombineSecondRest] = useState<number>(
    getCombineRestData()[0].value,
  );

  const createAmrapRef = useRef<CreateAmrapRefType>();
  const createEmomRef = useRef<CreateEmompRefType>();
  const createForTimeaRef = useRef<CreateForTimeRefType>();

  const handleStartCombine = () => {
    const createAmrap = createAmrapRef.current?.handleSubmit();
    const createEmom = createEmomRef.current?.handleSubmit();
    const createForTime = createForTimeaRef.current?.handleSubmit();

    Router.Combine({
      amrapWorkoutData: {workoutList: createAmrap!},
      emomWorkoutData: {workoutData: createEmom!},
      forTimeWorkoutData: {workoutData: createForTime!},
      combineList: props.route.params.combineList,
      combineFirstRest,
      combineSecondRest,
    });
  };

  const styles = StyleSheet.create({
    container: {
      ...layoutStyles.fullscreenContainer,
      ...layoutStyles.marginTopSmall,
      display: 'none',
    },
    displayFlex: {
      display: 'flex',
    },
  });

  return (
    <Container>
      <TabBar
        style={layoutStyles.marginTopSmall}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        {_.map(props.route.params.combineList, (item, index) => {
          return <Tab key={index} title={getWorkoutLabel(item, t)} />;
        })}
      </TabBar>
      <View
        style={[
          styles.container,
          props.route.params.combineList[selectedIndex] === WorkoutType.AMRAP &&
            styles.displayFlex,
        ]}>
        <CreateAmrap
          ref={createAmrapRef}
          isCombine
          containerProps={{withoutBg: true, withoutSafeArea: true}}
        />
      </View>
      <View
        style={[
          styles.container,
          props.route.params.combineList[selectedIndex] === WorkoutType.EMOM &&
            styles.displayFlex,
        ]}>
        <CreateEmom
          ref={createEmomRef}
          isCombine
          containerProps={{withoutBg: true, withoutSafeArea: true}}
        />
      </View>
      <View
        style={[
          styles.container,
          props.route.params.combineList[selectedIndex] ===
            WorkoutType.FORTIME && styles.displayFlex,
        ]}>
        <CreateForTime
          ref={createForTimeaRef}
          isCombine
          containerProps={{withoutBg: true, withoutSafeArea: true}}
        />
      </View>
      <Picker
        style={layoutStyles.marginTopSmall}
        data={getCombineRestData()}
        label={`${getWorkoutLabel(
          props.route.params.combineList[0],
          t,
        )} - ${getWorkoutLabel(props.route.params.combineList[1], t)} Rest`}
        selected={combineFirstRest}
        selectedLabel={secondToTime(combineFirstRest)}
        onSelectedChange={setCombineFirstRest}
        color={getWorkoutColor(WorkoutType.COMBINE, themeVariables)}
      />
      {props.route.params.combineList.length > 2 && (
        <Picker
          style={layoutStyles.marginTopSmall}
          data={getCombineRestData()}
          label={`${getWorkoutLabel(
            props.route.params.combineList[1],
            t,
          )} - ${getWorkoutLabel(props.route.params.combineList[2], t)} Rest`}
          selected={combineSecondRest}
          selectedLabel={secondToTime(combineSecondRest)}
          onSelectedChange={setCombineSecondRest}
          color={getWorkoutColor(WorkoutType.COMBINE, themeVariables)}
        />
      )}
      <Button
        onPress={handleStartCombine}
        style={[layoutStyles.horizontalMargin, layoutStyles.marginTopMedium]}
        workoutType={WorkoutType.COMBINE}
        label={t(LangKeys.startCombine)}
      />
    </Container>
  );
};
export default CreateCombineStepTwo;
