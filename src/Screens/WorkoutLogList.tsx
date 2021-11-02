import React, { useEffect, useState } from 'react';
import {Alert, FlatList, View } from 'react-native';
import { DefaultNavigationProps } from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import { getWorkoutLog } from '~/Helpers/AsyncStorageHelper';
import { hideHud, showHud } from '~/Hud/HudHelper';
import { getWorkoutLabel, WorkoutLogType } from '~/Helpers/WorkoutHelper';
import Card from '~/Components/Card';
import IconType from '~/Styles/IconType';
import IconButton from '~/Components/IconButton';
import { Text } from '@ui-kitten/components/ui';
import { useStyle } from '~/Theme/ThemeHelper';
import { ThemeKeys } from '~/Theme/ThemeKeys';
import { useTranslation } from 'react-i18next';
import Router from '~/Navigator/Router';
import { LangKeys } from '~/Locale/LangKeys';
import {
  removeMultiDataFromStorage,
  StorageKeys,
  getItemFromStorage,
} from '~/Helpers/AsyncStorageHelper';

const WorkoutLogList: React.FC<
  DefaultNavigationProps<'WorkoutLogList'>
> = () => {
  const [logList, setLogList] = useState<WorkoutLogType[]>();
  const { t } = useTranslation();
  const { layoutStyles, themeVariables } = useStyle();
  const _renderItem = ({ item }: { item: WorkoutLogType; index: number }) => {
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

  const handleResetPress = () => {
    Alert.alert(t(LangKeys.warning), t(LangKeys.reset_worklog_alert), [
      {
        text: t(LangKeys.ok),
        onPress: () =>
          removeMultiDataFromStorage([
            StorageKeys.WORKOUT_LOG,
          ]).finally(() => {
             Router.Pop();
          }),
      },
      {
        text: t(LangKeys.cancel),
      },
    ]);
  };

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
      <IconButton
        style={[layoutStyles.marginTopBase, layoutStyles.justifyCenter]}
        icon={IconType.Trash}
         onPress={handleResetPress}
        label={t(LangKeys.reset_worklog)}
        color={themeVariables.eva[ThemeKeys.colorWhite]}
      />
    </Container>
  );
};
export default WorkoutLogList;
