import React, {createContext, ReactElement} from 'react';

export enum Metrics {
  EUROPE,
  USA,
}

type SettingsValues = {
  activeBackgroundIndex: number;
  setActiveBackgroundIndex: (index: number) => void;
  selectedMetrics: Metrics;
  setSelectedMetrics: (metric: Metrics) => void;
};

const SettingsContext = createContext<SettingsValues>({
  activeBackgroundIndex: 0,
  setActiveBackgroundIndex: () => {},
  selectedMetrics: 0,
  setSelectedMetrics: () => {},
});

export const SettingsProvider = ({children}: {children: ReactElement}) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [selectedMetric, setSelectedMetric] = React.useState<Metrics>(
    Metrics.EUROPE,
  );

  return (
    <SettingsContext.Provider
      value={{
        activeBackgroundIndex: activeIndex,
        setActiveBackgroundIndex: (index: number) => {
          setActiveIndex(index);
        },
        selectedMetrics: selectedMetric,
        setSelectedMetrics: (metric: Metrics) => {
          setSelectedMetric(metric);
        },
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
