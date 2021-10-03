import React, {useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useStyle} from '~/Theme/ThemeHelper';
import Button from '~/Components/Button';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {useTranslation} from 'react-i18next';
import {Icon} from '@ui-kitten/components';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import _ from 'lodash';
import IconButton from '~/Components/IconButton';
import {View} from 'react-native';
import {deleteElementFromArrayWithValue} from '~/Utils/Array';
import {LangKeys} from '~/Locale/LangKeys';
import Router from '~/Navigator/Router';

const CreateCombine: React.FC<DefaultNavigationProps<'CreateCombine'>> = () => {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const [listData, setListData] = useState<WorkoutType[]>([
    WorkoutType.AMRAP,
    WorkoutType.FORTIME,
    WorkoutType.EMOM,
  ]);

  const renderItem = ({item, index, drag, isActive}: RenderItemParams<any>) => {
    const opacity = isActive ? 0.5 : 1;
    return (
      <Button
        fill
        activeOpacity={1}
        onLongPress={drag}
        workoutType={item}
        label={getWorkoutLabel(item, t)}
        style={[{opacity}, index !== 0 && layoutStyles.marginTopBase]}
        leftItem={
          <Icon
            name={IconType.Menu}
            size={16}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
          />
        }
        rightItem={
          <IconButton
            onPress={() => deleteWorkout(item)}
            icon={IconType.Close}
            size={16}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
          />
        }
      />
    );
  };

  const addWorkout = (type: WorkoutType) => {
    setListData([...listData, type]);
  };

  const deleteWorkout = (type: WorkoutType) => {
    setListData([...deleteElementFromArrayWithValue(listData, type)]);
  };

  const handlePrepareCombine = () => {
    Router.CreateCombineStepTwo({
      combineList: listData,
    });
  };

  return (
    <Container>
      <DraggableFlatList
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.justifyCenter,
          layoutStyles.horizontalPadding,
        ]}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(_, index) => `draggable-item-${index}`}
        onDragEnd={({data}) => setListData([...data])}
      />
      <View style={layoutStyles.horizontalPadding}>
        <View style={layoutStyles.alignCenter}>
          {!listData.includes(WorkoutType.AMRAP) && (
            <IconButton
              icon={IconType.AddWithCircle}
              label={t(LangKeys.addAmrapToCombine)}
              onPress={() => addWorkout(WorkoutType.AMRAP)}
            />
          )}
          {!listData.includes(WorkoutType.FORTIME) && (
            <IconButton
              style={layoutStyles.marginTopBase}
              icon={IconType.AddWithCircle}
              label={t(LangKeys.addForTimeToCombine)}
              onPress={() => addWorkout(WorkoutType.FORTIME)}
            />
          )}
          {!listData.includes(WorkoutType.EMOM) && (
            <IconButton
              style={layoutStyles.marginTopBase}
              icon={IconType.AddWithCircle}
              label={t(LangKeys.addEmomToCombine)}
              onPress={() => addWorkout(WorkoutType.EMOM)}
            />
          )}
        </View>
        {listData.length > 1 && (
          <Button
            style={layoutStyles.marginTopBase}
            onPress={handlePrepareCombine}
            workoutType={WorkoutType.COMBINE}
            label={t(LangKeys.prepareCombine)}
          />
        )}
      </View>
    </Container>
  );
};
export default CreateCombine;
