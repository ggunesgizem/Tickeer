import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {getWorkoutLog} from '~/Helpers/AsyncStorageHelper';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {getWorkoutLabel, WorkoutLogType} from '~/Helpers/WorkoutHelper';
import Card from '~/Components/Card';
import {Text} from '@ui-kitten/components/ui';
import {useStyle} from '~/Theme/ThemeHelper';
import {useTranslation} from 'react-i18next';
import Router from '~/Navigator/Router';
import {LangKeys} from '~/Locale/LangKeys';

const WorkoutLogList: React.FC<
  DefaultNavigationProps<'WorkoutLogList'>
> = () => {
  const [logList, setLogList] = useState<WorkoutLogType[]>();
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const _renderItem = ({item}: {item: WorkoutLogType; index: number}) => {
    return (
      <Card
        style={layoutStyles.marginTopBase}
        workoutType={item.workoutType}
        onPress={() => {
          Router.WorkoutLog({
            workoutLog: item,
          });
        }}>
        <View style={[layoutStyles.rowContainer, layoutStyles.spaceBetween]}>
          <Text appearance="light">{getWorkoutLabel(item.workoutType, t)}</Text>
          <Text appearance="light">{`${item.date}`}</Text>
        </View>
      </Card>
    );
  };

  useEffect(() => {
    showHud();
    getWorkoutLog()
      .then((response) => {
        if (response.data) {
          setLogList(response.data);
        } else {
          setLogList([]);
        }
      })
      .finally(hideHud);
  }, []);
  return (
    <Container>
      <FlatList
        contentContainerStyle={[
          layoutStyles.horizontalPadding,
          layoutStyles.bottomPadding,
        ]}
        keyExtractor={(item, index) => index.toString()}
        data={logList}
        renderItem={_renderItem}
        ListEmptyComponent={() => (
          <View
            style={[
              layoutStyles.alignCenter,
              layoutStyles.alignCenter,
              layoutStyles.marginTopBase,
            ]}>
            <Text appearance="light" category="p2">
              {t(LangKeys.notFound)}
            </Text>
          </View>
        )}
      />
    </Container>
  );
};
export default WorkoutLogList;
