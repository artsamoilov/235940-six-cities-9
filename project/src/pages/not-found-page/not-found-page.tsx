export default function NotFoundPage() {
  return (
    <div className='page page--gray'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link' href='main.html'>
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className='container'>
          <section style={{paddingTop: '19.6vh', paddingLeft: '13px'}}>
            <h1 style={{fontStyle: 'italic'}}>404<br />Not Found</h1>
            <p>
              Return to <a href='main.html'>main page</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
