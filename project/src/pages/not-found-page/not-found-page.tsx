import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

export default function NotFoundPage() {
  return (
    <div className='page page--gray'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <Logo />
          </div>
        </div>
      </header>

      <main>
        <div className='container'>
          <section style={{paddingTop: '19.6vh', paddingLeft: '13px'}}>
            <h1 style={{fontStyle: 'italic'}}>404<br />Not Found</h1>
            <p>
              Return to <Link to='/'>main page</Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
