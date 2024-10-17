import { atom } from "jotai";

export const placeAtom = atom("Germany");

export const loadingCityAtom = atom(false);

export const limit = 6;

export const countryCode = 'DE';

export const meters = 100;

export const convertNumber = 3.6;

export const convertCelsiusNumber = 273.15;

export const defaultValues =  {
    visibility: "25km",
    humidity:"61%",
    windSpeed: "7 km/h",
    airPressure: "1012 hPa",
    sunrise:"6.20",
    sunset: "18.48",
    weatherIcon: "02d",
    date: "19.09",
    day: "Tuesday",
};