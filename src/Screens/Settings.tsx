import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import {Text} from '@ui-kitten/components/ui';
import {Image} from 'react-native';
import {LangKeys} from '~/Locale/LangKeys';
import {changeLanguage} from '~/Utils/i18n';
import {useTranslation} from 'react-i18next';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import Picker from '~/Components/Picker';
import {startTimerData} from '~/Helpers/PickerData';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import {secondToTime} from '~/Helpers/TimeHelper';
import {
  getCountdownTimePreference,
  getSoundPreference,
  setCountdownTimePreference,
  setMetricPreference,
  setSoundPreferenceSettings,
} from '~/Helpers/AsyncStorageHelper';
import {hideHud, showHud} from '~/Hud/HudHelper';
import Router from '~/Navigator/Router';
import Checkbox from '~/Components/Checkbox';
import SettingsContext, {Metrics} from '~/Context/SettingsContext';

const Settings: React.FC<DefaultNavigationProps<'Settings'>> = () => {
  const {themeVariables, layoutStyles} = useStyle();
  const {t} = useTranslation();

  const timePickerData = startTimerData();
  const [selectedTime, setSelectedTime] = useState<number>(10);
  const [soundPreference, setSoundPreference] = useState<boolean>(false);
  const {selectedMetrics, setSelectedMetrics} = useContext(SettingsContext);

  const styles = StyleSheet.create({
    doubleRow: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: themeVariables.eva[ThemeKeys.colorWhite],
      height: 65,
      width: '100%',
    },
    image: {
      height: 30,
      width: 35,
    },
    withoutRow: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 81,
    },
  });

  const handleSoundPreference = () => {
    setSoundPreferenceSettings(!soundPreference);
    setSoundPreference(!soundPreference);
  };

  const handleCountTimePreference = (selectedValue: number) => {
    setCountdownTimePreference(selectedValue);
    setSelectedTime(selectedValue);
  };

  useEffect(() => {
    showHud();
    Promise.all([getSoundPreference(), getCountdownTimePreference()])
      .then(([soundResponse, countTimeResponse]) => {
        countTimeResponse && setSelectedTime(countTimeResponse);
        setSoundPreference(soundResponse);
      })
      .finally(hideHud);
  }, []);

  const handleMetricChange = (metric: Metrics) => {
    if (metric !== selectedMetrics) {
      setMetricPreference(metric);
      setSelectedMetrics(metric);
    }
  };

  return (
    <Container>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.doubleRow}
        onPress={() => changeLanguage()}>
        <Text appearance="light">{t(LangKeys.language)}</Text>
        <Image source={t(LangKeys.currentLanguage)} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.doubleRow}
        onPress={handleSoundPreference}>
        <Text appearance="light">{t(LangKeys.sound)}</Text>
        <Text appearance="light">
          {soundPreference ? t(LangKeys.enabled) : t(LangKeys.disabled)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.doubleRow}
        onPress={Router.ChangeBackground}>
        <Text appearance="light">{t(LangKeys.changeBackground)}</Text>
      </TouchableOpacity>
      <View style={styles.doubleRow}>
        <Text appearance="light">{t(LangKeys.countdownTime)}</Text>
        <Picker
          isLeftLabel
          label=""
          color={getWorkoutColor(WorkoutType.REST, themeVariables)}
          selectedLabel={secondToTime(selectedTime)}
          selected={selectedTime}
          onSelectedChange={handleCountTimePreference}
          data={timePickerData}
        />
      </View>
      {/* Metric Settings */}
      {/* <View style={[styles.doubleRow, styles.withoutRow]}>
        <Text style={layoutStyles.marginTopSmall} appearance="light">
          {t(LangKeys.metrics)}
        </Text>
        <View style={[layoutStyles.rowContainer, layoutStyles.marginTopBase]}>
          <Checkbox
            onCheckedChange={() => handleMetricChange(Metrics.EUROPE)}
            checked={selectedMetrics !== Metrics.USA}
            workoutType={WorkoutType.COMBINE}
            label={`${t(LangKeys.kg)} - ${t(LangKeys.cm)}`}
          />
          <Checkbox
            onCheckedChange={() => handleMetricChange(Metrics.USA)}
            checked={selectedMetrics === Metrics.USA}
            containerStyle={{marginLeft: 16}}
            workoutType={WorkoutType.COMBINE}
            label={`${t(LangKeys.lbs)} - ${t(LangKeys.inch)}`}
          />
        </View>
      </View> */}
    </Container>
  );
};
export default Settings;
