import { meters } from "./constants";

export function meterToKilometers(visibilityInMeters: number): string {
    const visibilityInKilometers = visibilityInMeters / meters;
    return `${visibilityInKilometers.toFixed(0)}km`;
}