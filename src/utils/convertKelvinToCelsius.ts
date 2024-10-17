import { convertCelsiusNumber } from "./constants";

export function convertKelvinToCelsius(tempInKelvin: number): number {
    const tempInCelsius = tempInKelvin - convertCelsiusNumber;
    return Math.floor(tempInCelsius);
}