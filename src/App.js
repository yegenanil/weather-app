import { useState } from 'react';
import DetailCard from './components/DetailCard';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [noData, setNoData] = useState("No Data Yet");
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('Unknown location');
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getWeather(search);
  }

  const getWeather = async (location) => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&cnt=5`)
    let data = await res.json();
    if (data.cod !== "200") {
      setNoData('Location Not Found')
      return
    }
    setWeatherData(data);
    setCity(`${data.city.name}, ${data.city.country}`);
    setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`);
  }    

  return (
    <div className="main-container  flex items-center justify-center w-screen h-screen py-10">
      <div className='flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100'>
        <div className='form-container bg-cloud'>
          <div className='flex items-center justify-center'>  
            <h3 className='my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30'>
              Forecast</h3>
            <div className='flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg'>
              <i className='fa fa-map my-auto' aria-hidden="true"></i>
              <div className="text-right">
                <p className='font-semibold text-sm ml-2'>{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className='text-white text-2xl'>Weather Forecast App</h1>
            <hr className='h-1 bg-white w-1/4 rounded-full my-5' />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center  w-full">
              <input
                className='input relative rounded-xl py-2 px-3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200'
                onChange={handleChange}
                value={search}
                required
              />
              <button type="submit" className='z-10' />

            </form>
          </div>
        </div>

        <div className='w-2/4 p-5'>
          <Header />
          <div className='flex flex-col my-10'>
            {weatherData.length === 0 ?
              <div className='container p-4 flex items-center justify-center h-1/3 mb-auto'>
                <h1 className='text-gray-300 text-4xl font-bold uppercase'>{noData}</h1>
              </div> :
              <>
                <h1 className='text-5xl text-gray-800 mt-auto mb-4'>Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className='text-3xl text-gray-600 mb-4 mt-10'>More on {city}</h1>
                <ul className='grid grid-cols-2 gap-2'>
                  {weatherData.list.map((day, index) => {
                    if (index > 0) {
                      return (<SummaryCard key={index} day={day} />)
                    }
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
