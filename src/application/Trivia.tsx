import { AppProvider, ScreenType, useAppContext } from '@/application/appContext';

import Home from '@/components/Home';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';

import './Trivia.css';

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

export default function Trivia() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
