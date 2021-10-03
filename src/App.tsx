/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createRef, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from './Navigator/Navigator';
import Hud from './Hud/Hud';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ThemeContext, {
  ThemeProvider,
  theme,
  themeMapping,
} from './Theme/ThemeContext';
import {TickeerAppIconPack} from './Styles/IconAdapter';
import {NavigatorProvider} from './Context/NavigatorContext';
import {hudRef} from './Hud/HudHelper';
import NotifService from './NotifService';
import {SettingsProvider} from './Context/SettingsContext';
import SplashScreen from 'react-native-splash-screen';

export let notifRef: any;


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    notifRef = new NotifService(
      () => {},
      () => {},
    );
  }, []);
  return (
    <>
      <IconRegistry icons={TickeerAppIconPack} />
      <StatusBar barStyle="light-content" />
      <ThemeProvider>
        <NavigatorProvider>
          <SettingsProvider>
            <ThemeContext.Consumer>
              {(props) => (
                <ApplicationProvider
                  {...eva}
                  customMapping={themeMapping}
                  theme={{
                    ...eva[props.selectedTheme],
                    ...theme[props.selectedTheme!],
                  }}>
                  <>
                    <Navigator />
                    <Hud ref={hudRef} />
                  </>
                </ApplicationProvider>
              )}
            </ThemeContext.Consumer>
          </SettingsProvider>
        </NavigatorProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
