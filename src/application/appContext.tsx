import React, { createContext, useContext, useMemo, useState } from 'react';

export type ScreenType = 'home' | 'quiz' | 'results';

export type ResultsType = {
  answeredCorrectly: number[];
  answeredIncorrectly: number[];
  questions: string[];
  answers: string[];
};

export type AppContextType = {
  questionsCount: number;
  questionsType?: 'boolean' | 'multiple';
  screen: ScreenType;
  quizResults: ResultsType;
  onBegin: () => void;
  onEnd: (results: ResultsType) => void;
  onReset: () => void;
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [quizResults, setQuizResults] = useState<ResultsType>({} as ResultsType);
  const ctx = useMemo(
    () => ({
      questionsCount: 10,
      questionsType: 'boolean' as const,
      screen,
      quizResults,
      onBegin: () => {
        setScreen('quiz');
      },
      onEnd: (results: ResultsType) => {
        setScreen('results');
        setQuizResults(results);
      },
      onReset: () => {
        setScreen('home');
      },
    }),
    [screen, quizResults],
  );

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
