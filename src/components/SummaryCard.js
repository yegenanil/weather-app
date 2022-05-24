import * as dayjs from 'dayjs';
import getIconUrl from '../utils/IconUrl';

const SummaryCard = ({ day }) => {
    const weather = day.weather[0];
    const dayIcon = getIconUrl(weather["icon"])
    
    return (
        <li className="container p-4 flex items-start justify-start bg-white shadow-xl rounded-xl my-auto mr-1">
            <div className="my-auto">
                <p className="font-bold text-3xl text-gray-600 mb-2">{Math.round(day.main.temp)}&deg;C</p>
                <p className="text-2xl text-gray-800 tracking-widest">
                    {weather.main}
                    <img src={dayIcon} className="w-1/4 inline" />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">
                    {weather.description}
                </p>
                <p className="trackig-wider">{dayjs(day.dt_txt).format('dddd hh:mm')}am</p>
            </div>
        </li>
    )
}

export default SummaryCard