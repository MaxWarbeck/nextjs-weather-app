import { convertNumber } from "./constants";

export function convertWindSpeed (speedInMetersPerSecond: number): string {
    const speedInKilometersPerHour = speedInMetersPerSecond * convertNumber;
    return `${speedInKilometersPerHour.toFixed(0)}km/h`
}