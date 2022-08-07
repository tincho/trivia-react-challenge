import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { AppProvider, ResultsType, useAppContext } from './appContext';

describe('appContext', () => {
  test('should povide default options', () => {
    function FakeConsumer() {
      const appCtx = useAppContext();
      expect(appCtx).toMatchObject({
        questionsCount: 10,
        questionsType: 'boolean',
        screen: 'home',
      });
      return null;
    }

    render(
      <AppProvider>
        <FakeConsumer />
      </AppProvider>,
    );
  });

  test('should set screen: quiz onBegin', () => {
    function FakeConsumer({ updated }: { updated: (value: string) => void }) {
      const appCtx = useAppContext();
      useEffect(() => {
        appCtx.onBegin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        if (appCtx.screen === 'quiz') {
          updated(appCtx.screen);
        }
      }, [appCtx.screen, updated]);
      return null;
    }

    const onUpdate = jest.fn();
    render(
      <AppProvider>
        <FakeConsumer updated={onUpdate} />
      </AppProvider>,
    );
    expect(onUpdate).toHaveBeenCalledWith('quiz');
  });

  test('should set screen: quiz onReset', () => {
    function FakeConsumer({ updated }: { updated: (value: string) => void }) {
      const [resetted, setResetted] = useState(false);
      const appCtx = useAppContext();
      useEffect(() => {
        appCtx.onBegin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        if (appCtx.screen === 'quiz') {
          setResetted(true);
          appCtx.onReset();
        }
        if (resetted) {
          updated(appCtx.screen);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [appCtx.screen, resetted, setResetted, updated]);
      return null;
    }

    const onUpdate = jest.fn();
    render(
      <AppProvider>
        <FakeConsumer updated={onUpdate} />
      </AppProvider>,
    );
    expect(onUpdate).toHaveBeenCalledWith('home');
  });

  test('should set quizResults onEnd', () => {
    const fakeResults = {
      questions: ['one', 'two'],
      answers: ['True', 'False'],
      answeredCorrectly: [1],
      answeredIncorrectly: [0],
    };

    function FakeConsumer({ updated }: { updated: (results: ResultsType) => void }) {
      const appCtx = useAppContext();
      useEffect(() => {
        appCtx.onEnd(fakeResults);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      useEffect(() => {
        if (Object.values(appCtx.quizResults)) {
          updated(appCtx.quizResults);
        }
      }, [appCtx.quizResults, updated]);
      return null;
    }
    const onUpdate = jest.fn();
    render(
      <AppProvider>
        <FakeConsumer updated={onUpdate} />
      </AppProvider>,
    );
    expect(onUpdate).toBeCalledWith(fakeResults);
  });
});
