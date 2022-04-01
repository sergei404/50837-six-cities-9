import { useSelector } from 'react-redux';
import { initialStateType } from '../../store/reducer';

function ErrorMessage(): JSX.Element | null {
  const error = useSelector((state: initialStateType) => state.error);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          padding: '10px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
