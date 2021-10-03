import React, {useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import CardHeader from '~/Components/CardHeader';
import {WorkoutType} from '~/Helpers/Enums';
import IconType from '~/Styles/IconType';
import Input from '~/Components/Input';
import Card from '~/Components/Card';
import {useStyle} from '~/Theme/ThemeHelper';
import DateTimePicker from '~/Components/DateTimePicker';
import IconButton from '~/Components/IconButton';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {View} from 'react-native';
import {createReminder, ReminderType} from '~/Helpers/ReminderHelper';
import Router from '~/Navigator/Router';
import moment from 'moment';

const AddCheatMealReminder: React.FC<
  DefaultNavigationProps<'AddCheatMealReminder'>
> = () => {
  const {layoutStyles} = useStyle();
  const [selectedDate, setSelectedDate] = useState<Date>(
    moment().add(1, 'days').toDate(),
  );
  const [selectedTime, setSelectedTime] = useState<Date>(
    moment('10:00', 'HH.mm').toDate(),
  );
  const [message, setMessage] = useState<string>('');
  const {t} = useTranslation();

  const handleSave = () => {
    createReminder({
      message,
      type: ReminderType.CHEAT_MEAL,
      date: selectedDate,
      time: selectedTime,
    });

    Router.Reminder({shouldRefresh: true});
  };

  return (
    <Container style={layoutStyles.horizontalPadding}>
      <Card
        workoutType={WorkoutType.COMBINE}
        style={layoutStyles.marginTopBase}>
        <CardHeader
          title={t(LangKeys.cheatMealReminder)}
          icon={IconType.Save}
          hideIcon
        />
        <View style={[layoutStyles.rowContainer, layoutStyles.spaceBetween]}>
          <View style={layoutStyles.fullscreenContainer}>
            <DateTimePicker
              date={selectedDate}
              onConfirm={setSelectedDate}
              mode="date"
              minimumDate={moment().add(1, 'days').toDate()}
              style={[layoutStyles.marginTopSmall]}
            />
          </View>
          <DateTimePicker
            date={selectedTime}
            onConfirm={setSelectedTime}
            mode="time"
            style={[layoutStyles.marginTopSmall, {marginLeft: 16}]}
          />
        </View>

        <Input
          onChangeText={setMessage}
          style={layoutStyles.marginTopBase}
          placeholder={t(LangKeys.message)}
        />
        <View
          style={[
            layoutStyles.justifyCenter,
            layoutStyles.alignCenter,
            layoutStyles.marginTopBase,
          ]}>
          <IconButton
            icon={IconType.Save}
            label={t(LangKeys.save)}
            onPress={handleSave}
          />
        </View>
      </Card>
    </Container>
  );
};
export default AddCheatMealReminder;
