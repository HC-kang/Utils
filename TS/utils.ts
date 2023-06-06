/**
 * Converts milliseconds to a formatted time string in the format "hh:mm:ss"
 * @param {number} ms - The duration in milliseconds
 * @returns {string} - The formatted time string
 */
const formatMsToHMS = (ms: number): string => {
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
 * @param {string} timeString - The time string in "hh:mm:ss" format
 * @returns {number} - The duration in milliseconds
 * @throws {Error} - Throws an error if the time format or values are invalid
 */
const formatHMSToMs = (timeString: string): number => {
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
    throw new Error('Invalid time format. Please provide numeric values for hours, minutes, and seconds.');
  }

  if (hours < 0 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
    throw new Error('Invalid time format. Please provide valid values for hours, minutes, and seconds.');
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalMilliseconds = totalSeconds * 1000;

  return totalMilliseconds;
};

/**
 * Converts a phone number to a specific format based on its length and prefix.
 * @param {string} phone - The phone number to format.
 * @returns {string} - The formatted phone number.
 */
const phoneNumberToString = (phone: string): string => {
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
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number with commas.
 */
const numberWithCommas = (number: number): string => {
  return number.toLocaleString();
};

/**
 * Removes commas from a comma-separated number string.
 * @param {string} numberString - The comma-separated number string.
 * @returns {string} - The number string without commas.
 */
export const removeCommasFromNumber = (numberString: string): string => {
  return numberString.replace(/,/g, '');
};

/**
 * Converts degrees to radians.
 * @param {number} degrees - The value in degrees.
 * @returns {number} - The value converted to radians.
 */
const radians = (degrees: number): number => {
  return degrees * Math.PI / 180;
};

/**
 * Calculates the distance between two points on the Earth's surface using their coordinates.
 * @param {object} pt1 - The first point's coordinates { coordinates: [lat1, lon1] }.
 * @param {object} pt2 - The second point's coordinates { coordinates: [lat2, lon2] }.
 * @returns {number} - The distance between the two points in kilometers.
 */
const calculateDistance = (pt1: { coordinates: [number, number] }, pt2: { coordinates: [number, number] }): number => {
  // radius of the earth.
  const radius: number = 6371;

  const [lat1Rad, lon1Rad] = pt1.coordinates.map(radians);
  const [lat2Rad, lon2Rad] = pt2.coordinates.map(radians);
  
  const deltaLat: number = lat2Rad - lat1Rad;
  const deltaLon: number = lon2Rad - lon1Rad;

  const a: number = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance: number = radius * c;

  return distance;
};
