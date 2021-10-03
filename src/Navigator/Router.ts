import {StackActions} from '@react-navigation/native';
import {navigationRef} from './Navigator';
import {
  AmrapSceneProps,
  CombineProps,
  CreateCombineStepTwoProps,
  EmomSceneProps,
  ForTimeSceneProps,
  NotificationDetailProps,
  ReminderProps,
  TabataProps,
  TrackerDetailProps,
  TrackerProps,
  WorkoutLogProps,
} from './NavigatorTypes';
class Router {
  static navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
  }

  static Pop() {
    navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
  }

  static Home() {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }

  static Workout() {
    Router.navigate('Workout');
  }

  static CreateAmrapScene() {
    Router.navigate('CreateAmrapScene');
  }

  static CreateEmomScene() {
    Router.navigate('CreateEmomScene');
  }

  static CreateTabata() {
    Router.navigate('CreateTabata');
  }

  static CreateForTimeScene() {
    Router.navigate('CreateForTimeScene');
  }

  static CreateCombine() {
    Router.navigate('CreateCombine');
  }

  static CreateCombineStepTwo(passProps: CreateCombineStepTwoProps) {
    Router.navigate('CreateCombineStepTwo', passProps);
  }

  static AmrapScene(passProps: AmrapSceneProps) {
    Router.navigate('AmrapScene', passProps);
  }

  static EmomScene(passProps: EmomSceneProps) {
    Router.navigate('EmomScene', passProps);
  }

  static Tabata(passProps: TabataProps) {
    Router.navigate('Tabata', passProps);
  }

  static ForTimeScene(passProps: ForTimeSceneProps) {
    Router.navigate('ForTimeScene', passProps);
  }

  static Combine(passProps: CombineProps) {
    Router.navigate('Combine', passProps);
  }

  static Tracker(passProps?: TrackerProps) {
    Router.navigate('Tracker', passProps);
  }

  static TrackerDetail(passProps: TrackerDetailProps) {
    Router.navigate('TrackerDetail', passProps);
  }

  static WorkoutLog(passProps: WorkoutLogProps) {
    Router.navigate('WorkoutLog', passProps);
  }

  static WorkoutLogList() {
    Router.navigate('WorkoutLogList');
  }

  static EditBodySizeTracker() {
    Router.navigate('EditBodySizeTracker');
  }

  static EditHeroWodTracker() {
    Router.navigate('EditHeroWodTracker');
  }

  static EditPrBoardTracker() {
    Router.navigate('EditPrBoardTracker');
  }

  static EditCalorieCounterTracker() {
    Router.navigate('EditCalorieCounterTracker');
  }

  static Reminder(passProps?: ReminderProps) {
    Router.navigate('Reminder', passProps);
  }

  static AddMealReminder() {
    Router.navigate('AddMealReminder');
  }

  static AddWaterReminder() {
    Router.navigate('AddWaterReminder');
  }

  static AddCheatMealReminder() {
    Router.navigate('AddCheatMealReminder');
  }

  static NotificationDetail(passProps: NotificationDetailProps) {
    Router.navigate('NotificationDetail', passProps);
  }

  static Settings() {
    Router.navigate('Settings');
  }

  static ChangeBackground() {
    Router.navigate('ChangeBackground');
  }

  static HeroWodDetails() {
    Router.navigate('HeroWodDetails');
  }
}
export default Router;
