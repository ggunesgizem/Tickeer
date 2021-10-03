import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {WorkoutType} from '~/Helpers/Enums';
import {getWorkoutColor} from '~/Helpers/WorkoutHelper';
import {LangKeys} from '~/Locale/LangKeys';
import Router from '~/Navigator/Router';
import IconType from '~/Styles/IconType';
import {useStyle} from '~/Theme/ThemeHelper';
import Button from './Button';
import IconButton from './IconButton';
import Success from './Success';

type Props = {
  type: WorkoutType;
  onPress?: () => void;
};

const WorkoutSuccess: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const {themeVariables, layoutStyles} = useStyle();
  return (
    <View style={[layoutStyles.bottomPadding, layoutStyles.alignCenter]}>
      <View
        style={[
          layoutStyles.fullscreenContainer,
          layoutStyles.alignCenter,
          layoutStyles.justifyCenter,
        ]}>
        <Success workoutType={props.type} label={t(LangKeys.nice_job)} />
        {props.type !== WorkoutType.COMBINE && (
          <IconButton
            color={getWorkoutColor(props.type, themeVariables)}
            label={t(LangKeys.workoutLog)}
            style={layoutStyles.marginTopMedium}
            icon={IconType.Document}
            onPress={props.onPress}
          />
        )}
      </View>
      <Button
        label={t(LangKeys.home)}
        style={layoutStyles.marginTopMedium}
        onPress={Router.Home}
      />
    </View>
  );
};
export default WorkoutSuccess;
