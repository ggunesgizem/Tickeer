import React from 'react';
import {FlatList, View} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {WorkoutType} from '~/Helpers/Enums';
import Button from '~/Components/Button';
import Router from '~/Navigator/Router';
import {useTranslation} from 'react-i18next';
import {useStyle} from '~/Theme/ThemeHelper';
import {Icon} from '@ui-kitten/components';
import IconType from '~/Styles/IconType';

const Workout: React.FC<DefaultNavigationProps<'Workout'>> = () => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const menuItems: WorkoutType[] = [
    WorkoutType.AMRAP,
    WorkoutType.FORTIME,
    WorkoutType.EMOM,
    WorkoutType.TABATA,
    WorkoutType.COMBINE,
  ];

  const _handlePress = {
    [WorkoutType.AMRAP]: () => Router.CreateAmrapScene(),
    [WorkoutType.EMOM]: () => Router.CreateEmomScene(),
    [WorkoutType.TABATA]: () => Router.CreateTabata(),
    [WorkoutType.FORTIME]: () => Router.CreateForTimeScene(),
    [WorkoutType.COMBINE]: () => Router.CreateCombine(),
  };

  const _renderItem = ({item, index}: {item: WorkoutType; index: number}) => {
    return (
      <Button
        onPress={_handlePress[item]}
        workoutType={item}
        label={getWorkoutLabel(item, t)}
        style={index !== 0 && layoutStyles.marginTopBase}
      />
    );
  };

  return (
    <Container>
      <View
        style={[
          layoutStyles.alignCenter,
          layoutStyles.marginTopBase,
          layoutStyles.fullscreenContainer,
        ]}>
        <Icon name={IconType.Logo} size={60} color={'white'} />
      </View>
      <FlatList
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.horizontalPadding,
          layoutStyles.justifyCenter,
        ]}
        data={menuItems}
        renderItem={_renderItem}
      />
    </Container>
  );
};
export default Workout;
