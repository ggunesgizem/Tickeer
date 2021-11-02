import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import CardHeader from '~/Components/CardHeader';
import {useTranslation} from 'react-i18next';
import {useStyle} from '~/Theme/ThemeHelper';
import {
  StorageKeys,
  setItemToStorage,
  getItemFromStorage,
} from '~/Helpers/AsyncStorageHelper';
import {LangKeys} from '~/Locale/LangKeys';
import Router from '~/Navigator/Router';
import IconButton from '~/Components/IconButton';
import IconType from '~/Styles/IconType';
import {CalorieCounter} from '~/Helpers/TrackerHelper';
import {hideHud, showHud} from '~/Hud/HudHelper';
import Input from '~/Components/Input';
import Card from '~/Components/Card';
import {WorkoutType} from '~/Helpers/Enums';

const EditCalorieCounterTracker: React.FC<
  DefaultNavigationProps<'EditCalorieCounterTracker'>
> = () => {
  const {layoutStyles} = useStyle();
  const {t} = useTranslation();
  const editCalorieCounterData = useRef<CalorieCounter>({} as CalorieCounter);
  const [calorieCounterData, setCalorieCounterData] = useState<CalorieCounter>(
    {} as CalorieCounter,
  );
  useEffect(() => {
    showHud();
    getItemFromStorage(StorageKeys.CALORIE_COUNTER)
      .then((response) => {
        hideHud();
        if (response.data) {
          const _response = response.data[0];
          setCalorieCounterData({..._response});
          editCalorieCounterData.current = _response;
        }
      })
      .catch(console.log);
  }, []);
  return (
    <Container style={[layoutStyles.horizontalPadding]}>
      <Card workoutType={WorkoutType.EMOM} style={layoutStyles.marginTopBase}>
        <CardHeader
          title={t(LangKeys.calorieCounter)}
          onPress={() =>
            Router.TrackerDetail({
              title: t(LangKeys.calorieCounter),
              storageKey: StorageKeys.CALORIE_COUNTER,
              workoutType: WorkoutType.EMOM,
            })
          }
        />
        <Input
          defaultValue={calorieCounterData.calorie ?? ''}
          inputLabel="kcal"
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editCalorieCounterData.current.calorie = parseFloat(text ?? 0, 10);
          }}
        />
        <View
          style={[
            layoutStyles.alignCenter,
            layoutStyles.justifyCenter,
            layoutStyles.marginTopBase,
          ]}>
          <IconButton
            onPress={() => {
              showHud();
              setItemToStorage(
                StorageKeys.CALORIE_COUNTER,
                editCalorieCounterData.current,
              ).finally(() => {
                hideHud();
                Router.Tracker({
                  shouldRefresh: true,
                });
              });
            }}
            icon={IconType.Save}
            label={t(LangKeys.save)}
            size={16}
          />
        </View>
      </Card>
    </Container>
  );
};
export default EditCalorieCounterTracker;
