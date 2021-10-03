import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import Card from '~/Components/Card';
import {Text} from '@ui-kitten/components';
import _ from 'lodash';
import {useStyle} from '~/Theme/ThemeHelper';
import {View, FlatList} from 'react-native';
import {WorkoutType} from '~/Helpers/Enums';

const HeroWodDetails: React.FC<
  DefaultNavigationProps<'HeroWodDetails'>
> = () => {
  const {layoutStyles} = useStyle();
  const data: {title: string; details: string[]}[] = [
    {
      title: 'Amanda',
      details: [
        'For time',
        '9 Muscle-ups',
        '9 Snatches (135/95 lb.)',
        '7 Muscle-ups',
        '7 Snatches (135/95 lb.)',
        '5 Muscle-ups',
        '5 Snatches (135/95 lb.)',
      ],
    },
    {
      title: 'Barbara',
      details: [
        '5 Rounds',
        '20 Pull-ups',
        '30 Push-ups',
        '40 Sit-ups',
        '50 Squats',
        'Rest 2 minutes between each round.',
      ],
    },
    {
      title: 'Chelsea',
      details: ['Emom for 30 min', '5 Pull-ups', '10 Push-ups', '15 Squats'],
    },
    {
      title: 'Cindy',
      details: ['20 min AMRAP', '5 Pull-ups', '10 Push-ups', '15 Squats'],
    },
    {
      title: 'Diane',
      details: [
        'For time',
        '21 Deadlift (225/155 lb.)',
        '21 Handstand push-ups',
        '15 Deadlift (225/155 lb.)',
        '15 Handstand push-ups',
        '9 Deadlift (225/155 lb.)',
        '9 Handstand push-ups',
      ],
    },
    {
      title: 'Elizabeth',
      details: [
        'For time',
        '21 Clean (135/95 lb.)',
        '21 Ring dips',
        '15 Clean (135/95 lb.)',
        '15 Ring dips',
        '9 Clean (135/95 lb.)',
        '9 Ring dips',
      ],
    },
    {
      title: 'Fran',
      details: [
        'For time',
        '21 Thruster (95/65 lb.)',
        '21 Pull-ups',
        '15 Thruster (95/65 lb.)',
        '15 Pull-ups',
        '9 Thruster (95/65 lb.)',
        '9 Pull-ups',
      ],
    },
    {
      title: 'Grace',
      details: ['For time', '30 Clean and jerk (135/95 lb.)'],
    },
    {
      title: 'Isabel',
      details: ['For time', '30 Snatch (135/95 lb.)'],
    },
    {
      title: 'Jackie',
      details: [
        'For time',
        '1000 meter row',
        '50 Thruster (45/35 lb.)',
        '30 Pull-ups',
      ],
    },
    {
      title: 'Karen',
      details: ['For time', '150 Wall-ball shots (20/14 lb., 10/9 ft)'],
    },
    {
      title: 'Kelly',
      details: [
        '5 Rounds for time',
        '400 meter run',
        '30 Box jumps (24/20 inch box)',
        '30 Wall-ball shots (20/14 lb.)',
      ],
    },
    {
      title: 'Mary',
      details: [
        '20 min AMRAP',
        '5 Handstand push-ups',
        '10 Pistol squats',
        '15 Pull-ups',
      ],
    },
    {
      title: 'Murph',
      details: [
        'For time',
        '1 mile run (1600 meter)',
        '100 Pull-ups',
        '200 Push-ups',
        '300 Squats',
        '1 mile run (1600 meter)',
      ],
    },
    {
      title: 'Nancy',
      details: [
        '5 Rounds for time',
        '400 meter run',
        '15 Overhead squat (95/65 lb.)',
      ],
    },
  ];

  const renderItem = ({item}) => {
    return (
      <Card style={layoutStyles.marginTopBase} workoutType={WorkoutType.TABATA}>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
          <Text category={'h1'} appearance="light">
            {item.title}
          </Text>
        </View>

        {_.map(item.details, (value, index) => {
          return (
            <Text
              style={index == 0 && layoutStyles.marginTopSmall}
              category={'p1'}
              appearance="light"
              key={index}>
              {value}
            </Text>
          );
        })}
      </Card>
    );
  };

  return (
    <Container>
      <FlatList
        contentContainerStyle={[
          layoutStyles.horizontalPadding,
          layoutStyles.bottomPadding,
        ]}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};
export default HeroWodDetails;
