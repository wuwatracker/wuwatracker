import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * @param dateString the date string in the format "YYYY-MM-DD HH:mm"
 * @param targetUtcOffset the offset you want to convert to
 * @returns the date string converted to Wuthering Waves' Asia, SEA, HK server time
 *
 * @example
 * (2024-08-07 11:59) => 2024-08-07T11:59:00+08:00
 */
export const toGameServerTime = (
  dateString: string,
  targetUtcOffset: number
) => {
  return dayjs(dateString).utcOffset(targetUtcOffset, true).format();
};

/**
 * Used for mapping array objects with `startDate` and `endDate` properties to game server time.
 */
export const convertDatesToServerTime = <
  T extends { startDate: string; endDate: string }[]
>(
  items: T
): T => {
  const SERVER_TIME_UTC_OFFSET = 8; // UTC+8

  return items.map((item) => ({
    ...item,
    startDate: toGameServerTime(item.startDate, SERVER_TIME_UTC_OFFSET),
    endDate: toGameServerTime(item.endDate, SERVER_TIME_UTC_OFFSET),
  })) as T;
};
