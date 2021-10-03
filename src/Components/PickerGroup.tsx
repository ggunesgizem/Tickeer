import {Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import Picker from './Picker';
import {ItemType} from './PickerModal';

type Props = {
  onDeletePress: () => void;
  color: string;
  firstPickerData: ItemType[];
  firstPickerLabel: string;
  secondPickerData: ItemType[];
  secondPickerLabel: string;
  firstPickerSelected: number;
  secondPickerSelected: number;
  onFirstSelectedChange: (selected: number) => void;
  onSecondSelectedChange: (selected: number) => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  firstSelectedLabel?: string;
  secondSelectedLabel?: string;
};

const PickerGroup: React.FC<Props> = (props) => {
  const BORDER_RADIUS: number = 3;
  const ICON_SIZE: number = 16;
  const {themeVariables, layoutStyles} = useStyle();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    leftContainer: {
      borderTopLeftRadius: BORDER_RADIUS,
      borderBottomLeftRadius: BORDER_RADIUS,
      borderWidth: 2,
      borderRightWidth: 0,
      borderColor: themeVariables.eva[ThemeKeys.colorWhite],
      padding: themeVariables.spacing.horizontal / 2.5,
    },
    contentContainer: {
      paddingVertical: themeVariables.spacing.horizontal,
      alignItems: 'flex-start',
    },
    rightContainer: {
      borderTopRightRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
      borderWidth: 2,
      borderLeftWidth: 0,
      borderColor: themeVariables.eva[ThemeKeys.colorWhite],
      padding: themeVariables.spacing.horizontal / 2.5 + ICON_SIZE / 2,
    },
    text: {alignSelf: 'center', textAlign: 'center'},
  });

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={props.onDeletePress}>
          <Icon
            name={IconType.Close}
            size={ICON_SIZE}
            color={themeVariables.eva[ThemeKeys.colorWhite]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {props.title && (
          <Text category="h4" appearance="light" style={styles.text}>
            {props.title}
          </Text>
        )}
        <Picker
          data={props.firstPickerData}
          style={props.title ? layoutStyles.marginTopSmall : {}}
          label={props.firstPickerLabel}
          onSelectedChange={props.onFirstSelectedChange}
          selected={props.firstPickerSelected}
          color={props.color}
          selectedLabel={props.firstSelectedLabel}
        />
        <Picker
          data={props.secondPickerData}
          style={layoutStyles.marginTopSmall}
          label={props.secondPickerLabel}
          onSelectedChange={props.onSecondSelectedChange}
          selected={props.secondPickerSelected}
          color={props.color}
          selectedLabel={props.secondSelectedLabel}
        />
      </View>
      <View style={styles.rightContainer} />
    </View>
  );
};
export default PickerGroup;
