import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {Text} from '@ui-kitten/components';
import {getItemFromStorage} from '~/Helpers/AsyncStorageHelper';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {
  GenderTypes,
  getTrackerKeys,
  getTrackerLabel,
} from '~/Helpers/TrackerHelper';
import Card from '~/Components/Card';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {LangKeys} from '~/Locale/LangKeys';
import SettingsContext from '~/Context/SettingsContext';

const TrackerDetail: React.FC<DefaultNavigationProps<'TrackerDetail'>> = (
  props,
) => {
  const [trackerData, setTrackerData] = useState<any>([]);
  const {t} = useTranslation();
  const {layoutStyles, themeVariables} = useStyle();
  const {selectedMetrics} = useContext(SettingsContext);
  useEffect(() => {
    showHud();
    getItemFromStorage(props.route.params.storageKey).then((response) => {
      setTrackerData(response.data ?? []);
      hideHud();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: themeVariables.eva[ThemeKeys.colorBlackTransparent500],
      padding: themeVariables.spacing.horizontal,
      borderRadius: 10,
      marginTop: themeVariables.spacing.horizontal / 2,
    },
  });

  const _renderItem = ({item, index}) => {
    const keys = getTrackerKeys(props.route.params.storageKey);
    return (
      <Card
        workoutType={props.route.params.workoutType}
        style={[
          layoutStyles.marginTopBase,
          {
            backgroundColor:
              themeVariables.eva[ThemeKeys.colorWhiteTransparent],
          },
        ]}
        key={index}>
        <Text category="h4" appearance="light">
          {item.date}
        </Text>
        <View style={styles.card}>
          {_.map(keys, (value, subIndex) => {
            return (
              <View
                style={[layoutStyles.rowContainer, layoutStyles.spaceBetween]}
                key={'sub' + subIndex}>
                <Text appearance="light">
                  {getTrackerLabel(value, t, selectedMetrics)}
                </Text>
                {value === 'gender' ? (
                  <Text appearance="light">{`${
                    GenderTypes.FEMALE === item[value]
                      ? t(LangKeys.female)
                      : t(LangKeys.male)
                  }`}</Text>
                ) : (
                  <Text appearance="light">{`${item[value] ?? '-'}`}</Text>
                )}
              </View>
            );
          })}
        </View>
      </Card>
    );
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <FlatList
        contentContainerStyle={[
          layoutStyles.horizontalPadding,
          layoutStyles.bottomPadding,
        ]}
        keyExtractor={(_item, index) => index.toString()}
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
        data={trackerData}
        renderItem={_renderItem}
      />
    </Container>
  );
};
export default TrackerDetail;
