import Container from '@/components/Container';
import { defaultValues, convertKelvinToCelsius } from '@utils';
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
    const {
        weatherIcon = defaultValues.weatherIcon,
        date = defaultValues.date,
        day = defaultValues.day,
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
    } = props;
    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <div className='flex flex-col gap-1 items-center'>
                    <WeatherIcon iconname={weatherIcon} />
                    <p className='text-content-2'>{date}</p>
                    <p className='text-content-2 text-sm'>{day}</p>
                </div>
                <div className='flex flex-col px-4'>
                    <span className='text-content-2 text-5xl'>
                        {convertKelvinToCelsius(temp ?? 0)}°
                    </span>
                    <p className='text-content-2 text-xs space-x-1 whitespace-nowrap'>
                        <span>Feels Like</span>
                        <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
                    </p>
                    <p className='text-content-2 capitalize'>{description}</p>
                </div>
            </section>
            <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}
