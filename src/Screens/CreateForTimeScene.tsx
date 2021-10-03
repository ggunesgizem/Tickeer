import React from 'react';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import CreateForTime from './CreateForTime';

const CreateForTimeScene: React.FC<
  DefaultNavigationProps<'CreateForTimeScene'>
> = () => {
  return <CreateForTime />;
};
export default CreateForTimeScene;
