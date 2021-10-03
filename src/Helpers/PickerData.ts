import {TFunction} from 'i18next';
import {ItemType} from '~/Components/PickerModal';
import {LangKeys} from '~/Locale/LangKeys';
import {secondToTime} from './TimeHelper';

export const getForAndRoundPickerData = (): ItemType[] => {
  return Array.apply(null, Array(100)).map((_, index) => {
    const val = index + 1;
    return {
      label: val.toString(),
      value: val,
    };
  });
};

export const getSetPickerData = (): ItemType[] => {
  return Array.apply(null, Array(9)).map((_, index) => {
    const val = index + 2;
    return {
      label: val.toString(),
      value: val,
    };
  });
};

export const emomFor = (everyTime: number, t: TFunction): ItemType[] => {
  return Array.apply(null, Array(100)).map((_, index) => {
    const val = index + 1;
    return {
      label: `${secondToTime(everyTime * val)} ${t(LangKeys.minutes)} (${val}x)`,
      value: val,
    };
  });
};

export const getTimePickerData = (): ItemType[] => {
  let firstPart: ItemType[] = [];
  let secondPart: ItemType[] = [];
  Array.apply(null, Array(60)).map((_, index) => {
    const i = index + 1;
    const val = i * 15;
    firstPart.push({
      label: secondToTime(val),
      value: val,
    });
  });
  Array.apply(null, Array(15)).map((_, index) => {
    const i = index + 16;
    const val = i * 60;
    secondPart.push({
      label: secondToTime(val),
      value: val,
    });
  });
  return [...firstPart, ...secondPart];
};

export const startTimerData = (): ItemType[] => {
  return Array.apply(null, Array(20)).map((_, index) => {
    const val = index + 1;
    return {
      label: secondToTime(val),
      value: val,
    };
  });
};

export const getCombineRestData = (): ItemType[] => {
  return Array.apply(null, Array(78)).map((_, index) => {
    const getMultiple = index < 60 ? 5 : 10;
    const val = (index + 1) * getMultiple;
    return {
      label: secondToTime(val),
      value: val,
    };
  });
};
