import React from 'react';
import {useContext} from 'react';
import {
  Dimensions,
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import SettingsContext from '~/Context/SettingsContext';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export type BgTypes = 'image' | 'video';
type Props = {
  bgType?: BgTypes;
  onBackPress?: () => void;
};

export const BgList: ImageRequireSource[] = [
  require('~/Assets/img/bg.jpg'),
  require('~/Assets/img/bg2.jpg'),
  require('~/Assets/img/bg3.jpg'),
  require('~/Assets/img/bg4.jpg'),
  require('~/Assets/img/bg5.jpg'),
  require('~/Assets/img/bg6.jpg'),
  require('~/Assets/img/bg7.jpg'),
  require('~/Assets/img/bg8.jpg'),
  require('~/Assets/img/bg9.jpg'),
];

const Bg: React.FC<Props> = (props) => {
  const {themeVariables} = useStyle();
  const {activeBackgroundIndex} = useContext(SettingsContext);
  const getBg = {
    video: (
      <Video
        repeat
        volume={0}
        style={{...StyleSheet.absoluteFillObject}}
        source={require('~/Assets/video/video.mp4')}
        resizeMode="cover"
      />
    ),
    image: (
      <Image
        style={{
          ...StyleSheet.absoluteFillObject,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          resizeMode: 'cover',
        }}
        source={BgList[activeBackgroundIndex]}
      />
    ),
  };
  return (
    <>
      {getBg[props.bgType ?? 'image']}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor:
            props.bgType === 'video'
              ? themeVariables.eva[ThemeKeys.colorBlackTransparent100]
              : themeVariables.eva[ThemeKeys.colorBlackTransparent600],
        }}
      />
      <TouchableOpacity
        style={{...StyleSheet.absoluteFillObject}}
        onPress={() => props.onBackPress && props.onBackPress()}
      />
    </>
  );
};
export default Bg;
