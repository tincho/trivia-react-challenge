import { useContext } from 'react';
import { AppContext } from '@/application/appContext';

export default function ErrorMessage({ message }: { message?: string }) {
  const { onReset } = useContext(AppContext);
  return (
    <div>
      <h2>An error has occurred</h2>
      <pre>{message}</pre>
      <button type="button" onClick={onReset}>
        Go back Home
      </button>
    </div>
  );
}
ErrorMessage.defaultProps = {
  message: '',
};
