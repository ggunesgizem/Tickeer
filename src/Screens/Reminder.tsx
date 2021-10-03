import React, {useEffect, useState} from 'react';
import {Pressable, View, ScrollView, Alert} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import Card from '~/Components/Card';
import CardHeader from '~/Components/CardHeader';
import IconType from '~/Styles/IconType';
import {WorkoutType} from '~/Helpers/Enums';
import {useStyle} from '~/Theme/ThemeHelper';
import Router from '~/Navigator/Router';
import {notifRef} from '~/App';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {Text} from '@ui-kitten/components';
import moment from 'moment';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import IconButton from '~/Components/IconButton';
import _ from 'lodash';
import {getReminderList, ReminderType} from '~/Helpers/ReminderHelper';
import {LangKeys} from '~/Locale/LangKeys';
import {useTranslation} from 'react-i18next';

const Reminder: React.FC<DefaultNavigationProps<'Reminder'>> = (props) => {
  const {layoutStyles, themeVariables} = useStyle();
  const {t} = useTranslation();
  const [mealReminderList, setMealReminderList] = useState<any>({});
  const [waterReminderList, setWaterReminderList] = useState<any>({});
  const [cheatMealReminderList, setCheatMealReminderList] = useState<any>({});

  const getLocalNotificationList = () => {
    showHud();
    getReminderList().then(
      ({mealReminders, waterReminders, cheatMealReminders}) => {
        hideHud();
        setMealReminderList({...mealReminders});
        setWaterReminderList({...waterReminders});
        setCheatMealReminderList({...cheatMealReminders});
      },
    );
  };

  useEffect(() => {
    if (props?.route?.params?.shouldRefresh) {
      getLocalNotificationList();
    }
  }, [props]);

  useEffect(() => {
    getLocalNotificationList();
  }, []);

  const deleteReminder = (guid: string, type: ReminderType) => {
    const list =
      type === ReminderType.MEAL
        ? mealReminderList[guid]
        : type === ReminderType.WATER
        ? waterReminderList[guid]
        : cheatMealReminderList[guid];

    _.map(list, (item) => {
      notifRef.cancelNotif(item.id);
    });
    getLocalNotificationList();
  };

  const handleDismissReminder = (guid: string, type: ReminderType) => {
    Alert.alert(t(LangKeys.warning), t(LangKeys.delete_reminder_alert), [
      {
        text: t(LangKeys.ok),
        onPress: () => deleteReminder(guid, type),
      },
      {
        text: t(LangKeys.cancel),
      },
    ]);
  };

  const ReminderItem = ({
    guid,
    message,
    date,
    type,
    detail,
    format,
  }: {
    guid: string;
    message: string;
    date: Date;
    type: ReminderType;
    detail?: string;
    format?: string;
  }) => {
    return (
      <Pressable
        style={layoutStyles.marginTopSmall}
        onPress={() => {
          Router.NotificationDetail({
            message,
            date,
            type,
            detail,
            format,
          });
        }}>
        <Card style={[layoutStyles.rowContainer, layoutStyles.spaceBetween]}>
          <View>
            <Text appearance="light">
              {moment(date).format(format ?? 'HH:mm')}
            </Text>
            {message ? (
              <Text appearance="light" style={layoutStyles.marginTopSmall}>
                {message}
              </Text>
            ) : null}
          </View>
          <IconButton
            size={16}
            icon={IconType.Trash}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
            onPress={() => handleDismissReminder(guid, type)}
          />
        </Card>
      </Pressable>
    );
  };

  const handleResetPress = () => {
    Alert.alert(t(LangKeys.warning), t(LangKeys.reset_reminder_alert), [
      {
        text: t(LangKeys.ok),
        onPress: () => {
          notifRef.cancelAll();
          getLocalNotificationList();
        },
      },
      {
        text: t(LangKeys.cancel),
      },
    ]);
  };

  return (
    <Container style={layoutStyles.horizontalPadding}>
      <ScrollView style={layoutStyles.flexGrow}>
        <Card
          workoutType={WorkoutType.AMRAP}
          style={layoutStyles.marginTopBase}>
          <CardHeader
            title={t(LangKeys.mealReminder)}
            icon={IconType.AddWithCircle}
            onPress={Router.AddMealReminder}
          />
          {_.map(mealReminderList, (value: any) => {
            return (
              <ReminderItem
                key={value[0].data?.guid}
                guid={value[0].data?.guid}
                message={value[0].message}
                date={value[0].date}
                type={value[0].data?.type}
                detail={value[0].data?.detail}
              />
            );
          })}
        </Card>
        <Card
          workoutType={WorkoutType.COMBINE}
          style={layoutStyles.marginTopBase}>
          <CardHeader
            title={t(LangKeys.cheatMealReminder)}
            icon={IconType.AddWithCircle}
            onPress={Router.AddCheatMealReminder}
          />
          {_.map(cheatMealReminderList, (value: any) => {
            return (
              <ReminderItem
                key={value[0].data?.guid}
                guid={value[0].data?.guid}
                message={value[0].message}
                date={value[0].date}
                type={value[0].data?.type}
                detail={value[0].data?.detail}
                format={'DD.MM.YYYY - HH:mm'}
              />
            );
          })}
        </Card>
        <Card
          workoutType={WorkoutType.FORTIME}
          style={layoutStyles.marginTopBase}>
          <CardHeader
            title={t(LangKeys.waterReminder)}
            icon={IconType.AddWithCircle}
            onPress={Router.AddWaterReminder}
          />
          {_.map(waterReminderList, (value: any) => {
            return (
              <ReminderItem
                key={value[0].data?.guid}
                guid={value[0].data?.guid}
                message={value[0].message}
                date={value[0].date}
                type={value[0].data?.type}
                detail={value[0].data?.detail}
              />
            );
          })}
        </Card>
        <IconButton
          style={[layoutStyles.marginTopBase, layoutStyles.justifyCenter]}
          icon={IconType.Trash}
          onPress={handleResetPress}
          label={t(LangKeys.reset_reminder)}
          color={themeVariables.eva[ThemeKeys.colorWhite]}
        />
      </ScrollView>
    </Container>
  );
};
export default Reminder;
