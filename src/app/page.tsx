'use client'

import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  fromUnixTime,
  parseISO
} from "date-fns";
import axios from "axios";
import { format } from "date-fns/format";
import { useAtom } from "jotai";
import Container from "@components/Container";
import WeatherSkeleton from "@components/WeatherSkeleton";
import Navbar from "@/components/Navbar";
import WeatherIcon from "@/components/WeatherIcon";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import WeatherDetails from "@/components/WeatherDetails";
import {
  loadingCityAtom,
  placeAtom
} from "@utils";
import {
  convertKelvinToCelsius,
  convertWindSpeed,
  getDayOrNightIcon,
  meterToKilometers
} from "@utils";
import { API_KEY } from "@/utils/globalValues";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {

  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=80`
    );
    return data;
  }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch])

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  const filteredWeatherData = firstDataForEachDate?.filter(
    day => day?.main.temp_min !== undefined && day.main.temp_min >= 293 && !day.weather[0].description.includes('rain'))
    .map(day => ({
      date: day?.dt_txt,
      minTemp: day?.main.temp_min,
      maxTemp: day?.main.temp_max,
      weatherDisc: day?.weather[0].description,
      icon: day?.weather[0].icon
    }));

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center bg-bkg-2">
      <p className="animate-bounce text-content-1">Loading...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 bg-bkg-2 min-h-screen">
      <Navbar location={data?.city.name} apiDataFromMainPage={data} forcastData={filteredWeatherData} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? <WeatherSkeleton /> :
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end text-content-1">
                  <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
                  <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
                </h2>
                <Container className=" gap-10 px-6 items-center">
                  <div className="flex flex-col px-4">
                    <span className="text-content-2 text-5xl">
                      {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                    </span>
                    <p className="text-xs text-content-2 space-x-1 whitespace-nowrap">
                      <span>Feels Like</span>
                      <span>
                        {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                      </span>
                    </p>
                    <p className="text-xs text-content-2 space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
                      </span>
                      <span>
                        {" "}
                        {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-content-2 text-xs font-semibold "
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </p>
                        <WeatherIcon iconname={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                        <p>
                          {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-content-2 text-center">{firstData?.weather[0].description}</p>
                  <WeatherIcon iconname={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? "")} />
                </Container>
                <Container className="bg-bkg-3 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visibility={meterToKilometers(firstData?.visibility ?? 1000)}
                    airPressure={`${firstData?.main.pressure} hPa`}
                    humidity={`${firstData?.main.humidity}%`}
                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452),
                      "H:mm")}
                    sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657),
                      "H:mm"
                    )}
                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  />
                </Container>
              </div>
            </section>
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl text-content-1">Forcast 7 days</p>
              {firstDataForEachDate.map((d, i) => (
                <ForecastWeatherDetail
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={format(parseISO(d?.dt_txt ?? "2024-07-23"), "dd.MM")}
                  day={format(parseISO(d?.dt_txt ?? "2024-07-23"), "EEEE")}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  airPressure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702517657),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  visibility={`${meterToKilometers(d?.visibility ?? 10000)}`}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
                />
              ))}
            </section>
          </>}
      </main>
    </div>
  );
}
