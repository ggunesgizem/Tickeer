import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ViewStyle, StyleProp} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {VictoryPie} from 'victory-native';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';

type Props = {
  size: number;
  workoutType: WorkoutType;
  isPlay?: boolean;
  style?: StyleProp<ViewStyle>;
};

const AnimationCircle: React.FC<Props> = (props) => {
  const INNER_CONTAINER_SIZE: number = 144;
  const INNER_SPACING: number = 20;
  const CHART_SIZE: number = INNER_CONTAINER_SIZE + INNER_SPACING * 4;
  const INNER_RADIUS: number = (CHART_SIZE - INNER_SPACING * 2) / 1.78;
  const {themeVariables} = useStyle();

  const [innerRadius, setInnerRadius] = useState<number>(0);
  const styles = StyleSheet.create({
    chartContainer: {
      width: CHART_SIZE,
      height: CHART_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    absolute: {
      zIndex: 999,
      position: 'absolute',
      backgroundColor: themeVariables.eva[ThemeKeys.colorTransparent],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: INNER_CONTAINER_SIZE / 2,
      width: INNER_CONTAINER_SIZE,
      height: INNER_CONTAINER_SIZE,
    },
    mt6: {
      marginTop: 6,
    },
  });

  useEffect(() => {
    setInnerRadius(INNER_RADIUS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.chartContainer, props.style]}>
      <Image
        style={{
          ...StyleSheet.absoluteFillObject,
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
        source={require('~/Assets/img/circle.png')}
      />
      <VictoryPie
        animate={{duration: 500}}
        padding={{left: 0, right: 0, top: 0, bottom: 0}}
        labels={() => null}
        height={CHART_SIZE}
        width={CHART_SIZE}
        innerRadius={innerRadius}
        colorScale={[
          getWorkoutColor(props.workoutType, themeVariables),
          themeVariables.eva[ThemeKeys.colorTransparent],
        ]}
        data={[props.size, 100 - props.size]}
        endAngle={360}
      />

      <View style={[styles.absolute]}>{props.children}</View>
    </View>
  );
};
export default AnimationCircle;
