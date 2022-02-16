import MainPage from '../../pages/main-page';

type PropsType = {
  placesCount: number,
}

export default function App({placesCount}: PropsType): JSX.Element {
  return <MainPage placesCount={placesCount} />;
}
