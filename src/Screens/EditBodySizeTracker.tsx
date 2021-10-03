import React, {useContext, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
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
import {BodySize, GenderTypes} from '~/Helpers/TrackerHelper';
import {useTranslation} from 'react-i18next';
import {hideHud, showHud} from '~/Hud/HudHelper';
import Card from '~/Components/Card';
import {WorkoutType} from '~/Helpers/Enums';
import Checkbox from '~/Components/Checkbox';
import SettingsContext, {Metrics} from '~/Context/SettingsContext';

const EditBodySizeTracker: React.FC<
  DefaultNavigationProps<'EditBodySizeTracker'>
> = () => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const [bodySizeData, setBodySizeData] = useState<BodySize>({} as BodySize);
  const editBodySizeData = useRef<BodySize>({} as BodySize);
  const [selectedGender, setSeletedGender] = useState<GenderTypes>(
    GenderTypes.MALE,
  );

  const {selectedMetrics} = useContext(SettingsContext);

  const weightMetric =
    selectedMetrics === Metrics.USA ? t(LangKeys.lbs) : t(LangKeys.kg);
  const heightMetric =
    selectedMetrics === Metrics.USA ? t(LangKeys.inch) : t(LangKeys.cm);

  useEffect(() => {
    editBodySizeData.current.gender = selectedGender ?? GenderTypes.MALE;
  }, [selectedGender]);

  useEffect(() => {
    showHud();
    getItemFromStorage(StorageKeys.BODY_SIZES)
      .then((response) => {
        hideHud();
        if (response.data) {
          const _response = response.data[0];
          setBodySizeData({..._response});
          editBodySizeData.current = _response;
          setSeletedGender(_response.gender ?? GenderTypes.MALE);
        }
      })
      .catch(console.log);
  }, []);

  return (
    <Container style={[layoutStyles.horizontalPadding]}>
      <Card workoutType={WorkoutType.AMRAP} style={layoutStyles.marginTopBase}>
        <CardHeader
          title={t(LangKeys.bodySizes)}
          onPress={() =>
            Router.TrackerDetail({
              title: t(LangKeys.bodySizes),
              storageKey: StorageKeys.BODY_SIZES,
              workoutType: WorkoutType.AMRAP,
            })
          }
        />
        <View style={[layoutStyles.rowContainer, layoutStyles.marginTopSmall]}>
          <Checkbox
            label={t(LangKeys.male)}
            onCheckedChange={() => setSeletedGender(GenderTypes.MALE)}
            checked={selectedGender !== GenderTypes.FEMALE}
            workoutType={WorkoutType.AMRAP}
          />
          <Checkbox
            containerStyle={{marginLeft: 16}}
            onCheckedChange={() => setSeletedGender(GenderTypes.FEMALE)}
            checked={selectedGender === GenderTypes.FEMALE}
            label={t(LangKeys.female)}
            workoutType={WorkoutType.AMRAP}
          />
        </View>
        <Input
          defaultValue={bodySizeData.height ?? ''}
          inputLabel={t(LangKeys.height, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.height = parseFloat(text);
          }}
        />
        <Input
          defaultValue={bodySizeData.weight ?? ''}
          inputLabel={t(LangKeys.weight, {metric: weightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.weight = parseFloat(text);
          }}
        />
        <Input
          defaultValue={bodySizeData.arm ?? ''}
          inputLabel={t(LangKeys.arm, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.arm = parseFloat(text);
          }}
        />
        <Input
          defaultValue={bodySizeData.leg ?? ''}
          inputLabel={t(LangKeys.leg, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.leg = parseFloat(text);
          }}
        />
        <Input
          defaultValue={bodySizeData.neck ?? ''}
          inputLabel={t(LangKeys.neck, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.neck = parseInt(text ?? 0, 10);
          }}
        />
        <Input
          defaultValue={bodySizeData.waist ?? ''}
          inputLabel={t(LangKeys.waist, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'decimal-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.waist = parseInt(text ?? 0, 10);
          }}
        />
        <Input
          defaultValue={bodySizeData.hip ?? ''}
          inputLabel={t(LangKeys.hip, {metric: heightMetric})}
          style={layoutStyles.marginTopSmall}
          keyboardType={'number-pad'}
          onChangeText={(text) => {
            editBodySizeData.current.hip = parseInt(text ?? 0, 10);
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
                StorageKeys.BODY_SIZES,
                editBodySizeData.current,
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
export default EditBodySizeTracker;
