/**
 * Converts milliseconds to a formatted time string in the format "hh:mm:ss"
 * 
 * @param {number} ms
 * @returns {string}
 */
export const formatMsToHMS = (ms: number): string => {
  let seconds = Math.floor(ms / 1000);
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Converts a time string in the format "hh:mm:ss" to milliseconds
 * 
 * @param {string} timeString
 * @returns {number} - milliseconds
 * @throws {Error}
 */
export const formatHMSToMs = (timeString: string): number => {
  const timeParts = timeString.split(':');

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (timeParts.length === 3) {
    hours = parseInt(timeParts[0]);
    minutes = parseInt(timeParts[1]);
    seconds = parseInt(timeParts[2]);
  } else {
    throw new Error('Invalid time format. Please provide either "hh:mm:ss"');
  }

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error(
      'Invalid time format. Please provide numeric values for hours, minutes, and seconds.'
    );
  }

  if (
    hours < 0 ||
    minutes < 0 ||
    minutes >= 60 ||
    seconds < 0 ||
    seconds >= 60
  ) {
    throw new Error(
      'Invalid time format. Please provide valid values for hours, minutes, and seconds.'
    );
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalMilliseconds = totalSeconds * 1000;

  return totalMilliseconds;
};

/**
 * Converts a phone number to a specific format based on its length and prefix.
 * 
 * @param {string} phone - 12345678, 0212345678, 03212345678, 01012345678....
 * @returns {string} - 1588-1234, 010-1234-5678...
 */
export const phoneNumberToString = (phone: string): string => {
  const length = phone.length;
  let result: string;

  if (length === 8) {
    result = phone.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else if (phone.startsWith('02') && (length === 9 || length === 10)) {
    result = phone.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
  } else if (!phone.startsWith('02') && (length === 10 || length === 11)) {
    result = phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  } else {
    result = phone;
  }

  return result;
};

/**
 * Formats a number with commas for thousands separators.
 * 
 * @param {number} number - 1000
 * @returns {string} - 1,000
 */
export const numberWithCommas = (number: number): string => {
  return number.toLocaleString();
};

/**
 * Removes commas from a comma-separated number string.
 * 
 * @param {string} numberString - The comma-separated number string.
 * @returns {string} - The number string without commas.
 */
export const removeCommasFromNumber = (numberString: string): string => {
  return numberString.replace(/,/g, '');
};

/**
 * Converts degrees to radians.
 * 
 * @param {number} degrees - 1,000
 * @returns {number} - 1000
 */
export const radians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Calculates the distance between two points on the Earth's surface using their coordinates.
 * 
 * @param {object} pt1 - The first point's coordinates { coordinates: [lat1, lon1] }.
 * @param {object} pt2 - The second point
 * @returns {number} - The distance between the two points in kilometers.
 */
export const calculateDistance = (
  pt1: { coordinates: [number, number] },
  pt2: { coordinates: [number, number] }
): number => {
  // radius of the earth.
  const radius: number = 6371;

  const [lat1Rad, lon1Rad] = pt1.coordinates.map(radians);
  const [lat2Rad, lon2Rad] = pt2.coordinates.map(radians);

  const deltaLat: number = lat2Rad - lat1Rad;
  const deltaLon: number = lon2Rad - lon1Rad;

  const a: number =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance: number = radius * c;

  return distance;
};

/**
 * Busy wait for a specified number of seconds.
 *
 * @param sec The number of seconds to wait.
 */
export const busyWait = (sec: number): void => {
  let start = Date.now(),
    now = start;
  while (now - start < sec * 1000) {
    now = Date.now();
  }
};

/**
 * Asynchronous wait for a specified number of seconds.
 *
 * @param sec The number of seconds to wait.
 */
export const wait = (sec: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

/**
 * Busy wait for a random period of time around a specified duration, with a jitter factor.
 *
 * @param milliseconds The target wait duration in milliseconds.
 * @param amplitude - 0 < amplitude < 1
 * @throws {Error} If the amplitude is not between 0 and 1.
 */
export const jitterBusyWait = (
  milliseconds: number,
  amplitude: number = 0.3
): void => {
  if (amplitude < 0 || amplitude > 1) {
    throw new Error('Amplitude must be between 0 and 1');
  }

  const minJitter = 1 - amplitude;
  const maxJitter = 1 + amplitude;

  const jitterRange = milliseconds * (maxJitter - minJitter);
  const jitterSec =
    milliseconds + Math.random() * jitterRange - jitterRange / 2;

  let start = Date.now(),
    now = start;
  while (now - start < jitterSec) {
    now = Date.now();
  }
};

/**
 * Sleeps for a random amount of time around a specified duration, with a jitter factor.
 *
 * @param milliseconds The target sleep duration in milliseconds.
 * @param amplitude - 0 < amplitude < 1
 * @throws {Error} If the amplitude is not between 0 and 1.
 * @return
 */
export const jitterSleep = async (
  milliseconds: number,
  amplitude: number = 0.3
): Promise<void> => {
  if (amplitude < 0 || amplitude > 1) {
    throw new Error('Amplitude must be between 0 and 1');
  }

  const minJitter = 1 - amplitude;
  const maxJitter = 1 + amplitude;

  const jitterRange = milliseconds * (maxJitter - minJitter);
  const jitter = milliseconds + Math.random() * jitterRange - jitterRange / 2;

  return new Promise((resolve) => setTimeout(resolve, jitter));
};

/**
 * Converts camelCase to snake_case.
 *
 * @param str
 * @return
 */
export const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

/**
 * Converts snake_case to camelCase.
 *
 * @param str
 * @return
 */
export const snakeToCamel = (str: string): string => {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
};

/**
 * Parse the query parameters from a URL string.
 *
 * @param {string} url
 * @return
 */
export const parseUrlParam = (url: string): { [key: string]: string } => {
  const params: { [key: string]: string } = {};
  const urlObj = new URL(url);

  for (const [key, value] of urlObj.searchParams) {
    params[key] = value;
  }

  return params;
};

/**
 * Create an array of dates between two dates.
 *
 * @param {Date} startDate - new Date('2023-01-01')
 * @param {Date} endDate
 * @return An array of Date objects for each day between the start and end dates
 */
export const createPeriodArray = (startDate: Date, endDate: Date): Date[] => {
  let currentDate = new Date(startDate);
  const dates: Date[] = [];

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Add a number of days to a date.
 *
 * @param {Date} date - new Date('2023-01-01')
 * @param {number} days
 * @return A new Date object representing the date after adding the specified number of days.
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Subtract a number of days from a date.
 *
 * @param {Date} date - new Date('2023-01-01')
 * @param {number} days
 * @return A new Date object representing the date after subtracting the specified number of days.
 */
export const subDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

/**
 * Calculate the difference between two dates in days.
 *
 * @param date1  - new Date('2023-01-01')
 * @param date2  - new Date('2023-02-01')
 * @return 31
 */
export const getDateDiff = (date1: Date, date2: Date): number => {
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  return Math.round(diffInMilliseconds / oneDayInMilliseconds);
};

/**
 * Validate an email address.
 *
 * @param email - 'test@test.com'
 * @return true
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

/**
 * Debounce a function.
 *
 * @param func - A function you want to debounce.
 * @param waitFor - The number of milliseconds to wait before calling the function.
 * @returns - A debounced version of the function.
 */
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  waitFor: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Throttle a function so that it can only be called once every X milliseconds.
 *
 * @param func - A function you want to throttle.
 * @param limit - The number of milliseconds to throttle the function.
 * @returns - A throttled version of the function.
 */
export const throttle = <F extends (...args: any[]) => void>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number = 0;

  return function (...args: Parameters<F>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      if (lastFunc !== null) clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * Throttle a function so that it can only be called a certain number of times per second.
 *
 * @param func - A function you want to throttle.
 * @param times - The number of times the function can be called per second.
 * @returns - A throttled version of the function.
 */
export const throttlePerSecond = <F extends (...args: any[]) => void>(
  func: F,
  times: number
): ((...args: Parameters<F>) => void) => {
  let lastRan: number = 0;
  let callsInLastSecond: number = 0;

  return function (...args: Parameters<F>) {
    const now = Date.now();

    if (now - lastRan >= 1000) {
      lastRan = now;
      callsInLastSecond = 0;
    }

    if (callsInLastSecond < times) {
      func(...args);
      callsInLastSecond++;
    }
  };
};

/**
 * Create an array of numbers between two numbers.
 *
 * @param start
 * @param end
 * @returns
 */
export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start }, (v, k) => k + start);
};

/**
 * Truncate a string to a specified length.
 *
 * @param str - The string that you want to truncate.
 * @param length - The maximum length of the string.
 * @param ending - The string to append to the end of the truncated string.
 * @returns - The truncated string.
 */
export const truncate = (
  str: string,
  length: number,
  ending = '...'
): string => {
  return str.length > length ? str.substring(0, length) + ending : str;
};

/**
 * Generate a random string of a specified length.
 *
 * @param len - The length of the random string.
 * @param mode - The type of characters to include in the random string. Valid values are "alpha", "num", or "alphanum".
 * @throws If the mode is not "alpha", "num", or "alphanum".
 * @returns
 */
export const randomString = (
  len: number,
  mode: string = 'alphanum'
): string => {
  let result = '';
  const characters: Record<'alpha' | 'num' | 'alphanum', string> = {
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    alphanum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  };
  const chosenCharacters = characters[mode as 'alpha' | 'num' | 'alphanum'];

  if (!chosenCharacters) {
    throw new Error(
      'Invalid mode. Mode must be "alpha", "num", or "alphanum".'
    );
  }

  for (let i = 0; i < len; i++) {
    result += chosenCharacters.charAt(
      Math.floor(Math.random() * chosenCharacters.length)
    );
  }
  return result;
};
