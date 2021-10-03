import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Emom from './Emom';

const EmomScene: React.FC<DefaultNavigationProps<'EmomScene'>> = (props) => {
  return <Emom {...props.route.params} />;
};
export default EmomScene;
