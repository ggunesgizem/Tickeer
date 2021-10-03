import {Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {findIndexFromObjectArray} from '~/Utils/Array';
import PickerModal, {ItemType} from './PickerModal';

type Props = {
  data: ItemType[];
  color: string;
  label: string;
  selected: number;
  onSelectedChange: (selected: number) => void;
  style?: StyleProp<ViewStyle>;
  selectedLabel?: string;
  isLeftLabel?: boolean;
};

const Picker: React.FC<Props> = (props) => {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const {themeVariables} = useStyle();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerContainer: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: props.color,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      minWidth: 50,
      backgroundColor: themeVariables.eva[ThemeKeys.colorBlack],
      paddingHorizontal: themeVariables.spacing.horizontal / 2,
    },
    mr8: {
      marginRight: themeVariables.spacing.horizontal / 2,
    },
    ml8: {
      marginLeft: themeVariables.spacing.horizontal / 2,
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPickerVisible(true)}
        style={[
          styles.container,
          props.isLeftLabel && styles.rowReverse,
          props.style,
        ]}>
        <View
          style={[
            styles.pickerContainer,
            props.isLeftLabel ? styles.ml8 : styles.mr8,
          ]}>
          <Text category="h1" appearance="light">
            {props.selectedLabel ?? props.selected}
          </Text>
        </View>
        <Text category="h1" appearance="light">
          {props.label}
        </Text>
      </TouchableOpacity>
      {isPickerVisible && (
        <PickerModal
          initialIndex={findIndexFromObjectArray(props.data, props.selected)}
          data={props.data}
          onSelect={(selected) => {
            setIsPickerVisible(false);
            selected !== undefined && props.onSelectedChange(selected);
          }}
        />
      )}
    </>
  );
};
export default Picker;
