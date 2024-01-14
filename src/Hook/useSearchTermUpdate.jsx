import { useEffect } from "react";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import de from "date-fns/locale/de";
import fr from "date-fns/locale/fr";

import { useRouter } from "next/router";

const useSearchTermUpdate = ({
  isRoundTrip,
  disableReturnInputDate,
  pickUpMemoized,
  dropOffMemoized,
  currentReturnFormDate,
  currentPickUpDate,
  currentPickUpTime,
  currentDropOffDate,
  currentDropOffTime,
  showReturnSearchForm,
  setSearchedTerm
}) => {
  const shouldUpdateRoundTripTerms = isRoundTrip || disableReturnInputDate;

  const { locale } = useRouter();
  const localeMap = {
    es,
    de,
    fr
  };

  const currentLocale = localeMap[locale];

  const updateRoundTripTerms = (previousSearchTerm) => {
    return {
      ...previousSearchTerm,
      pickUpReturn: pickUpMemoized || previousSearchTerm.dropOff,
      dropOffReturn: dropOffMemoized || previousSearchTerm.pickUp,
      dropOffDate: disableReturnInputDate
        ? format(currentReturnFormDate, "eee d, MMM yyyy", { locale: currentLocale })
        : format(currentDropOffDate, "eee d, MMM yyyy", { locale: currentLocale }),
      dropOffTime: disableReturnInputDate
        ? format(currentReturnFormDate, "k:m", { locale: currentLocale })
        : format(currentDropOffTime, "k:m", { locale: currentLocale }),
      roundtrip: true
    };
  };
  // Mon 15, Jan 2024 1pm
  // Tue 30, Apr 2024 2px

  // Thu 18, Jan 2024 05:04
  // Mon 20, May 2024 17:28

  const updateOneWayTerms = (previousSearchTerm) => {
    return {
      ...previousSearchTerm,
      pickUp: pickUpMemoized || previousSearchTerm.pickUp,
      dropOff: dropOffMemoized || previousSearchTerm.dropOff,
      pickUpDate:
        currentPickUpDate &&
        format(currentPickUpDate, "eee d, MMM yyyy", { locale: currentLocale }),
      pickUpTime: showReturnSearchForm
        ? currentPickUpTime && format(currentPickUpTime, "k:m", { locale: currentLocale })
        : currentPickUpDate && format(currentPickUpDate, "k:m", { locale: currentLocale }),
      pickUpSearchedTermClicked: true,
      dropOffSearchedTermClicked: true
    };
  };

  const dependencies = [
    isRoundTrip,
    disableReturnInputDate,
    pickUpMemoized,
    dropOffMemoized,
    currentReturnFormDate,
    currentDropOffDate,
    currentDropOffTime,
    showReturnSearchForm
  ];

  useEffect(() => {
    setSearchedTerm((previousSearchTerm) => {
      return shouldUpdateRoundTripTerms
        ? updateRoundTripTerms(previousSearchTerm)
        : updateOneWayTerms(previousSearchTerm);
    });
  }, dependencies);

  useEffect(() => {
    setSearchedTerm((previousSearchTerm) => {
      return {
        ...previousSearchTerm,
        pickUpDate:
          currentPickUpDate &&
          format(currentPickUpDate, "eee d, MMM  yyyy", { locale: currentLocale }),
        pickUpTime: showReturnSearchForm
          ? currentPickUpTime && format(currentPickUpTime, "k:m", { locale: currentLocale })
          : currentPickUpDate && format(currentPickUpDate, "k:m", { locale: currentLocale })
      };
    });
  }, [currentPickUpDate, currentPickUpTime]);
};

export default useSearchTermUpdate;
