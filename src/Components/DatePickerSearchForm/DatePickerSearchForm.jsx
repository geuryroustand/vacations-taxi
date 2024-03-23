import React from "react";
import Form from "react-bootstrap/Form";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import { useRouter } from "next/router";
import es from "date-fns/locale/es";
import de from "date-fns/locale/de";
import fr from "date-fns/locale/fr";

import styled from "./DatePickerSearchForm.module.css";

function DatePickerSearchForm({
  isCarSharingPage,
  pickUpAndDropDate,
  setPickUpAndDropDate,
  labelPickDate,
  labelPickTime,
  pickUpAndDropTime,
  setPickUpAndDropTime,
  getPassenger,
  defaultValue,
  passengers,
  pickUpText,
  showReturnSearchForm,
  isRoundTrip,
  currentReturnFormDate,
  setCurrentReturnFormDate,
  disableReturnInputDate,
  setDisableReturnInputDate,
  dateLabelDeparture
}) {
  const { locale } = useRouter();
  const localeMap = {
    es,
    de,
    fr
  };

  registerLocale(locale, localeMap[locale]);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);

  const onReturnDateInputClick = () => {
    setDisableReturnInputDate(true);
    setCurrentReturnFormDate(new Date());
  };
  // Todo need to add the pick time below the calender

  const styles = isCarSharingPage ? styled.isCarSharingPage : "";

  return (
    <div className={styled.date}>
      <div className={`${styled.calender} ${styles}`}>
        <Image src="/images/calendar.svg" width="20" height="20" alt="calendar" />
        <div className={styled.calenderAndIconWrapper}>
          <label
            className={`${styled.calenderLabel} ${isCarSharingPage ? "visually-hidden" : ""} `}
            htmlFor="date-picker-arrival">
            {labelPickDate}
          </label>

          <DatePicker
            autoComplete="off"
            locale={locale}
            id="date-picker-arrival"
            selected={pickUpAndDropDate}
            onChange={(date) => setPickUpAndDropDate(date)}
            minDate={new Date()}
            maxDate={maxDate}
            showMonthDropdown
            showYearDropdown
            timeIntervals={5}
            dropdownMode="select"
            // showTimeSelect={!showReturnSearchForm}
            showTimeInput={!showReturnSearchForm}
            timeCaption={pickUpText}
            dateFormat={showReturnSearchForm ? "eee d, MMM yyyy" : "eee d, MMM yyyy HH:mm"}
            timeFormat="HH:mm"
            className={styled["date-picker"]}
          />
        </div>
      </div>

      {!showReturnSearchForm && (
        <div
          className={`${styled.calender} ${
            isRoundTrip || disableReturnInputDate ? "" : styled.calenderDisable
          }`}>
          <Image src="/images/calendar.svg" width="20" height="20" alt="calendar" />
          <div className={styled.calenderAndIconWrapper}>
            <label className={styled.calenderLabel} htmlFor="date-picker">
              {dateLabelDeparture}
            </label>
            <DatePicker
              // disabled={disableReturnInputDate}
              autoComplete="off"
              onInputClick={onReturnDateInputClick}
              locale={locale}
              id="date-picker-return"
              placeholderText="Add a return"
              // todayButton="Return Flight"
              selected={currentReturnFormDate}
              onChange={(date) => setCurrentReturnFormDate(date)}
              minDate={new Date()}
              maxDate={maxDate}
              showMonthDropdown
              showYearDropdown
              timeIntervals={5}
              dropdownMode="select"
              // showTimeSelect={!showReturnSearchForm}
              showTimeInput={!showReturnSearchForm}
              timeCaption={pickUpText}
              dateFormat={showReturnSearchForm ? "eee d, MMM yyyy" : "eee d, MMM yyyy HH:mm"}
              timeFormat="HH:mm"
              className={`${styled["date-picker"]} ${
                isRoundTrip || disableReturnInputDate ? "" : styled.calenderDisable
              }`}
            />
          </div>
        </div>
      )}

      <div className={styled.passengerAndPickTime}>
        {showReturnSearchForm && !isCarSharingPage && (
          <div className={styled.pickTime}>
            <Image src="/images/Clock.svg" width="20" height="20" alt="calendar" />
            <label className="visually-hidden" htmlFor="pickTime">
              {labelPickTime}
            </label>
            <DatePicker
              locale={locale}
              id="pickTime"
              selected={pickUpAndDropTime}
              onChange={(date) => setPickUpAndDropTime(date)}
              showTimeSelectOnly
              showTimeSelect
              timeIntervals={5}
              timeFormat="HH:mm"
              dateFormat="h:mm aa"
              timeCaption={pickUpText}
              className={styled.datePickUp}
            />
          </div>
        )}

        <div
          className={`${styled.passenger} ${showReturnSearchForm ? "" : styled.passengerSpecify}`}>
          <Image src="/images/user.svg" width="25" height="25" alt="user" />

          <Form.Select
            aria-label={passengers}
            defaultValue={defaultValue}
            className={styled["select-passenger"]}
            onChange={getPassenger}>
            <option>{passengers}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}

export default DatePickerSearchForm;
