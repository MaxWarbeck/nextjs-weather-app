import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';
import { defaultValues } from '@utils';

export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {

    const {
        visibility = defaultValues.visibility,
        humidity = defaultValues.humidity,
        windSpeed = defaultValues.windSpeed,
        airPressure = defaultValues.airPressure,
        sunrise = defaultValues.sunrise,
        sunset = defaultValues.sunset
    } = props;

    return (
        <>
            <SingleWeatherDetail icon={<LuEye />} information='Visibility' value={visibility} />
            <SingleWeatherDetail icon={<FiDroplet />} information='Humidity' value={humidity} />
            <SingleWeatherDetail icon={<MdAir />} information='Wind Speed' value={windSpeed} />
            <SingleWeatherDetail icon={<ImMeter />} information='Air Pressure' value={airPressure} />
            <SingleWeatherDetail icon={<LuSunrise />} information='Sunrise' value={sunrise} />
            <SingleWeatherDetail icon={<LuSunset />} information='Sunset' value={sunset} />
        </>
    )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black'>
            <p className='whitespace-nowrap text-content-2'>{props.information}</p>
            <div className='text-3xl text-black'>{props.icon}</div>
            <p className='text-content-2'>{props.value}</p>
        </div>
    )
}
