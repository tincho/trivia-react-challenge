import React from 'react';
import { AppProvider, ScreenType, useAppContext } from '@/application/appContext';

import Home from '@/components/Home';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';

import './App.css';

const screens: Record<ScreenType, React.FunctionComponent> = {
  home: Home,
  quiz: Quiz,
  results: Results,
};

function AppContent() {
  const { screen } = useAppContext();
  const Screen = screens[screen];
  return <Screen />;
}

function App() {
  return (
    <main className="App" data-testid="app">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </main>
  );
}

export default App;
