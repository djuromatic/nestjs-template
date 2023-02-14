import { format } from 'date-fns';

export enum DateFormats {
  DATE_WITH_TIME_LOGGER = 'dd/MM/YYYY HH:mm:ss',
  DATE_WITH_TIME = 'dd/MM/yyyy HH:mm:ss',
}

export const formatDateWithTime = (date: Date) => {
  return format(date, DateFormats.DATE_WITH_TIME);
};

export const formatDateWithTimeLogger = (date: Date) => {
  return format(date, DateFormats.DATE_WITH_TIME_LOGGER);
};
