import _ from 'lodash';

export const parseSelectObject = (
  array: any[],
  label: string,
  value: string,
): any[] => {
  return array.map((data) => {
    return {
      label: data[label],
      value: data[value],
    };
  });
};

export const removeObjectFromArray = (data: any[], objectIndex: number) => {
  return data.filter((_item, itemIndex) => {
    return itemIndex !== objectIndex;
  });
};

export const clone = (data: any[] | Object) => {
  return JSON.parse(JSON.stringify(data));
};

export const findIndexFromObjectArray = (data: any[], value: number) => {
  return _.map(data, (item) => item.value).indexOf(value);
};

export const updateArrayElement = (
  array: any[],
  value: any,
  index: number,
  key: string,
) => {
  const _array = array;
  _array[index][key] = value;
  return _array;
};

export const deleteElementFromArrayWithIndex = (
  array: any[],
  index: number,
) => {
  return _.filter(array, (item, i) => {
    return i !== index;
  });
};

export const deleteElementFromArrayWithValue = (array: any[], value: any) => {
  return _.filter(array, (item) => {
    return item !== value;
  });
};
