import es from "date-fns/locale/es";
import de from "date-fns/locale/de";
import fr from "date-fns/locale/fr";

import { useRouter } from "next/router";

const useLocaleDetector = () => {
  const { locale } = useRouter();
  const localeMap = {
    es,
    de,
    fr
  };

  const currentLocale = localeMap[locale];

  return {
    currentLocale
  };
};

export default useLocaleDetector;
