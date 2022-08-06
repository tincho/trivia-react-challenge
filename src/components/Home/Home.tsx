import { useAppContext } from '@/application/appContext';

import './Home.css';

export default function Home() {
  const { onBegin } = useAppContext();

  return (
    <div className="home">
      <h1>Welcome to the Trivia Challenge!</h1>
      <p>You will be presented with 10 True or False Questions.</p>
      <p>Can you score 100%?</p>
      <button type="button" onClick={onBegin}>
        BEGIN
      </button>
    </div>
  );
}
