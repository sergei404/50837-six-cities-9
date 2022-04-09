import {useRef, FormEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorizationAction } from '../../store/api-action';
import { AuthData } from '../../types/auth-data';
import { Link } from 'react-router-dom';
import { initialStateType } from '../../store/reducer';
import { getCityAction } from '../../store/action';

function SingIn(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch =  useDispatch();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const cities = useSelector((state: initialStateType) => state.cityList);

  const city = cities[Math.floor(Math.random() * cities.length)];
  const handleCity = () => {
    dispatch(getCityAction(city));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,}$/ig;

    if (emailRef.current !== null && passwordRef.current !== null && passwordRef.current.value.replace(/ /, '').match(pattern)) {

      const authData: AuthData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(authorizationAction(authData));

      emailRef.current.value = '';
      passwordRef.current.value = '';

    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" onSubmit={handleSubmit} method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={emailRef} required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password"  ref={passwordRef} required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link onClick={handleCity} className="locations__item-link" to={'/'}>
              <span>{city}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SingIn;
