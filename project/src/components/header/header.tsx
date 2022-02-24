import Logo from '../logo/logo';

type PropsType = {
  children?: JSX.Element;
}

export default function Header({children}: PropsType): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          {children}
        </div>
      </div>
    </header>
  );
}
