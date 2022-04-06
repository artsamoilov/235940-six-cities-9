import {useRef, FormEvent} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {toast} from 'react-toastify';
import Header from '../../components/header/header';
import LoginLocation from '../../components/login-location/login-location';

const emailRegExp = new RegExp(/^\S+@\S+\.\S+$/);
const passwordRegExp = new RegExp(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/);

export default function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailValid = () => emailRef.current && emailRegExp.test(emailRef.current.value);
  const isPasswordValid = () => passwordRef.current && passwordRegExp.test(passwordRef.current.value);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    if (emailRef.current !== null && passwordRef.current !== null) {
      evt.preventDefault();

      if (!isEmailValid()) {
        toast.warn('Email address must be correct');
        emailRef.current.select();
        emailRef.current.focus();
      }

      if (!isPasswordValid()) {
        toast.warn('Password must contain at least 1 digit and 1 letter');
        passwordRef.current.select();
        passwordRef.current.focus();
      }

      if (isEmailValid() && isPasswordValid()) {
        dispatch(loginAction({email: emailRef.current.value, password: passwordRef.current.value}));
        navigate(AppRoute.Main);
      }
    }
  };

  return (
    <div className='page page--gray page--login'>
      <Header />
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' action='' method='post' onSubmit={handleFormSubmit}>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input ref={emailRef} className='login__input form__input' type='email' name='email' placeholder='Email' required />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input ref={passwordRef} className='login__input form__input' type='password' name='password' placeholder='Password' required />
              </div>
              <button className='login__submit form__submit button' type='submit'>Sign in</button>
            </form>
          </section>
          <LoginLocation />
        </div>
      </main>
    </div>
  );
}
