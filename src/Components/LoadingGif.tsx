import React from 'react';
import {StyleProp, ImageStyle, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  show?: boolean;
  gifStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const LoadingGif: React.FC<Props> = (props) => {
  return props.show ? (
    <LottieView
      source={require('~/Assets/lottie/loader.json')}
      style={{width: 200, height: 200}}
      autoPlay
      loop
    />
  ) : null;
};
export default LoadingGif;
