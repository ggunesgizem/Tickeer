import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import CreateEmom from './CreateEmom';

const CreateEmomScene: React.FC<
  DefaultNavigationProps<'CreateEmomScene'>
> = () => {
  return <CreateEmom />;
};
export default CreateEmomScene;
