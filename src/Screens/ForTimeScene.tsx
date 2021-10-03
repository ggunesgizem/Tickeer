import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';

import ForTime from './ForTime';

const ForTimeScene: React.FC<DefaultNavigationProps<'ForTimeScene'>> = (
  props,
) => {
  return <ForTime {...props.route.params} />;
};
export default ForTimeScene;
