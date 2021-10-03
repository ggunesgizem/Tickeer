import React, {useImperativeHandle} from 'react';
import {
  Input as UIInput,
  InputProps as UIInputProps,
  Text,
} from '@ui-kitten/components';
import {useStyle} from '~/Theme/ThemeHelper';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ThemeKeys} from '~/Theme/ThemeKeys';

export type InputRef = {
  clear: () => void;
};

type _UIInputProps = Omit<UIInputProps, 'defaultValue'>;
export interface InputProps extends _UIInputProps {
  onChangeText?: (cleanValue: string, maskedValue?: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputLabel?: string;
  defaultValue?: string | number;
}

const Input = React.forwardRef(
  (props: InputProps, ref?: React.Ref<InputRef>) => {
    const [text, setText] = React.useState('');
    const {themeVariables} = useStyle();

    const onChange = (value: string) => {
      setText(value);
      props.onChangeText && props.onChangeText(value);
    };

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
      },
      defaultInputTextStyle: {
        paddingHorizontal: 10,
      },
      accessoryLeftContainer: {
        borderRightWidth: 1,
        borderRightColor: props.disabled
          ? themeVariables.eva[ThemeKeys.colorWhiteTransparent]
          : themeVariables.eva[ThemeKeys.colorInk],
        paddingHorizontal: 8,
      },
      accessoryleftText: {
        color: props.disabled
          ? themeVariables.eva[ThemeKeys.colorWhite]
          : themeVariables.eva[ThemeKeys.colorInk],
      },
      multiline: {
        minHeight: 50,
      },
    });

    React.useEffect(() => {
      props.defaultValue && setText(props.defaultValue.toString());
    }, [props.defaultValue]);

    function clear() {
      setText('');
    }
    useImperativeHandle(ref, () => ({
      clear: () => clear(),
    }));
    return (
      <View style={[styles.container, props.containerStyle]}>
        <UIInput
          {...props}
          status={props.status ?? 'basic'}
          textStyle={[
            props.textStyle,
            styles.defaultInputTextStyle,
            props.multiline && styles.multiline,
          ]}
          value={text}
          onChangeText={onChange}
          accessoryRight={props.accessoryRight ?? undefined}
          accessoryLeft={() =>
            props.inputLabel ? (
              <View style={styles.accessoryLeftContainer}>
                <Text category={'p1'} style={styles.accessoryleftText}>
                  {props.inputLabel}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    );
  },
);

export default Input;
