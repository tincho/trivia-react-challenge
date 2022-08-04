import React, { createContext, useMemo, useState } from 'react';

export type ScreenType = 'home' | 'quiz' | 'results';

export type AppContextType = {
  screen: ScreenType;
  onBegin: () => void;
  onEnd: () => void;
  onReset: () => void;
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [screen, setScreen] = useState<ScreenType>('home');
  const ctx = useMemo(
    () => ({
      screen,
      onBegin: () => {
        setScreen('quiz');
      },
      onEnd: () => {
        setScreen('results');
      },
      onReset: () => {
        setScreen('home');
      },
    }),
    [screen],
  );

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export default AppContext;
