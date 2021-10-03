import {StackScreenProps} from '@react-navigation/stack';
import {StorageKeys} from '~/Helpers/AsyncStorageHelper';
import {WorkoutType} from '~/Helpers/Enums';
import {ReminderType} from '~/Helpers/ReminderHelper';
import {WorkoutLogType} from '~/Helpers/WorkoutHelper';
import {AmrapWorkoutType} from '~/Screens/CreateAmrap';
import {EmomWorkoutType} from '~/Screens/CreateEmom';
import {ForTimeWorkoutType} from '~/Screens/CreateForTime';
import {TabataWorkoutType} from '~/Screens/CreateTabata';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Workout: undefined;
  CreateAmrapScene: undefined;
  CreateTabata: undefined;
  CreateEmomScene: undefined;
  CreateForTimeScene: undefined;
  CreateCombine: undefined;
  CreateCombineStepTwo: CreateCombineStepTwoProps;
  AmrapScene: AmrapSceneProps;
  Tabata: TabataProps;
  EmomScene: EmomSceneProps;
  ForTimeScene: ForTimeSceneProps;
  Combine: CombineProps;
  Tracker: TrackerProps;
  TrackerDetail: TrackerDetailProps;
  WorkoutLog: WorkoutLogProps;
  WorkoutLogList: undefined;
  EditBodySizeTracker: undefined;
  EditCalorieCounterTracker: undefined;
  EditHeroWodTracker: undefined;
  EditPrBoardTracker: undefined;
  Reminder: ReminderProps;
  AddMealReminder: undefined;
  AddWaterReminder: undefined;
  AddCheatMealReminder: undefined;
  NotificationDetail: NotificationDetailProps;
  Settings: undefined;
  ChangeBackground: undefined;
  HeroWodDetails: undefined;
};

export type ReminderProps = {
  shouldRefresh?: boolean;
};

export type TrackerProps = {
  shouldRefresh?: boolean;
};

export type AmrapSceneProps = {
  workoutList: AmrapWorkoutType[];
  onCombineWorkoutFinish?: () => void;
  restTime?: number;
  initialPlay?: boolean;
};

export type CreateCombineStepTwoProps = {
  combineList: WorkoutType[];
};

export type EmomSceneProps = {
  workoutData: EmomWorkoutType;
  onCombineWorkoutFinish?: () => void;
  restTime?: number;
  initialPlay?: boolean;
};

export type TabataProps = {
  workoutData: TabataWorkoutType;
};

export type ForTimeSceneProps = {
  workoutData: ForTimeWorkoutType;
  onCombineWorkoutFinish?: () => void;
  restTime?: number;
  initialPlay?: boolean;
};

export type CombineProps = {
  combineList: WorkoutType[];
  amrapWorkoutData?: AmrapSceneProps;
  forTimeWorkoutData?: ForTimeSceneProps;
  emomWorkoutData?: EmomSceneProps;
  combineFirstRest: number;
  combineSecondRest?: number;
};

export type TrackerDetailProps = {
  storageKey: StorageKeys;
  title: string;
  workoutType: WorkoutType;
};

export type WorkoutLogProps = {
  workoutLog: WorkoutLogType;
};

export type NotificationDetailProps = {
  message: string;
  date: Date;
  type: ReminderType;
  detail?: string;
  format?: string;
};

export type DefaultNavigationProps<
  T extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, T>;
