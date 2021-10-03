import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import CreateAmrap from './CreateAmrap';

const CreateAmrapScene: React.FC<
  DefaultNavigationProps<'CreateAmrapScene'>
> = () => {
  return <CreateAmrap />;
};
export default CreateAmrapScene;
