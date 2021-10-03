import {TFunction} from 'i18next';
import {Metrics} from '~/Context/SettingsContext';
import {LangKeys} from '~/Locale/LangKeys';
import {StorageKeys} from './AsyncStorageHelper';

export enum GenderTypes {
  MALE,
  FEMALE,
}

export type BodySize = {
  gender?: number;
  hip?: number;
  height?: number;
  weight?: number;
  arm?: number;
  leg?: number;
  neck?: number;
  waist?: number;
};

export type CalorieCounter = {
  calorie?: number;
};

export type HeroWod = {
  amanda: number;
  barbara: number;
  chelsea: number;
  cindy: number;
  diane: number;
  elizabeth: number;
  fran: number;
  grace: number;
  isabel: number;
  jackie: number;
  karen: number;
  kelly: number;
  mary: number;
  murph: number;
  nancy: number;
};

export type PrBoard = {
  powerClean: number;
  squatClean: number;
  muscleClean: number;
  powerSnatch: number;
  squatSnatch: number;
  muscleSnatch: number;
  backSquat: number;
  frontSquat: number;
  overheadSquat: number;
  cleanJerk: number;
  strictPress: number;
  pushPress: number;
  pushJerk: number;
  splitJerk: number;
  deadLift: number;
  sumoDeadLift: number;
  benchPress: number;
  cluster: number;
  thruster: number;
};

export const getTrackerLabel = (
  key: string,
  t: TFunction,
  selectedMetric: Metrics,
) => {
  const weightMetric =
    selectedMetric === Metrics.USA ? t(LangKeys.lbs) : t(LangKeys.kg);
  const heightMetric =
    selectedMetric === Metrics.USA ? t(LangKeys.inch) : t(LangKeys.cm);

  const labels = {
    gender: t(LangKeys.gender),
    hip: t(LangKeys.hip, {metric: heightMetric}),
    height: t(LangKeys.height, {metric: heightMetric}),
    weight: t(LangKeys.weight, {metric: weightMetric}),
    arm: t(LangKeys.arm, {metric: heightMetric}),
    leg: t(LangKeys.leg, {metric: heightMetric}),
    neck: t(LangKeys.neck, {metric: heightMetric}),
    waist: t(LangKeys.waist, {metric: heightMetric}),
    bodyFat: '%',
    calorie: 'kcal',
    date: t(LangKeys.date),
    amanda: t(LangKeys.date),
    barbara: t(LangKeys.date),
    chelsea: t(LangKeys.date),
    cindy: t(LangKeys.date),
    diane: t(LangKeys.date),
    elizabeth: t(LangKeys.date),
    fran: t(LangKeys.date),
    grace: t(LangKeys.date),
    isabel: t(LangKeys.date),
    jackie: t(LangKeys.date),
    karen: t(LangKeys.date),
    kelly: t(LangKeys.date),
    mary: t(LangKeys.date),
    murph: t(LangKeys.date),
    nancy: t(LangKeys.date),
    powerClean: t(LangKeys.powerClean, {metric: weightMetric}),
    squatClean: t(LangKeys.squatClean, {metric: weightMetric}),
    muscleClean: t(LangKeys.muscleClean, {metric: weightMetric}),
    powerSnatch: t(LangKeys.powerSnatch, {metric: weightMetric}),
    squatSnatch: t(LangKeys.squatSnatch, {metric: weightMetric}),
    muscleSnatch: t(LangKeys.muscleSnatch, {metric: weightMetric}),
    backSquat: t(LangKeys.backSquat, {metric: weightMetric}),
    frontSquat: t(LangKeys.frontSquat, {metric: weightMetric}),
    overheadSquat: t(LangKeys.overheadSquat, {metric: weightMetric}),
    cleanJerk: t(LangKeys.cleanJerk, {metric: weightMetric}),
    strictPress: t(LangKeys.strictPress, {metric: weightMetric}),
    pushPress: t(LangKeys.pushPress, {metric: weightMetric}),
    pushJerk: t(LangKeys.pushJerk, {metric: weightMetric}),
    splitJerk: t(LangKeys.splitJerk, {metric: weightMetric}),
    deadLift: t(LangKeys.deadLift, {metric: weightMetric}),
    sumoDeadLift: t(LangKeys.sumoDeadLift, {metric: weightMetric}),
    benchPress: t(LangKeys.benchPress, {metric: weightMetric}),
    cluster: t(LangKeys.cluster, {metric: weightMetric}),
    thruster: t(LangKeys.thruster, {metric: weightMetric}),
  };

  return labels[key] ?? '';
};

export const getTrackerKeys = (trackerType: StorageKeys) => {
  const trackerKey = {
    [StorageKeys.BODY_SIZES]: [
      'gender',
      'hip',
      'height',
      'weight',
      'arm',
      'leg',
      'neck',
      'waist',
    ],
    [StorageKeys.CALORIE_COUNTER]: ['calorie'],
    [StorageKeys.HERO_WOD]: [
      'amanda',
      'barbara',
      'chelsea',
      'cindy',
      'diane',
      'elizabeth',
      'fran',
      'grace',
      'isabel',
      'jackie',
      'karen',
      'kelly',
      'mary',
      'murph',
      'nancy',
    ],
    [StorageKeys.PR_BOARD]: [
      'powerClean',
      'squatClean',
      'muscleClean',
      'powerSnatch',
      'squatSnatch',
      'muscleSnatch',
      'backSquat',
      'frontSquat',
      'overheadSquat',
      'cleanJerk',
      'strictPress',
      'pushPress',
      'pushJerk',
      'splitJerk',
      'deadLift',
      'sumoDeadLift',
      'benchPress',
      'cluster',
      'thruster',
    ],
  };
  return trackerKey[trackerType];
};
