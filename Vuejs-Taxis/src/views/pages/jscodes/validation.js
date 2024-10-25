// src/validation.js
import { interacted, calendarValue, departure, destination, inputNumberAdults, inputNumberChildren, inputNumberBabies, hours, minutes } from './data';

export const validateFields = () => {
  return calendarValue.value && departure.value && destination.value &&
         (inputNumberAdults.value > 0 || inputNumberChildren.value > 0 || inputNumberBabies.value > 0) &&
         (hours.value >= 0 && minutes.value >= 0);
};

export const isCalendarInvalid = () => interacted.value && !calendarValue.value;
export const isDepartureInvalid = () => interacted.value && !departure.value;
export const isDestinationInvalid = () => interacted.value && !destination.value;
export const arePassengersInvalid = () => interacted.value && inputNumberAdults.value <= 0 && inputNumberChildren.value <= 0 && inputNumberBabies.value <= 0;
export const areTimeInvalid = () => interacted.value && (hours.value < 0 || minutes.value < 0);
