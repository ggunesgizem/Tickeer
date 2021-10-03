import React, {useContext, useEffect, useRef, useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {
  removeMultiDataFromStorage,
  StorageKeys,
  getItemFromStorage,
} from '~/Helpers/AsyncStorageHelper';
import Card from '~/Components/Card';
import {useStyle} from '~/Theme/ThemeHelper';
import {Icon, Text} from '@ui-kitten/components';
import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import IconType from '~/Styles/IconType';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import IconButton from '~/Components/IconButton';
import {LangKeys} from '~/Locale/LangKeys';
import {useTranslation} from 'react-i18next';
import Router from '~/Navigator/Router';
import {
  BodySize,
  GenderTypes,
  getTrackerLabel,
  HeroWod,
  PrBoard,
} from '~/Helpers/TrackerHelper';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {WorkoutType} from '~/Helpers/Enums';
import SettingsContext, {Metrics} from '~/Context/SettingsContext';

const Tracker: React.FC<DefaultNavigationProps<'Tracker'>> = (props) => {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();

  const bodySizeList = useRef<BodySize[]>([]);
  const heroWodList = useRef<HeroWod[]>([]);
  const prBoardList = useRef<PrBoard[]>([]);
  const [calculatedBMR, setCalculatedBMR] = useState<number>(0);
  const [calculatedBodyFat, setCalculatedBodyFat] = useState<number>(0);
  const [bodySizeData, setBodySizeData] = useState<BodySize>({} as BodySize);
  const [heroWodData, setHeroWodData] = useState<HeroWod>({} as HeroWod);
  const [prBoardData, setPrBoardData] = useState<PrBoard>({} as PrBoard);
  const {selectedMetrics} = useContext(SettingsContext);
  const weightMetric =
    selectedMetrics === Metrics.USA ? t(LangKeys.lbs) : t(LangKeys.kg);

  const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      alignItems: 'center',
    },
    mr8: {
      marginRight: 8,
    },
    ml8: {
      marginLeft: 8,
    },
    pb0: {
      paddingBottom: 0,
    },
    cardTitleContainer: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: themeVariables.eva[ThemeKeys.colorWhite],
      paddingBottom: 4,
      alignItems: 'center',
    },
  });

  const handleBodyFatPress = () => {
    const _isFemale = isFemale();
    let control: boolean = false;
    if (_isFemale) {
      control = !(
        bodySizeData.waist &&
        bodySizeData.neck &&
        bodySizeData.height &&
        bodySizeData.hip
      );
    } else {
      control = !(
        bodySizeData.waist &&
        bodySizeData.neck &&
        bodySizeData.height
      );
    }
    if (control) {
      Alert.alert(
        t(LangKeys.info),
        _isFemale
          ? t(LangKeys.bodyFatFemaleCalculateWarning)
          : t(LangKeys.bodyFatMaleCalculateWarning),
        [{text: t(LangKeys.ok)}],
      );
    }
  };

  const calculateMaleBodyFat = () => {
    if (bodySizeData.waist && bodySizeData.neck && bodySizeData.height) {
      let log10WaistNeck = Math.log10(bodySizeData.waist - bodySizeData.neck);
      log10WaistNeck = 0.19077 * log10WaistNeck;
      let log10Height = Math.log10(bodySizeData.height);
      log10Height = 0.15456 * log10Height;

      const top = 495;
      const bottom = 1.0324 - log10WaistNeck + log10Height;
      const result = top / bottom - 450;
      setCalculatedBodyFat(Number(result.toFixed(2)));
    } else {
      setCalculatedBodyFat(0);
    }
  };

  const handleBMRPress = () => {
    const _isFemale = isFemale();
    if (!(calculatedBodyFat && bodySizeData.weight)) {
      Alert.alert(
        t(LangKeys.info),
        _isFemale
          ? t(LangKeys.bmrMaleCalculateWarning)
          : t(LangKeys.bmrFemaleCalculateWarning),
        [{text: t(LangKeys.ok)}],
      );
    }
  };

  const calculateBMR = () => {
    if (bodySizeData.weight && calculatedBodyFat) {
      const right = 100 - calculatedBodyFat;
      const inside = bodySizeData.weight * right;
      const result = 21.6 * (inside / 100) + 370;
      setCalculatedBMR(Math.floor(result));
    } else {
      setCalculatedBMR(0);
    }
  };

  const calculateFemaleBodyFat = () => {
    if (
      bodySizeData.waist &&
      bodySizeData.neck &&
      bodySizeData.height &&
      bodySizeData.hip
    ) {
      let log10WaistNeckHip = Math.log10(
        bodySizeData.waist + bodySizeData.hip - bodySizeData.neck,
      );
      log10WaistNeckHip = 0.35004 * log10WaistNeckHip;
      let log10Height = Math.log10(bodySizeData.height);
      log10Height = 0.221 * log10Height;

      const top = 495;
      const bottom = 1.29579 - log10WaistNeckHip + log10Height;
      const result = top / bottom - 450;
      setCalculatedBodyFat(Number(result.toFixed(2)));
    }
  };

  useEffect(() => {
    isFemale() ? calculateFemaleBodyFat() : calculateMaleBodyFat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodySizeData]);

  useEffect(() => {
    calculateBMR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatedBodyFat]);

  const getData = () => {
    showHud();
    Promise.all([
      getItemFromStorage(StorageKeys.BODY_SIZES),
      getItemFromStorage(StorageKeys.HERO_WOD),
      getItemFromStorage(StorageKeys.PR_BOARD),
    ])
      .then(([bodySizeResponse, heroWodResponse, prBoardResponse]) => {
        hideHud();
        if (bodySizeResponse.data) {
          const _response = bodySizeResponse.data[0];
          bodySizeList.current = bodySizeResponse.data;
          setBodySizeData({..._response});
        }
        if (heroWodResponse.data) {
          const _response = heroWodResponse.data[0];
          heroWodList.current = heroWodResponse.data;
          setHeroWodData({..._response});
        }
        if (prBoardResponse.data) {
          const _response = prBoardResponse.data[0];
          prBoardList.current = prBoardResponse.data;
          setPrBoardData({..._response});
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (props?.route?.params?.shouldRefresh) {
      getData();
    }
  }, [props]);

  const handleResetPress = () => {
    Alert.alert(t(LangKeys.warning), t(LangKeys.reset_tracker_alert), [
      {
        text: t(LangKeys.ok),
        onPress: () =>
          removeMultiDataFromStorage([
            StorageKeys.BODY_SIZES,
            StorageKeys.HERO_WOD,
            StorageKeys.PR_BOARD,
          ]).finally(() => {
            Router.Pop();
          }),
      },
      {
        text: t(LangKeys.cancel),
      },
    ]);
  };

  const getIcon = (workoutData: any[], key: string) => {
    const lastData = workoutData[0][key] ?? 0;
    const beforeData = workoutData[1][key] ?? 0;

    let icon;
    let color;
    if (lastData > beforeData) {
      icon = IconType.Up;
      color = themeVariables.eva[ThemeKeys.colorGreen];
    } else if (lastData < beforeData) {
      icon = IconType.Down;
      color = themeVariables.eva[ThemeKeys.colorPrimary];
    }

    if (icon) {
      return <Icon name={icon} style={styles.ml8} color={color} />;
    }
  };

  const getTextWithIcon = (
    key: string,
    value: number | string,
    workoutList: any[],
  ) => {
    return (
      <View
        style={[
          layoutStyles.rowContainer,
          layoutStyles.marginTopSmall,
          layoutStyles.alignCenter,
        ]}>
        <Text category="p1" appearance="light">{`${getTrackerLabel(
          key,
          t,
          selectedMetrics,
        )} : ${value ?? '-'}`}</Text>
        {workoutList.length > 1 && getIcon(workoutList, key)}
      </View>
    );
  };

  const isFemale = () => {
    return bodySizeData.gender === GenderTypes.FEMALE;
  };

  return (
    <Container style={[layoutStyles.horizontalPadding, styles.pb0]}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.justifyCenter,
        ]}>
        <Card
          style={layoutStyles.alignCenter}
          workoutType={WorkoutType.AMRAP}
          onPress={Router.EditBodySizeTracker}>
          <View style={styles.cardTitleContainer}>
            <Text category="p2" appearance="light">
              {t(LangKeys.bodySizes)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View
              style={[
                layoutStyles.alignCenter,
                layoutStyles.fullscreenContainer,
              ]}>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.gender)} : ${
                isFemale() ? t(LangKeys.female) : t(LangKeys.male)
              }`}</Text>
              {getTextWithIcon(
                'height',
                bodySizeData.height ?? '-',
                bodySizeList.current,
              )}
              {getTextWithIcon(
                'weight',
                bodySizeData.weight ?? '-',
                bodySizeList.current,
              )}
              {getTextWithIcon(
                'arm',
                bodySizeData.arm ?? '-',
                bodySizeList.current,
              )}
            </View>
            <View
              style={[
                layoutStyles.alignCenter,
                layoutStyles.fullscreenContainer,
              ]}>
              {getTextWithIcon(
                'hip',
                bodySizeData.hip ?? '-',
                bodySizeList.current,
              )}
              {getTextWithIcon(
                'leg',
                bodySizeData.leg ?? '-',
                bodySizeList.current,
              )}
              {getTextWithIcon(
                'neck',
                bodySizeData.neck ?? '-',
                bodySizeList.current,
              )}
              {getTextWithIcon(
                'waist',
                bodySizeData.waist ?? '-',
                bodySizeList.current,
              )}
            </View>
          </View>
        </Card>

        <View
          style={[
            layoutStyles.rowContainer,
            layoutStyles.spaceBetween,
            layoutStyles.marginTopBase,
          ]}>
          <Card
            onPress={handleBodyFatPress}
            style={[styles.cardContainer, styles.mr8]}
            workoutType={WorkoutType.FORTIME}>
            <View style={styles.cardTitleContainer}>
              <Text category="p2" appearance="light">
                {t(LangKeys.bodyFat)}
              </Text>
            </View>
            <Text
              style={layoutStyles.marginTopBase}
              category="hero"
              appearance="light">{`% ${
              calculatedBodyFat !== 0 ? calculatedBodyFat : '-'
            }`}</Text>
          </Card>
          <Card
            style={styles.cardContainer}
            workoutType={WorkoutType.EMOM}
            onPress={handleBMRPress}>
            <View style={styles.cardTitleContainer}>
              <Text category="p2" appearance="light">
                {t(LangKeys.bmr)}
              </Text>
              <Text category="c1" appearance="light">
                {t(LangKeys.bmrLong)}
              </Text>
            </View>
            <Text
              style={layoutStyles.marginTopBase}
              category="hero"
              appearance="light">{`${calculatedBMR ?? '-'} kcal`}</Text>
          </Card>
        </View>

        <View
          style={[
            layoutStyles.rowContainer,
            layoutStyles.spaceBetween,
            layoutStyles.marginTopBase,
          ]}>
          <Card
            onPress={Router.EditHeroWodTracker}
            style={[styles.cardContainer, styles.mr8]}
            workoutType={WorkoutType.TABATA}>
            <View style={styles.cardTitleContainer}>
              <Text category="p2" appearance="light">
                {t(LangKeys.heroWods)}
              </Text>
            </View>
            <Text
              style={layoutStyles.marginTopBase}
              category="p1"
              appearance="light">{`${t(LangKeys.amanda)} : ${
              heroWodData.amanda ?? '-'
            }`}</Text>
            <Text
              style={layoutStyles.marginTopSmall}
              category="p1"
              appearance="light">{`${t(LangKeys.barbara)} : ${
              heroWodData.barbara ?? '-'
            }`}</Text>
            <Text
              style={layoutStyles.marginTopSmall}
              category="p1"
              appearance="light">{`${t(LangKeys.chelsea)} : ${
              heroWodData.chelsea ?? '-'
            }`}</Text>
            <Text
              style={layoutStyles.marginTopSmall}
              category="p1"
              appearance="light">{`${t(LangKeys.cindy)} : ${
              heroWodData.cindy ?? '-'
            }`}</Text>
            <Text
              style={layoutStyles.marginTopSmall}
              category="p1"
              appearance="light">{`${t(LangKeys.diane)} : ${
              heroWodData.diane ?? '-'
            }`}</Text>
            <Text
              style={layoutStyles.marginTopSmall}
              category="p1"
              appearance="light">{`${t(LangKeys.elizabeth)} : ${
              heroWodData.elizabeth ?? '-'
            }`}</Text>
          </Card>
          <Card
            onPress={Router.EditPrBoardTracker}
            style={styles.cardContainer}
            workoutType={WorkoutType.COMBINE}>
            <View style={styles.cardTitleContainer}>
              <Text category="p2" appearance="light">
                {t(LangKeys.prBoards)}
              </Text>
            </View>
            <View
              style={[
                layoutStyles.fullscreenContainer,
                layoutStyles.alignCenter,
                layoutStyles.justifyCenter,
              ]}>
              <Text
                style={layoutStyles.marginTopBase}
                category="p1"
                appearance="light">{`${t(LangKeys.powerClean, {
                metric: weightMetric,
              })} : ${prBoardData.powerClean ?? '-'}`}</Text>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.squatClean, {
                metric: weightMetric,
              })} : ${prBoardData.squatClean ?? '-'}`}</Text>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.muscleClean, {
                metric: weightMetric,
              })} : ${prBoardData.muscleClean ?? '-'}`}</Text>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.powerSnatch, {
                metric: weightMetric,
              })} : ${prBoardData.powerSnatch ?? '-'}`}</Text>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.squatSnatch, {
                metric: weightMetric,
              })} : ${prBoardData.squatSnatch ?? '-'}`}</Text>
              <Text
                style={layoutStyles.marginTopSmall}
                category="p1"
                appearance="light">{`${t(LangKeys.muscleSnatch, {
                metric: weightMetric,
              })} : ${prBoardData.muscleSnatch ?? '-'}`}</Text>
            </View>
          </Card>
        </View>
        <IconButton
          style={[layoutStyles.marginTopBase, layoutStyles.justifyCenter]}
          icon={IconType.Trash}
          onPress={handleResetPress}
          label={t(LangKeys.reset_tracker)}
          color={themeVariables.eva[ThemeKeys.colorWhite]}
        />
      </ScrollView>
    </Container>
  );
};
export default Tracker;
