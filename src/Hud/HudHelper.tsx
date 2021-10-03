import React from 'react';
import {HudRefType} from './Hud';

export const hudRef = React.createRef<HudRefType>();

export const showHud = () => {
  hudRef.current?.show();
};

export const hideHud = () => {
  hudRef.current?.hide();
};

export const forceHide = () => {
  hudRef.current?.forceHide();
};
