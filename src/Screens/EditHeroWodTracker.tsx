import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
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
import {HeroWod} from '~/Helpers/TrackerHelper';
import {useTranslation} from 'react-i18next';
import {hideHud, showHud} from '~/Hud/HudHelper';
import Card from '~/Components/Card';
import {WorkoutType} from '~/Helpers/Enums';

const EditHeroWodTracker: React.FC<
  DefaultNavigationProps<'EditHeroWodTracker'>
> = () => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const [heroWodData, setHeroWodData] = useState<HeroWod>({} as HeroWod);
  const editHeroWodData = useRef<HeroWod>({} as HeroWod);

  useEffect(() => {
    showHud();
    getItemFromStorage(StorageKeys.HERO_WOD)
      .then((response) => {
        hideHud();
        if (response.data) {
          const _response = response.data[0];
          setHeroWodData({..._response});
          editHeroWodData.current = _response;
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
          workoutType={WorkoutType.TABATA}
          style={layoutStyles.marginTopBase}>
          <CardHeader
            title={t(LangKeys.heroWods)}
            onPress={() =>
              Router.TrackerDetail({
                title: t(LangKeys.heroWods),
                storageKey: StorageKeys.HERO_WOD,
                workoutType: WorkoutType.FORTIME,
              })
            }
          />
          <Input
            defaultValue={heroWodData.amanda ?? ''}
            inputLabel={t(LangKeys.amanda)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.amanda = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.barbara ?? ''}
            inputLabel={t(LangKeys.barbara)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.barbara = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.chelsea ?? ''}
            inputLabel={t(LangKeys.chelsea)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.chelsea = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.cindy ?? ''}
            inputLabel={t(LangKeys.cindy)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.cindy = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.diane ?? ''}
            inputLabel={t(LangKeys.diane)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.diane = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.elizabeth ?? ''}
            inputLabel={t(LangKeys.elizabeth)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.elizabeth = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.fran ?? ''}
            inputLabel={t(LangKeys.fran)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.fran = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.grace ?? ''}
            inputLabel={t(LangKeys.grace)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.grace = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.isabel ?? ''}
            inputLabel={t(LangKeys.isabel)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.isabel = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.jackie ?? ''}
            inputLabel={t(LangKeys.jackie)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.jackie = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.karen ?? ''}
            inputLabel={t(LangKeys.karen)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.karen = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.kelly ?? ''}
            inputLabel={t(LangKeys.kelly)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.kelly = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.mary ?? ''}
            inputLabel={t(LangKeys.mary)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.mary = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.murph ?? ''}
            inputLabel={t(LangKeys.murph)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.murph = parseFloat(text);
            }}
          />
          <Input
            defaultValue={heroWodData.nancy ?? ''}
            inputLabel={t(LangKeys.nancy)}
            style={layoutStyles.marginTopSmall}
            keyboardType={'decimal-pad'}
            onChangeText={(text) => {
              editHeroWodData.current.nancy = parseFloat(text);
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
                  StorageKeys.HERO_WOD,
                  editHeroWodData.current,
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
export default EditHeroWodTracker;
