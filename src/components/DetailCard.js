import * as dayjs from 'dayjs';

const DetailCard = ({ weather_icon, data }) => {

    const { clouds, main, weather } = data.list[0];    

    return (
        <div className='container p-4 grid grid-cols-2 divide-x divide-gray-400 items-start shadow-2xl rounded-lg bg-white h-1/3 mb-auto'>
            <div className='my-auto'>
                <p className='font-bol text-5xl text-gray-600 mb-2'>{Math.round(main.temp)}&deg;C</p>
                <p className='text-4xl text-gray-800 tracking-widest'>
                    {weather[0].main}
                    <img src={weather_icon} className="w-1/4 inline" />
                </p>
                <p className='text-gray-400 text-xs uppercase tracking-widest'>
                    {weather[0].description}
                </p>
                <p className='tracking-wider'>{dayjs().format("dddd MMM YYYY")}</p>
            </div>
            <div className='my-2 border-1-2 border-gray-100 p-2'>
                <p className='text-gray-400 text-lg'>ReelFeel: {Math.round(main.feels_like)}&deg;C</p>
                <p className='text-gray-400 text-lg'>Humidity: {main.humidity}%</p>
                <p className='text-gray-400 text-lg'>Cloud Cover: {clouds.all}%</p>
                <p className='text-gray-400 text-lg'>Min Temp: {Math.round(main.temp_min)}&deg;C</p>
                <p className='text-gray-400 text-lg'>Max Temp: {Math.round(main.temp_max)}&deg;C</p>
            </div>
        </div>
    )
}

export default DetailCard