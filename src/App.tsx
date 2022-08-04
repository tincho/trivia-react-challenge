import React, { useContext } from 'react';
import { AppProvider, AppContext, ScreenType } from '@/application/appContext';

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
  const { screen } = useContext(AppContext);
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
