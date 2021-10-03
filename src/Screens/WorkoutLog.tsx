import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import _ from 'lodash';
import {Icon, Text} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {secondToTime} from '~/Helpers/TimeHelper';
import Card from '~/Components/Card';
import {getWorkoutKeyLabel, getWorkoutLabel} from '~/Helpers/WorkoutHelper';
import {useTranslation} from 'react-i18next';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {WorkoutType} from '~/Helpers/Enums';

const WorkoutLog: React.FC<DefaultNavigationProps<'WorkoutLog'>> = (props) => {
  const {layoutStyles, themeVariables, componentStyles} = useStyle();
  const {t} = useTranslation();
  const {
    roundRecords,
    workoutType,
    workoutData,
    date,
  } = props.route.params.workoutLog;

  const calculateDiff = (value: number, index: number, topIndex: number) => {
    const beforeDiff = roundRecords![topIndex][index - 1].diff;
    const _diff = value - beforeDiff;

    if (_diff > 0) {
      return <Text appearance="negative">{`${_diff} s`}</Text>;
    } else if (_diff < 0) {
      return <Text appearance="positive">{`${_diff} s`}</Text>;
    } else {
      return <Text appearance="light">{`${_diff} s`}</Text>;
    }
  };

  const renderRecords = () => {
    const count = Object.keys(roundRecords!).length;

    return _.map(Array.apply(null, Array(count)), (_item, index) => {
      return (
        <Card
          key={index}
          style={layoutStyles.marginTopBase}
          workoutType={workoutType}>
          <Text appearance="light" category="h4">{`${
            index + 1
          }. ${getWorkoutLabel(workoutType, t)}`}</Text>
          {_.map(roundRecords![index + 1], (item, i) => {
            return (
              <View
                key={i}
                style={[
                  layoutStyles.spaceBetween,
                  layoutStyles.rowContainer,
                  layoutStyles.marginTopSmall,
                ]}>
                <Text appearance="light">{`${i + 1}.Round`}</Text>
                <Text appearance="light">{secondToTime(item.diff)}</Text>
                {i !== 0 ? (
                  calculateDiff(item.diff, i, index + 1)
                ) : (
                  <Text appearance="light" />
                )}
              </View>
            );
          })}
        </Card>
      );
    });
  };

  const workoutAmrapSummary = () => {
    return (
      <Card style={layoutStyles.marginTopBase} workoutType={workoutType}>
        {_.isArray(workoutData) ? (
          <>
            <Text
              style={componentStyles.centerText}
              category={'h4'}
              appearance="light">{`${workoutData.length}x ${getWorkoutLabel(
              workoutType,
              t,
            )}`}</Text>

            {_.map(workoutData, (item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    layoutStyles.rowContainer,
                    layoutStyles.marginTopSmall,
                    layoutStyles.alignCenter,
                    layoutStyles.spaceBetween,
                  ]}>
                  <Text appearance="light">{index + 1 + '.'}</Text>
                  <View style={layoutStyles.rowContainer}>
                    <Icon
                      name={IconType.Timer}
                      color={themeVariables.eva[ThemeKeys.colorWhite]}
                      size={16}
                      style={{
                        marginRight: themeVariables.spacing.horizontal / 2,
                      }}
                    />
                    <Text appearance="light">{secondToTime(item.minute)}</Text>
                  </View>
                </View>
              );
            })}
            <Text
              style={componentStyles.centerText}
              category={'h4'}
              appearance="light">
              {date}
            </Text>
          </>
        ) : (
          ''
        )}
      </Card>
    );
  };

  const valueControl = (key: string, value: number) => {
    console.log(key);
    if (['minute', 'work', 'every', 'rest', 'workoutRest'].includes(key)) {
      return secondToTime(value);
    }
    return value;
  };

  const renderWorkourSummary = () => {
    return (
      <Card style={layoutStyles.marginTopBase} workoutType={workoutType}>
        <Text
          style={componentStyles.centerText}
          category={'h4'}
          appearance="light">{`${getWorkoutLabel(workoutType, t)}`}</Text>
        {_.map(workoutData, (value, key) => {
          return (
            <View
              key={key}
              style={[
                layoutStyles.rowContainer,
                layoutStyles.marginTopSmall,
                layoutStyles.alignCenter,
                layoutStyles.spaceBetween,
              ]}>
              <Text appearance="light">{getWorkoutKeyLabel(key, t)}</Text>
              <Text appearance="light">{valueControl(key, value)}</Text>
            </View>
          );
        })}
        <Text
          style={componentStyles.centerText}
          category={'h4'}
          appearance="light">
          {date}
        </Text>
      </Card>
    );
  };

  return (
    <Container>
      <ScrollView
        style={[layoutStyles.horizontalPadding, layoutStyles.bottomPadding]}>
        {workoutType === WorkoutType.AMRAP
          ? workoutAmrapSummary()
          : renderWorkourSummary()}
        {roundRecords &&
          Object.keys(roundRecords).length > 0 &&
          renderRecords()}
      </ScrollView>
    </Container>
  );
};
export default WorkoutLog;
