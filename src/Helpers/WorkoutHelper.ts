import {TFunction} from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';
import {AmrapWorkoutType} from '~/Screens/CreateAmrap';
import {EmomWorkoutType} from '~/Screens/CreateEmom';
import {ForTimeWorkoutType} from '~/Screens/CreateForTime';
import {TabataWorkoutType} from '~/Screens/CreateTabata';
import {ThemeKeys} from '~/Theme/ThemeKeys';
import {ThemeType} from '~/Theme/ThemeTypes';
import {WorkoutType} from './Enums';

export type StorageWorkoutLogType = {
  data: WorkoutLogType[];
};

export type RoundRecorType = {
  time: number;
  diff: number;
};

export type RecordType = {
  [key: number]: RoundRecorType[];
};

export type WorkoutLogType = {
  workoutData:
    | AmrapWorkoutType[]
    | EmomWorkoutType
    | TabataWorkoutType
    | ForTimeWorkoutType;

  workoutType: WorkoutType;
  roundRecords?: RecordType;
  date?: string;
};

export const getWorkoutColor = (
  workoutType: WorkoutType,
  themeVariables: ThemeType,
  hover?: boolean,
): string => {
  const workoutColors = {
    [WorkoutType.AMRAP]: hover
      ? themeVariables.eva[ThemeKeys.colorAmrap400]
      : themeVariables.eva[ThemeKeys.colorAmrap],
    [WorkoutType.EMOM]: hover
      ? themeVariables.eva[ThemeKeys.colorEmom400]
      : themeVariables.eva[ThemeKeys.colorEmom],
    [WorkoutType.TABATA]: hover
      ? themeVariables.eva[ThemeKeys.tabata400]
      : themeVariables.eva[ThemeKeys.colorTabata],
    [WorkoutType.FORTIME]: hover
      ? themeVariables.eva[ThemeKeys.colorForTime400]
      : themeVariables.eva[ThemeKeys.colorForTime],
    [WorkoutType.COMBINE]: hover
      ? themeVariables.eva[ThemeKeys.colorCombine400]
      : themeVariables.eva[ThemeKeys.colorCombine],
    [WorkoutType.REST]: themeVariables.eva[ThemeKeys.colorInkLighter],
  };
  return workoutColors[workoutType];
};

export const getWorkoutLabel = (
  workoutType: WorkoutType,
  t: TFunction,
): string => {
  const workoutLabels = {
    [WorkoutType.AMRAP]: t(LangKeys.amrap),
    [WorkoutType.EMOM]: t(LangKeys.emom),
    [WorkoutType.TABATA]: t(LangKeys.tabata),
    [WorkoutType.FORTIME]: t(LangKeys.forTime),
    [WorkoutType.COMBINE]: t(LangKeys.combine),
    [WorkoutType.REST]: '',
  };
  return workoutLabels[workoutType];
};

export const getButtonStatus = (
  workoutType: WorkoutType,
  fill?: boolean,
): string => {
  const buttonTypes = {
    [WorkoutType.AMRAP]: 'amrap',
    [WorkoutType.EMOM]: 'emom',
    [WorkoutType.TABATA]: 'tabata',
    [WorkoutType.FORTIME]: 'forTime',
    [WorkoutType.COMBINE]: 'combine',
    [WorkoutType.REST]: '',
  };

  let type = buttonTypes[workoutType];
  if (fill) {
    type = `${type}-fill`;
  }
  return type;
};

export const getWorkoutKeyLabel = (key: string, t: TFunction) => {
  const labels = {
    every: t(LangKeys.every),
    for: t(LangKeys.for),
    rounds: t(LangKeys.rounds),
    work: t(LangKeys.work),
    workoutRest: t(LangKeys.setRest),
    sets: t(LangKeys.sets),
    rest: t(LangKeys.rest),
    minute: t(LangKeys.minutes),
  };

  return labels[key] ?? '';
};

export const getGradientColor = (
  type: WorkoutType,
  themeVariables: ThemeType,
) => {
  const gradientColors = {
    [WorkoutType.AMRAP]: [
      themeVariables.eva[ThemeKeys.colorAmrap600],
      themeVariables.eva[ThemeKeys.colorAmrap500],
      themeVariables.eva[ThemeKeys.colorAmrap400],
      themeVariables.eva[ThemeKeys.colorAmrap300],
      themeVariables.eva[ThemeKeys.colorAmrap200],
      themeVariables.eva[ThemeKeys.colorAmrap100],
    ],
    [WorkoutType.EMOM]: [
      themeVariables.eva[ThemeKeys.colorEmom600],
      themeVariables.eva[ThemeKeys.colorEmom500],
      themeVariables.eva[ThemeKeys.colorEmom400],
      themeVariables.eva[ThemeKeys.colorEmom300],
      themeVariables.eva[ThemeKeys.colorEmom200],
      themeVariables.eva[ThemeKeys.colorEmom100],
    ],
    [WorkoutType.TABATA]: [
      themeVariables.eva[ThemeKeys.colorTabata600],
      themeVariables.eva[ThemeKeys.colorTabata500],
      themeVariables.eva[ThemeKeys.colorTabata400],
      themeVariables.eva[ThemeKeys.colorTabata300],
      themeVariables.eva[ThemeKeys.colorTabata200],
      themeVariables.eva[ThemeKeys.colorTabata100],
    ],
    [WorkoutType.FORTIME]: [
      themeVariables.eva[ThemeKeys.colorForTime600],
      themeVariables.eva[ThemeKeys.colorForTime500],
      themeVariables.eva[ThemeKeys.colorForTime400],
      themeVariables.eva[ThemeKeys.colorForTime300],
      themeVariables.eva[ThemeKeys.colorForTime200],
      themeVariables.eva[ThemeKeys.colorForTime100],
    ],
    [WorkoutType.COMBINE]: [
      themeVariables.eva[ThemeKeys.colorCombine600],
      themeVariables.eva[ThemeKeys.colorCombine500],
      themeVariables.eva[ThemeKeys.colorCombine400],
      themeVariables.eva[ThemeKeys.colorCombine300],
      themeVariables.eva[ThemeKeys.colorCombine200],
      themeVariables.eva[ThemeKeys.colorCombine100],
    ],
  };

  return gradientColors[type];
};
