import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultNavigationProps} from '~/Navigator/NavigatorTypes';
import Container from '~/Components/Container';
import {useStyle} from '~/Theme/ThemeHelper';
import Button from '~/Components/Button';
import Router from '~/Navigator/Router';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import IconButton from '~/Components/IconButton';
import IconType from '~/Styles/IconType';
import {Icon, Text} from '@ui-kitten/components';

const Home: React.FC<DefaultNavigationProps<'Home'>> = () => {
  const {layoutStyles} = useStyle();
  const {t} = useTranslation();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 16,
    },
  });

  return (
    <Container
      bgType="video"
      style={[
        styles.container,
        layoutStyles.horizontalPadding,
        layoutStyles.bottomPadding,
      ]}>
      <View style={styles.logoContainer}>
        <Icon name={IconType.Logo} size={60} color={'white'} />
      </View>
      <Button
        style={layoutStyles.marginTopBase}
        label={
          <Text category="h4">
            <Text category="h4" appearance="light">
              TI
            </Text>
            MER
          </Text>
        }
        onPress={() => Router.Workout()}
      />
      <Button
        style={layoutStyles.marginTopBase}
        label={
          <Text category="h4">
            TRA
            <Text category="h4" appearance="light">
              CKE
            </Text>
            R
          </Text>
        }
        onPress={() => Router.Tracker()}
      />
      <Button
        style={layoutStyles.marginTopBase}
        label={
          <Text category="h4">
            REMIND
            <Text category="h4" appearance="light">
              ER
            </Text>
          </Text>
        }
        onPress={Router.Reminder}
      />
      <IconButton
        style={[layoutStyles.justifyCenter, layoutStyles.marginTopBase]}
        label={t(LangKeys.workoutLog)}
        icon={IconType.Document}
        onPress={() => Router.WorkoutLogList()}
      />
    </Container>
  );
};
export default Home;
