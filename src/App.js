import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import DetailCard from './components/DetailCard';
import SummaryCard from './components/SummaryCard';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const { latitude, longitude } = usePosition();
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState('');
  const [bgImgClassName, setbgImgClassName] = useState('bg-sun');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getWeatherData(search);
  }

  const getWeatherData = async (location) => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&cnt=4`);
    let data = await res.json();

    if (data.cod !== "200") {
      const locationErrorDiv = document.querySelector('.location-error');
      locationErrorDiv.classList.remove('opacity-0');

      const formContainerFullScreen = document.querySelector('.form-container');
      formContainerFullScreen.classList.add('show');

      const dataContaninerHide = document.querySelector('.data-show');
      dataContaninerHide.classList.add('hide');

      setTimeout(() => {
        locationErrorDiv.classList.add('opacity-0');
      }, 2500);
      return;
    }

    if (data.cod === '200') {
      const formContainerFullScreen = document.querySelector('.form-container');
      formContainerFullScreen.classList.remove('show');

      const dataContaninerHide = document.querySelector('.data-show');
      dataContaninerHide.classList.remove('hide');
    }

    setWeatherData(data);
    setbgImgClassName(data.list[0].weather[0].main);
  }

  const getWeatherDataLocation = async (lat, lon) => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${API_KEY}&units=metric`);
    let data = await res.json();

    if (data.cod === '200') {
      const hideScreen = document.querySelector('.form-container');
      hideScreen.classList.remove('show');

      const hideOtherScreen = document.querySelector('.data-show');
      hideOtherScreen.classList.remove('hide');
    }

    setWeatherData(data);
    setbgImgClassName(data.list[0].weather[0].main);
  }

  useEffect(() => {
    latitude && longitude && getWeatherDataLocation(latitude, longitude);
  }, [latitude, longitude]);

  switch (bgImgClassName) {
    case 'Clouds':
      setbgImgClassName('bg-cloud')
      break;
    case 'Rain':
      setbgImgClassName('bg-rain')
      break;
    case 'Clear':
      setbgImgClassName('bg-clear')
      break;
    case 'Sun':
      setbgImgClassName('bg-sun')
      break;
  }

  
  return (
    <div className="main-container  flex items-center justify-center max-w-screen min-h-screen py-10">
      <div className='forecast-container flex w-3/4 rounded-3xl shadow-lg bg-gray-100'>
        <div className={`form-container show  ${bgImgClassName}`}>
          <div className='flex items-center justify-center'>
            <h3 className='my-auto mr-auto text-xl text-white font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30'>
              Forecast</h3>
            <div className='flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg'>
              <i className='fa fa-map my-auto' aria-hidden="true"></i>
              <div className="text-right">
                {weatherData && <p className='font-semibold text-sm ml-2'>{weatherData.city.name}, {weatherData.city.country}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-full ">
            <h1 className='text-white text-2xl'>Weather Forecast</h1>
            <hr className='h-1 bg-white w-1/4 rounded-full my-5' />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center  w-full">
              <input
                className='input relative rounded-xl py-2 px-3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
              />
              <button type="submit" className='z-10' />
            </form>
            <p className='location-error flex items-center transition-all font-bold text-xl drop-shadow-sm justify-center mt-6 text-red-600 opacity-0'>Location not found</p>
          </div>
        </div>
        <div className='data-show hide  w-2/4 p-5'>
          <div className='flex flex-col'>
            {weatherData &&
              <>
                <h1 className='text-5xl text-gray-700 mb-4'>Today{weatherData.length}</h1>
                <DetailCard data={weatherData} />
                <h1 className='text-3xl text-gray-700 mb-4 mt-10'>More on {weatherData.city.name}</h1>
                <ul className='grid grid-cols-2 gap-2'>
                  {weatherData.list.map((day, index) => {
                    return (<SummaryCard key={index} day={day} />)
                  })}
                </ul>
              </>
            }
          </div>
        </div>
      </div >
    </div >
  );
}

export default App;
