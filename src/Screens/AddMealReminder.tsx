import React, {useEffect, useState} from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import CardHeader from '~/Components/CardHeader';
import {WorkoutType} from '~/Helpers/Enums';
import IconType from '~/Styles/IconType';
import Input from '~/Components/Input';
import Card from '~/Components/Card';
import {useStyle} from '~/Theme/ThemeHelper';
import DateTimePicker from '~/Components/DateTimePicker';
import {LangKeys} from '~/Locale/LangKeys';
import IconButton from '~/Components/IconButton';
import {Alert, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {createReminder, ReminderType} from '~/Helpers/ReminderHelper';
import Router from '~/Navigator/Router';
import moment from 'moment';

const AddMealReminder: React.FC<DefaultNavigationProps<'AddMealReminder'>> = (
  props,
) => {
  const {layoutStyles} = useStyle();
  const [selectedDate, setSelectedDate] = useState<Date>(
    moment().add(1, 'minutes').toDate(),
  );
  const [message, setMessage] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  const {t} = useTranslation();

  const handleSave = () => {
    createReminder({
      message,
      detail,
      type: ReminderType.MEAL,
      date: selectedDate,
    });

    Router.Reminder({shouldRefresh: true});
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // Do whatever you want
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <Container style={layoutStyles.horizontalPadding}>
      <Card workoutType={WorkoutType.AMRAP} style={layoutStyles.marginTopBase}>
        <CardHeader
          title={t(LangKeys.mealReminder)}
          icon={IconType.Save}
          hideIcon
        />
        <DateTimePicker
          date={selectedDate}
          onConfirm={setSelectedDate}
          mode="time"
          style={layoutStyles.marginTopSmall}
        />
        <Input
          onChangeText={setMessage}
          style={layoutStyles.marginTopBase}
          placeholder={t(LangKeys.message)}
        />
        <Input
          onChangeText={setDetail}
          style={[layoutStyles.marginTopBase]}
          placeholder={t(LangKeys.detail)}
          multiline
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
export default AddMealReminder;
