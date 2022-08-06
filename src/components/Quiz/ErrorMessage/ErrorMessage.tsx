type ErrorMessageProps = {
  message?: string;
  goHome?: () => void;
};

export default function ErrorMessage({ message, goHome }: ErrorMessageProps) {
  return (
    <div>
      <h2>An error has occurred</h2>
      <pre>{message}</pre>
      <button type="button" onClick={goHome}>
        Go back Home
      </button>
    </div>
  );
}
ErrorMessage.defaultProps = {
  message: '',
  goHome: () => {},
};
