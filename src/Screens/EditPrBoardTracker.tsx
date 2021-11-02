import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import CardHeader from '~/Components/CardHeader';
import {useStyle} from '~/Theme/ThemeHelper';
import Router from '~/Navigator/Router';
import {
  StorageKeys,
  setItemToStorage,
  getItemFromStorage,
} from '~/Helpers/AsyncStorageHelper';
import {LangKeys} from '~/Locale/LangKeys';
import Input from '~/Components/Input';
import IconButton from '~/Components/IconButton';
import IconType from '~/Styles/IconType';
import {PrBoard} from '~/Helpers/TrackerHelper';
import {useTranslation} from 'react-i18next';
import {hideHud, showHud} from '~/Hud/HudHelper';
import Card from '~/Components/Card';
import {WorkoutType} from '~/Helpers/Enums';
import SettingsContext, {Metrics} from '~/Context/SettingsContext';

const EditPrBoardTracker: React.FC<
  DefaultNavigationProps<'EditPrBoardTracker'>
> = () => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const [prBoardData, setPrBoardData] = useState<PrBoard>({} as PrBoard);
  const editPrBoardData = useRef<PrBoard>({} as PrBoard);
  const {selectedMetrics} = useContext(SettingsContext);
  const weightMetric =
    selectedMetrics === Metrics.USA ? t(LangKeys.lbs) : t(LangKeys.kg);

  useEffect(() => {
    showHud();
    getItemFromStorage(StorageKeys.PR_BOARD)
      .then((response) => {
        hideHud();
        if (response.data) {
          const _response = response.data[0];
          setPrBoardData({..._response});
          editPrBoardData.current = _response;
        }
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          layoutStyles.horizontalPadding,
          layoutStyles.bottomPadding,
        ]}>
        <Card
          workoutType={WorkoutType.COMBINE}
          style={layoutStyles.marginTopBase}>
          <CardHeader
            title={t(LangKeys.prBoards)}
            onPress={() =>
              Router.TrackerDetail({
                title: t(LangKeys.prBoards),
                storageKey: StorageKeys.PR_BOARD,
                workoutType: WorkoutType.COMBINE,
              })
            }
          />
          <Input
            defaultValue={prBoardData.powerClean ?? ''}
            inputLabel={t(LangKeys.powerClean, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.powerClean = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.squatClean ?? ''}
            inputLabel={t(LangKeys.squatClean, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.squatClean = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.muscleClean ?? ''}
            inputLabel={t(LangKeys.muscleClean, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.muscleClean = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.powerSnatch ?? ''}
            inputLabel={t(LangKeys.powerSnatch, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.powerSnatch = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.squatSnatch ?? ''}
            inputLabel={t(LangKeys.squatSnatch, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.squatSnatch = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.muscleSnatch ?? ''}
            inputLabel={t(LangKeys.muscleSnatch, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.muscleSnatch = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.backSquat ?? ''}
            inputLabel={t(LangKeys.backSquat, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.backSquat = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.frontSquat ?? ''}
            inputLabel={t(LangKeys.frontSquat, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.frontSquat = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.overheadSquat ?? ''}
            inputLabel={t(LangKeys.overheadSquat, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.overheadSquat = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.cleanJerk ?? ''}
            inputLabel={t(LangKeys.cleanJerk, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.cleanJerk = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.strictPress ?? ''}
            inputLabel={t(LangKeys.strictPress, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.strictPress = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.pushPress ?? ''}
            inputLabel={t(LangKeys.pushPress, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.pushPress = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.pushJerk ?? ''}
            inputLabel={t(LangKeys.pushJerk, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.pushJerk = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.splitJerk ?? ''}
            inputLabel={t(LangKeys.splitJerk, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.splitJerk = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.deadLift ?? ''}
            inputLabel={t(LangKeys.deadLift, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.deadLift = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.sumoDeadLift ?? ''}
            inputLabel={t(LangKeys.sumoDeadLift, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.sumoDeadLift = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.benchPress ?? ''}
            inputLabel={t(LangKeys.benchPress, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.benchPress = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.cluster ?? ''}
            inputLabel={t(LangKeys.cluster, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.cluster = parseFloat(text);
            }}
          />
          <Input
            defaultValue={prBoardData.thruster ?? ''}
            inputLabel={t(LangKeys.thruster, {metric: weightMetric})}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editPrBoardData.current.thruster = parseFloat(text);
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
                  StorageKeys.PR_BOARD,
                  editPrBoardData.current,
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
      </ScrollView>
    </Container>
  );
};
export default EditPrBoardTracker;
