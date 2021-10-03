import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import Card from '~/Components/Card';
import moment from 'moment';
import {useStyle} from '~/Theme/ThemeHelper';
import {ReminderType} from '~/Helpers/ReminderHelper';
import {WorkoutType} from '~/Helpers/Enums';
import CardHeader from '~/Components/CardHeader';
import {LangKeys} from '~/Locale/LangKeys';
import {useTranslation} from 'react-i18next';
import Input from '~/Components/Input';

const NotificationDetail: React.FC<
  DefaultNavigationProps<'NotificationDetail'>
> = (props) => {
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const {message, type, date, detail, format} = props.route.params;
  return (
    <Container style={layoutStyles.horizontalPadding}>
      <Card
        style={layoutStyles.marginTopBase}
        workoutType={
          type === ReminderType.MEAL
            ? WorkoutType.AMRAP
            : type === ReminderType.WATER
            ? WorkoutType.FORTIME
            : WorkoutType.COMBINE
        }>
        <CardHeader
          title={
            type === ReminderType.MEAL
              ? t(LangKeys.mealReminder)
              : type === ReminderType.WATER
              ? t(LangKeys.waterReminder)
              : t(LangKeys.cheatMealReminder)
          }
          hideIcon
        />
        <Input
          disabled
          defaultValue={moment(date).format(format ?? 'HH:mm')}
          style={layoutStyles.marginTopBase}
          inputLabel={t(LangKeys.date)}
        />
        <Input
          inputLabel={t(LangKeys.message) ?? '-'}
          disabled
          defaultValue={message}
          style={layoutStyles.marginTopBase}
        />
        {detail ? (
          <Input
            disabled
            defaultValue={detail}
            style={[layoutStyles.marginTopBase]}
            multiline
          />
        ) : null}
      </Card>
    </Container>
  );
};
export default NotificationDetail;
