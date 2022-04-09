import { useSelector } from 'react-redux';
import { initialStateType } from '../../store/reducer';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useSelector((state: initialStateType) => state.error);

  if (error) {
    return (
      <div className='error'>
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
