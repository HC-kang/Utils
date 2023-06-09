# Utils for my works

## List of Functions

- **formatMsToHMS**
  - milliseconds를 "hh:mm:ss" 형식으로 변환합니다.
  - Converts milliseconds to a formatted time string in the format "hh:mm:ss"
- **formatHMSToMs**
  - "hh:mm:ss" 형태의 시간을 milliseconds로 변환합니다.
  - Converts a time string in the format "hh:mm:ss" to milliseconds
- **phoneNumberToString**
  - 주어진 휴대폰 번호를 통일된 형식(010-1234-5678 등)으로 변환합니다.
  - Converts a phone number to a specific format based on its length and prefix.
- **numberWithCommas**
  - 숫자를 컴마로 분할된 형태로 변경합니다.
  - Formats a number with commas for thousands separators.
- **removeCommasFromNumber**
  - 쉼표로 구분된 숫자 문자열에서 쉼표를 제거합니다.
  - Removes commas from a comma-separated number string.
- **radians**
  - 도를 라디안으로 변환합니다.
  - Converts degrees to radians.
- **calculateDistance**
  - 좌표를 사용하여 지표의 두 점 사이의 거리를 계산합니다.
  - Calculates the distance between two points on the Earth's surface using their coordinates.
- **busyWait**
  - 지정된 시간(초) 동안 바쁘게 대기합니다.
  - Busy wait for a specified number of seconds.
- **wait**
  - 지정된 시간(초) 동안 비동기 대기합니다.
  - Asynchronous wait for a specified number of seconds.
- **jitterBusyWait**
  - 지정된 대략적인 임의의 시간 동안 대기합니다.
  - Busy wait for a random period of time around a specified duration, with a jitter factor.
- **jitterSleep**
  - 지정된 대략적인 임의의 시간 동안 잠자기 대기합니다.
  - Sleeps for a random amount of time around a specified duration, with a jitter factor.
- **camelToSnake**
  - camelCase를 snake_case로 변환합니다.
  - Converts camelCase to snake_case.
- **snakeToCamel**
  - snake_case를 camelCase로 변환합니다.
  - Converts snake_case to camelCase.
- **parseUrlParam**
  - URL 문자열에서 쿼리 매개변수 추출하여 배열로 리턴합니다.
  - Parse the query parameters from a URL string.
- **createPeriodArray**
  - 두 날짜 사이의 전체 날짜로 배열을 생성합니다.
  - Create an array of dates between two dates.
- **addDays**
  - 임의의 날짜에 일 수를 더합니다.
  - Add a number of days to a date.
- **subDays**
  - 임의의 날짜에서 일 수를 뺍니다.
  - Subtract a number of days from a date.
- **getDateDiff**
  - 두 날짜의 차이를 일 단위로 계산합니다.
  - Calculate the difference between two dates in days.
- **isValidEmail**
  - 이메일 주소의 유효성을 검사합니다.
  - Validate an email address.
- **debounce**
  - 함수를 디바운스합니다.
  - Debounce a function.
- **throttle**
  - 함수가 X밀리초마다 한 번만 호출될 수 있도록 함수를 제한합니다.
  - Throttle a function so that it can only be called once every X milliseconds.
- **throttlePerSecond**
  - 함수가 최대 초당 특정 횟수만큼만 호출될 수 있도록 함수를 제한합니다.
  - Throttle a function so that it can only be called a certain number of times per second.
- **range**
  - 두 숫자 사이에 숫자 배열을 만듭니다.
  - Create an array of numbers between two numbers.
- **truncate**
  - 문자열을 지정된 길이로 자릅니다.
  - Truncate a string to a specified length.
- **randomString**
  - 지정된 길이의 임의의 문자열을 생성합니다.
  - Generate a random string of a specified length.
- **omit**
  - 객체에서 특정 키들을 제거합니다.
  - Remove some properties from an object.
- **pick**
  - 객체에서 특정 키들만 추출합니다.
  - Pick some properties from an object.
- **pluck**
  - 객체에서 특정 키의 값들만 추출합니다.
  - Pluck a property from an array of objects.
- **capitalize**
  - 각 단어의 첫글자만 대문자로 바꿉니다.
  - Capitalize the first letter of each word in a string.
- **pad**
  - 문자열을 특정 길이만큼 패딩 처리합니다.
  - Pad a string with a specified character to a specified length.
- **pickRandomElement**
  - 배열에서 임의값을 선택 해 줍니다.
  - Pick a random element from an array.
- **isEmpty**
  - 특정 값이 비어있는지 점검합니다.
  - Check if a value is empty.
