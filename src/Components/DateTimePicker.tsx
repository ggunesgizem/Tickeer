import {Text} from '@ui-kitten/components';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {WorkoutType} from '~/Helpers/Enums';
import {LangKeys} from '~/Locale/LangKeys';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeTypes';
import Card from './Card';

type Mode = 'date' | 'time';
type Props = {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  format?: string;
  date?: Date;
  onConfirm: (date: Date) => void;
  onCancel?: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: Mode;
  workoutType?: WorkoutType;
};
const DateTimePicker: React.FC<Props> = (props) => {
  const getDefaultFormat = {
    time: 'HH:mm',
    date: 'DD.MM.YYYY',
  };
  const defaultFormat: string = getDefaultFormat[props.mode ?? 'date'];
  const datePickerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const {themeVariables} = useStyle();
  const {t} = useTranslation();

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  const styles = StyleSheet.create({
    pickerButton: {
      backgroundColor: themeVariables.eva[ThemeKeys.colorInkLightest],
      borderBottomWidth: 1,
      borderBottomColor: themeVariables.eva[ThemeKeys.colorInkLighter],
      padding: 11,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pickerButtonText: {
      color: themeVariables.eva[ThemeKeys.colorForTime],
      fontWeight: '500',
    },
    pickerContainer: {
      borderRadius: 0,
      marginBottom: 0,
      left: -10,
      bottom: -10,
      width: Dimensions.get('window').width,
      backgroundColor: themeVariables.eva[ThemeKeys.colorWhite],
    },
    placeholderStyle: {
      color: themeVariables.eva[ThemeKeys.colorInkLighter],
    },
  });

  const renderPickerButton = (label: string, onPress: () => void) => {
    return (
      <Pressable onPress={onPress}>
        <Text category="p1" style={styles.pickerButtonText}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const showPlaceHolder = () => {
    return props.placeholder ?? '-';
  };

  const formatDate = (date: Date) => {
    return moment(date).format(props.format ?? defaultFormat);
  };

  return (
    <>
      <Pressable onPress={showDatePicker}>
        <Card workoutType={props.workoutType} style={[props.style]}>
          <Text
            appearance="light"
            style={!props.date && styles.placeholderStyle}>
            {props.date ? formatDate(props.date) : showPlaceHolder()}
          </Text>
        </Card>
      </Pressable>
      <DateTimePickerModal
        ref={datePickerRef}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        date={props.date ?? moment().toDate()}
        isVisible={isVisible}
        mode={props.mode ?? 'date'}
        locale={'tr'}
        is24Hour
        onConfirm={(date: Date) => {
          hideDatePicker();
          props.onConfirm && props.onConfirm(date);
        }}
        onCancel={() => {
          hideDatePicker();
          props.onCancel && props.onCancel();
        }}
        pickerContainerStyleIOS={styles.pickerContainer}
        customHeaderIOS={() => {
          return (
            <View style={styles.pickerButton}>
              {renderPickerButton(t(LangKeys.close), () =>
                datePickerRef.current?.handleCancel(),
              )}
              {renderPickerButton(t(LangKeys.ok), () =>
                datePickerRef.current?.handleConfirm(),
              )}
            </View>
          );
        }}
        customCancelButtonIOS={() => null}
        customConfirmButtonIOS={() => null}
      />
    </>
  );
};
export default DateTimePicker;
