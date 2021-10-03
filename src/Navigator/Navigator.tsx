import React, {
  useContext,
  useState,
} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Home from '~/Screens/Home';
import NavigatorContext from '../Context/NavigatorContext';
import Splash from '~/Screens/Splash';
import {DefaultHeaderStyle} from './NavigatorHelper';
import {Platform, Pressable, View} from 'react-native';
import Workout from '~/Screens/Workout';
import CreateAmrapScene from '~/Screens/CreateAmrapScene';
import CreateCombine from '~/Screens/CreateCombine';
import CreateTabata from '~/Screens/CreateTabata';
import CreateEmomScene from '~/Screens/CreateEmomScene';
import CreateForTimeScene from '~/Screens/CreateForTimeScene';
import ForTimeScene from '~/Screens/ForTimeScene';
import AmrapScene from '~/Screens/AmrapScene';
import Tabata from '~/Screens/Tabata';
import Combine from '~/Screens/Combine';
import EmomScene from '~/Screens/EmomScene';
import CreateCombineStepTwo from '~/Screens/CreateCombineStepTwo';
import Tracker from '~/Screens/Tracker';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import TrackerDetail from '~/Screens/TrackerDetail';
import WorkoutLog from '~/Screens/WorkoutLog';
import WorkoutLogList from '~/Screens/WorkoutLogList';
import EditBodySizeTracker from '~/Screens/EditBodySizeTracker';
import EditHeroWodTracker from '~/Screens/EditHeroWodTracker';
import EditPrBoardTracker from '~/Screens/EditPrBoardTracker';
import EditCalorieCounterTracker from '~/Screens/EditCalorieCounterTracker';
import Reminder from '~/Screens/Reminder';
import AddWaterReminder from '~/Screens/AddWaterReminder';
import AddMealReminder from '~/Screens/AddMealReminder';
import NotificationDetail from '~/Screens/NotificationDetail';
import Settings from '~/Screens/Settings';
import ChangeBackground from '~/Screens/ChangeBackground';
import AddCheatMealReminder from '~/Screens/AddCheatMealReminder';
import HeroWodDetails from '~/Screens/HeroWodDetails';
import {Icon} from '@ui-kitten/components';
import Router from './Router';
import IconType from '~/Styles/IconType';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
const Stack = createStackNavigator();

function PostLoginStack() {
  const {t} = useTranslation();
  const [shouldHideBanner, setShouldHideBanner] = useState<boolean>(true);
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'ios'
    ? 'ca-app-pub-5032928823163437/4336296642'
    : 'ca-app-pub-5032928823163437/4911011710';
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          ...DefaultHeaderStyle(),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: ' ',
            headerRight: () => (
              <Pressable
                hitSlop={10}
                onPress={Router.Settings}
                style={{marginRight: 16}}>
                <Icon name={IconType.Settings} size={25} color={'white'} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Workout"
          component={Workout}
          options={{
            headerTitle: ' ',
          }}
        />
        <Stack.Screen name="CreateAmrapScene" component={CreateAmrapScene} />
        <Stack.Screen name="CreateCombine" component={CreateCombine} />
        <Stack.Screen
          name="CreateCombineStepTwo"
          component={CreateCombineStepTwo}
        />
        <Stack.Screen name="CreateTabata" component={CreateTabata} />
        <Stack.Screen name="CreateEmomScene" component={CreateEmomScene} />
        <Stack.Screen
          name="CreateForTimeScene"
          component={CreateForTimeScene}
        />
        <Stack.Screen name="AmrapScene" component={AmrapScene} />
        <Stack.Screen name="ForTimeScene" component={ForTimeScene} />
        <Stack.Screen name="Tabata" component={Tabata} />
        <Stack.Screen name="Combine" component={Combine} />
        <Stack.Screen name="EmomScene" component={EmomScene} />
        <Stack.Screen name="WorkoutLog" component={WorkoutLog} />
        <Stack.Screen name="WorkoutLogList" component={WorkoutLogList} />
        <Stack.Screen
          name="EditHeroWodTracker"
          component={EditHeroWodTracker}
          options={{
            headerRight: () => (
              <Pressable
                hitSlop={10}
                onPress={Router.HeroWodDetails}
                style={{marginRight: 16}}>
                <Icon name={IconType.Info} size={25} color={'white'} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="EditPrBoardTracker"
          component={EditPrBoardTracker}
        />
        <Stack.Screen name="AddMealReminder" component={AddMealReminder} />
        <Stack.Screen name="AddWaterReminder" component={AddWaterReminder} />
        <Stack.Screen name="HeroWodDetails" component={HeroWodDetails} />
        <Stack.Screen
          name="AddCheatMealReminder"
          component={AddCheatMealReminder}
        />
        <Stack.Screen
          name="NotificationDetail"
          component={NotificationDetail}
        />
        <Stack.Screen name="ChangeBackground" component={ChangeBackground} />
        <Stack.Screen name="Reminder" component={Reminder} />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: t(LangKeys.settings),
          }}
        />

        <Stack.Screen
          name="EditCalorieCounterTracker"
          component={EditCalorieCounterTracker}
        />

        <Stack.Screen
          name="EditBodySizeTracker"
          component={EditBodySizeTracker}
        />

        <Stack.Screen name="Tracker" component={Tracker} />
        <Stack.Screen name="TrackerDetail" component={TrackerDetail} />
      </Stack.Navigator>

      <View style={{display: shouldHideBanner ? 'none' : 'flex'}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ADAPTIVE_BANNER}
          onAdOpened={() => console.log('onAdOpened')}
          onAdClosed={() => console.log('onAdClosed')}
          onAdFailedToLoad={(error) => {
            console.log('onAdFailedToLoad');
          }}
          onAdLoaded={() => {
            console.log('onAdLoaded');
            setShouldHideBanner(false);
          }}
          onAdLeftApplication={() => console.log('onAdLeftApplication')}
        />
      </View>
    </>
  );
}

const RootStack = createStackNavigator();

function RootStackScreen() {
  const {activeStack} = useContext(NavigatorContext);
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{animationEnabled: false, headerBackTitle: ' '}}
      mode="modal">
      {activeStack === 'splash' ? (
        <RootStack.Screen name="Splash" component={Splash} />
      ) : (
        <RootStack.Screen name="PostLoginStack" component={PostLoginStack} />
      )}
    </RootStack.Navigator>
  );
}

export const navigationRef = React.createRef<NavigationContainerRef>();

export const Navigator = () => {
  const {activeStack} = useContext(NavigatorContext);

  return (
    <NavigationContainer
      ref={navigationRef}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
