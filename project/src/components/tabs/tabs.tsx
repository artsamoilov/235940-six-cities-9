import {CityName} from '../../const';
import Tab from '../tab/tab';
import {memo} from 'react';

function Tabs(): JSX.Element {
  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          <Tab cityName={CityName.Paris}/>
          <Tab cityName={CityName.Cologne}/>
          <Tab cityName={CityName.Brussels}/>
          <Tab cityName={CityName.Amsterdam}/>
          <Tab cityName={CityName.Hamburg}/>
          <Tab cityName={CityName.Dusseldorf}/>
        </ul>
      </section>
    </div>
  );
}

export default memo(Tabs);
