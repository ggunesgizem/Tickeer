import {Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import {LangKeys} from '~/Locale/LangKeys';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export type ItemType = {
  label: string;
  value: number;
};

type Props = {
  data: ItemType[];
  initialIndex?: number;
  onSelect: (selectedItemIndex: number | undefined) => void;
};

const PickerModal: React.FC<Props> = (props) => {
  const {themeVariables} = useStyle();
  const {t} = useTranslation();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
      borderWidth: 1,
      borderColor: themeVariables.eva[ThemeKeys.colorWhite],
      borderRadius: 20,
      backgroundColor: themeVariables.eva[ThemeKeys.colorBlack],
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: 'white',
    },
  });

  const [selectedItemIndex, setSelectedItemIndex] = useState<ItemType>(
    props.data[props.initialIndex ?? 0],
  );

  const updateSelectedItem = (item: ItemType) => {
    setSelectedItemIndex(item);
  };

  const handleRequestClose = () => {
    props.onSelect(undefined);
  };

  const handleSelect = () => {
    props.onSelect(selectedItemIndex.value);
  };

  return (
    <Modal transparent onRequestClose={handleRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <DynamicallySelectedPicker
            initialSelectedIndex={props.initialIndex ?? 0}
            fontSize={16}
            allItemsColor={themeVariables.eva[ThemeKeys.colorWhite]}
            topGradientColors={['transparent', 'transparent']}
            bottomGradientColors={['transparent', 'transparent']}
            items={props.data}
            onScroll={({item}: {item: ItemType}) => {
              updateSelectedItem(item);
            }}
          />
          <TouchableOpacity
            onPress={handleSelect}
            style={styles.buttonContainer}>
            <Text appearance="light">{t(LangKeys.ok)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;
