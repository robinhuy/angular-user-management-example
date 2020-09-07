import { format, parseISO } from "date-fns";

export const formatDate = (date: string): string => {
  try {
    return format(parseISO(date), "MM/dd/yyyy");
  } catch {
    return date;
  }
};
