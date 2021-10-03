import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Amrap from './Amrap';

const AmrapScene: React.FC<DefaultNavigationProps<'AmrapScene'>> = (props) => {
  return <Amrap {...props.route.params} />;
};
export default AmrapScene;
