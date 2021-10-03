import React, {useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container, {ContainerProps} from '~/Components/Container';
import {WorkoutType} from '~/Helpers/Enums';
import Amrap from './Amrap';
import ForTime from './ForTime';
import Emom from './Emom';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components';
import {getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {useTranslation} from 'react-i18next';
import WorkoutSuccess from '~/Components/WorkoutSuccess';

const Combine: React.FC<DefaultNavigationProps<'Combine'>> = (props) => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const _props = props.route.params;
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(0);
  const [isCombineFinish, setIsCombineFinish] = useState<boolean>(false);

  const initialProps = {
    initialPlay: true,
    restTime:
      currentWorkoutIndex > 1
        ? _props.combineSecondRest
        : _props.combineFirstRest,
  };

  const containerProps: ContainerProps = {
    withoutBg: true,
    withoutSafeArea: true,
  };

  const isFirstWorkout = (type: WorkoutType) => {
    return _props.combineList[0] === type;
  };

  const getWorkout = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.AMRAP:
        return (
          <Amrap
            {..._props.amrapWorkoutData!}
            containerProps={containerProps}
            onCombineWorkoutFinish={() => {
              handleWorkoutFinish(WorkoutType.AMRAP);
            }}
            {...(!isFirstWorkout(WorkoutType.AMRAP) ? initialProps : {})}
          />
        );
      case WorkoutType.EMOM:
        return (
          <Emom
            {..._props.emomWorkoutData!}
            containerProps={containerProps}
            onCombineWorkoutFinish={() => {
              handleWorkoutFinish(WorkoutType.EMOM);
            }}
            {...(!isFirstWorkout(WorkoutType.EMOM) ? initialProps : {})}
          />
        );
      case WorkoutType.FORTIME:
      default:
        return (
          <ForTime
            {..._props.forTimeWorkoutData!}
            containerProps={containerProps}
            onCombineWorkoutFinish={() => {
              handleWorkoutFinish(WorkoutType.FORTIME);
            }}
            {...(!isFirstWorkout(WorkoutType.FORTIME) ? initialProps : {})}
          />
        );
    }
  };

  const handleWorkoutFinish = (type: WorkoutType) => {
    if (currentWorkoutIndex < _props.combineList.length - 1) {
      setCurrentWorkoutIndex((index) => index + 1);
    } else {
      setIsCombineFinish(true);
    }
  };

  return (
    <Container style={[layoutStyles.justifyCenter, layoutStyles.alignCenter]}>
      {isCombineFinish ? (
        <WorkoutSuccess type={WorkoutType.COMBINE} />
      ) : (
        <>
          <Text
            style={layoutStyles.marginTopSmall}
            appearance="light"
            category="h4">{`${getWorkoutLabel(WorkoutType.COMBINE, t)}  ${
            currentWorkoutIndex + 1
          }/${_props.combineList.length}`}</Text>
          {getWorkout(_props.combineList[currentWorkoutIndex])}
        </>
      )}
    </Container>
  );
};
export default Combine;
