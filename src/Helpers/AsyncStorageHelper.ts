import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Metrics} from '~/Context/SettingsContext';
import {Language} from '~/Utils/i18n';
import {StorageWorkoutLogType} from './WorkoutHelper';

export enum StorageKeys {
  BODY_SIZES = 'BODY_SIZES',
  CALORIE_COUNTER = 'CALORIE_COUNTER',
  WORKOUT_LOG = 'WORKOUT_LOG',
  HERO_WOD = 'HERO_WOD',
  PR_BOARD = 'PR_BOARD',
  LANGUAGE = 'LANGUAGE',
  SOUND_PREFERENCE = 'SOUND_PREFERENCE',
  COUNTDOWN_TIME_PREFERENCE = 'COUNTDOWN_TIME_PREFERENCE',
  BACKGROUND_PREFERENCE = 'BACKGROUND_PREFERENCE',
  METRIC_PREFERENCE = 'METRIC_PREFERENCE',
}

export const setItemToStorage = (key: StorageKeys, value: any) => {
  return new Promise<void>((res, rej) => {
    AsyncStorage.getItem(key).then((data) => {
      let response = JSON.parse(data ?? '{}');
      if (!response.data) {
        response.data = [];
      }
      value.date = moment().format('DD.MM.YYYY HH:mm:ss');
      response.data = [value, ...response.data];
      AsyncStorage.setItem(key, JSON.stringify(response)).then(res).catch(rej);
    });
  });
};

export const getItemFromStorage = (key: StorageKeys) => {
  return new Promise<any>((res) => {
    let response = {};
    AsyncStorage.getItem(key)
      .then((data) => {
        response = JSON.parse(data ?? '{}');
      })
      .finally(() => res(response));
  });
};

export const removeMultiDataFromStorage = (keys: StorageKeys[]) => {
  return new Promise((res, rej) => {
    AsyncStorage.multiRemove(keys).then(res).catch(rej);
  });
};

export const removeAllData = () => {
  return new Promise((res, rej) => {
    AsyncStorage.clear().then(res).catch(rej);
  });
};

export const getWorkoutLog = () => {
  return new Promise<StorageWorkoutLogType>((res) => {
    let response = {};
    AsyncStorage.getItem(StorageKeys.WORKOUT_LOG)
      .then((data) => {
        response = JSON.parse(data ?? '{}');
      })
      .finally(() => res(response));
  });
};

export const setWorkoutLog = (workoutLog: any) => {
  return new Promise<void>((res, rej) => {
    AsyncStorage.getItem(StorageKeys.WORKOUT_LOG).then((data) => {
      let response = JSON.parse(data ?? '{}');
      if (!response.data) {
        response.data = [];
      }
      response.data = [workoutLog, ...response.data];
      AsyncStorage.setItem(StorageKeys.WORKOUT_LOG, JSON.stringify(response))
        .then(res)
        .catch(rej);
    });
  });
};

export const getLanguage = async () => {
  return new Promise<Language>((res, rej) => {
    AsyncStorage.getItem(StorageKeys.LANGUAGE).then(res).catch(rej);
  });
};

export const setLanguage = (language: Language) => {
  AsyncStorage.setItem(StorageKeys.LANGUAGE, language);
};

export const getSoundPreference = async () => {
  return new Promise<boolean>((res) => {
    AsyncStorage.getItem(StorageKeys.SOUND_PREFERENCE)
      .then((data) => {
        let val = JSON.parse(data ?? 'true');
        val = !!val;
        res(val);
      })
      .catch(() => res(true));
  });
};

export const setSoundPreferenceSettings = (isEnabled: boolean) => {
  AsyncStorage.setItem(StorageKeys.SOUND_PREFERENCE, JSON.stringify(isEnabled));
};

export const getCountdownTimePreference = async () => {
  return new Promise<number>((res) => {
    AsyncStorage.getItem(StorageKeys.COUNTDOWN_TIME_PREFERENCE)
      .then((data) => {
        let val = parseInt(data ?? '0', 10);
        res(val);
      })
      .catch(() => res(0));
  });
};

export const setCountdownTimePreference = (time: number) => {
  AsyncStorage.setItem(StorageKeys.COUNTDOWN_TIME_PREFERENCE, time.toString());
};

export const getBackgroundPreference = async () => {
  return new Promise<number>((res) => {
    AsyncStorage.getItem(StorageKeys.BACKGROUND_PREFERENCE)
      .then((data) => {
        let val = parseInt(data ?? '0', 10);
        val = val ?? 0;
        res(val);
      })
      .catch(() => res(0));
  });
};

export const setBackgroundPreference = (index: number) => {
  AsyncStorage.setItem(StorageKeys.BACKGROUND_PREFERENCE, index.toString());
};

export const getMetricPreference = async () => {
  return new Promise<Metrics>((res) => {
    AsyncStorage.getItem(StorageKeys.METRIC_PREFERENCE)
      .then((data) => {
        let val = parseInt(data ?? '0', 10);
        val = val ?? Metrics.EUROPE;
        res(val as Metrics);
      })
      .catch(() => res(Metrics.EUROPE));
  });
};

export const setMetricPreference = (metric: Metrics) => {
  AsyncStorage.setItem(StorageKeys.METRIC_PREFERENCE, metric.toString());
};
