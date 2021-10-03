import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import IconButton from './IconButton';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: IconType;
  hideIcon?: boolean;
};

const ComponentName: React.FC<Props> = (props) => {
  const {layoutStyles, themeVariables} = useStyle();
  return (
    <View
      style={[
        layoutStyles.rowContainer,
        layoutStyles.spaceBetween,
        layoutStyles.alignCenter,
      ]}>
      <Text appearance="light" category="h3">
        {props.title}
      </Text>
      {!props.hideIcon && (
        <IconButton
          icon={props.icon ?? IconType.Document}
          color={themeVariables.eva[ThemeKeys.colorWhite]}
          size={16}
          onPress={props.onPress}
          hitSlop={10}
        />
      )}
    </View>
  );
};
export default ComponentName;
