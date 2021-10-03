import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {BgList} from '~/Components/Bg';
import SettingsContext from '~/Context/SettingsContext';
import {setBackgroundPreference} from '~/Helpers/AsyncStorageHelper';

const ChangeBackground: React.FC<
  DefaultNavigationProps<'ChangeBackground'>
> = () => {
  const styles = StyleSheet.create({
    image: {
      height: 150,
      width: '100%',
      borderRadius: 10,
    },
    imageCard: {
      flex: 1,
      borderRadius: 10,
      margin: 8,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    activeImageCard: {
      borderWidth: 2,
      borderColor: 'red',
    },
  });

  const {activeBackgroundIndex, setActiveBackgroundIndex} = useContext(
    SettingsContext,
  );

  const handleBackgrounChange = (index: number) => {
    setBackgroundPreference(index);
    setActiveBackgroundIndex(index);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageRequireSource;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleBackgrounChange(index)}
        style={[
          styles.imageCard,
          activeBackgroundIndex === index && styles.activeImageCard,
        ]}>
        <Image source={item} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
        data={BgList}
        renderItem={renderItem}
      />
    </Container>
  );
};
export default ChangeBackground;
