import format from "date-fns/format";
import parse from "date-fns/parse";

import useLocaleDetector from "./useLocaleDetector";

const useDateTimeFormatter = () => {
  const { currentLocale } = useLocaleDetector();

  const formatTime = (timeString) => {
    const PROD = process.env.NODE_ENV === "production";

    const parsedTime = PROD
      ? timeString && parse(timeString, "HH:mm:ss", new Date())
      : timeString && parse(timeString, "HH:mm:ss.SSS", new Date());

    return parsedTime && format(parsedTime, "H:mm", { locale: currentLocale });
  };

  const formatDate = (dateString) => {
    return dateString && format(new Date(dateString), "eee d, MMM yyyy", { locale: currentLocale });
  };

  return { formatTime, formatDate };
};

export default useDateTimeFormatter;
