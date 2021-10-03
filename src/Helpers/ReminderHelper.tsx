import _ from 'lodash';
import moment from 'moment';
import {notifRef} from '~/App';
import {PushNotificationScheduledLocalObject} from 'react-native-push-notification';
import {guidGenerator} from '~/Utils/Guid';

export enum ReminderType {
  WATER = 'WATER',
  MEAL = 'MEAL',
  CHEAT_MEAL = 'CHEAT_MEAL',
}

const titles = {
  [ReminderType.MEAL]: 'Meal Time !!',
  [ReminderType.WATER]: 'Water Time !!',
  [ReminderType.CHEAT_MEAL]: 'Cheat Meal Time :)',
};

export const createReminder = ({
  message,
  date,
  detail,
  type,
  time,
  staticGuid,
}: {
  message: string;
  date: Date;
  detail?: string;
  type: ReminderType;
  time?: Date;
  staticGuid?: string;
}) => {
  const now = moment();
  let reminderDate = moment(date); // Seçilen tarih
  const guid = staticGuid ?? guidGenerator();

  if (type === ReminderType.CHEAT_MEAL) {
    const cheatMealDate = reminderDate.set({
      hour: moment(time).get('hours'),
      minute: moment(time).get('minutes'),
      second: 0,
    });
    notifRef.scheduleNotif({
      title: titles[type],
      message,
      date: cheatMealDate.toDate(),
      detail,
      type,
      guid,
    });
  } else {
    if (now.isAfter(reminderDate)) {
      reminderDate.add(1, 'days');
    }

    let _reminderDate: any = reminderDate;
    _.each(Array.apply(null, Array(7)), (_item, index) => {
      _reminderDate =
        index === 0
          ? reminderDate.toDate()
          : moment(_reminderDate).add(1, 'days').toDate();
      notifRef.scheduleNotif({
        title: titles[type],
        message,
        date: _reminderDate,
        detail,
        type,
        guid,
      });
    });
  }
};

export const getReminderList = () => {
  return new Promise((res) => {
    notifRef.getScheduledLocalNotifications(
      (response: PushNotificationScheduledLocalObject[]) => {
        let _mealReminders: PushNotificationScheduledLocalObject[] = [];
        let _waterReminders: PushNotificationScheduledLocalObject[] = [];
        let _cheatMealReminders: PushNotificationScheduledLocalObject[] = [];

        _.each(response, (item) => {
          if (item.data?.type === ReminderType.MEAL) {
            _mealReminders.push(item);
          } else if (item.data?.type === ReminderType.WATER) {
            _waterReminders.push(item);
          } else if (item.data?.type === ReminderType.CHEAT_MEAL) {
            _cheatMealReminders.push(item);
          }
        });

        _mealReminders = _.groupBy(_mealReminders, (x) => x.data?.guid);
        _waterReminders = _.groupBy(_waterReminders, (x) => x.data?.guid);
        _cheatMealReminders = _.groupBy(
          _cheatMealReminders,
          (x) => x.data?.guid,
        );

        res({
          mealReminders: _mealReminders,
          waterReminders: _waterReminders,
          cheatMealReminders: _cheatMealReminders,
        });
      },
    );
  });
};
