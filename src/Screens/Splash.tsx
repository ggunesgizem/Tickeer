import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {Icon} from '@ui-kitten/components';
import _ from 'lodash';
import moment from 'moment';
import React, {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import NavigatorContext from '~/Context/NavigatorContext';
import SettingsContext, {Metrics} from '~/Context/SettingsContext';
import {
  getBackgroundPreference,
  getLanguage,
  getMetricPreference,
} from '~/Helpers/AsyncStorageHelper';
import {createReminder, getReminderList} from '~/Helpers/ReminderHelper';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {changeLanguage} from '~/Utils/i18n';

const Splash: React.FC = () => {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const {setActiveStack} = useContext(NavigatorContext);
  const {setActiveBackgroundIndex, setSelectedMetrics} = useContext(
    SettingsContext,
  );
  useEffect(() => {
    init().then(() => {
      try {
        getReminderList().then(({mealReminders, waterReminders}) => {
          _.each(mealReminders, (item) => {
            console.log(item[0]);

            if (_.keys(item).length < 4) {
              const req = {
                message: item[0].message ?? '',
                date: moment(_.last(item).date).add(1, 'days').toDate(),
                detail: item[0].data?.detail ?? '',
                type: item[0].data?.type,
                staticGuid: item[0].data?.guid ?? '',
              };
              createReminder(req);
            }
          });

          _.each(waterReminders, (item) => {
            if (_.keys(item).length < 4) {
              const req = {
                message: item[0].message ?? '',
                date: moment(_.last(item).date).add(1, 'days').toDate(),
                detail: item[0].data?.detail ?? '',
                type: item[0].data?.type,
                staticGuid: item[0].data?.guid ?? '',
              };
              createReminder(req);
            }
          });
        });

        getBackgroundPreference().then((imageIndex) => {
          const val = imageIndex ?? 0;
          setActiveBackgroundIndex(val);
        });

        getMetricPreference().then((selectedMetric) => {
          const val = selectedMetric ?? Metrics.EUROPE;
          setSelectedMetrics(val);
        });
      } catch {
        console.log('not need splash error handle');
      } finally {
        setActiveStack('postLogin');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = () => {
    return new Promise<void>(async (resolve) => {
      admob()
        .setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: true,
        })
        .finally(() => {
          getLanguage()
            .then((lng) => {
              changeLanguage(lng);
            })
            .finally(() => {
              setTimeout(() => {
                resolve();
              }, 500);
            });
        });
    });
  };

  return (
    <>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          layoutStyles.alignCenter,
          layoutStyles.justifyCenter,
          {
            backgroundColor:
              themeVariables.eva[ThemeKeys.colorBlackTransparent900],
          },
        ]}>
        <Icon name={IconType.Logo} size={60} color={'white'} />
      </View>
    </>
  );
};

export default Splash;
