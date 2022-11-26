/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

import styled from "./DatePickerSearchForm.module.css";

function DatePickerSearchForm({
  pickUpAndDropDate,
  setPickUpAndDropDate,

  labelPickDate,
  labelPickTime,

  pickUpAndDropTime,
  setPickUpAndDropTime,

  getPassenger
}) {
  return (
    <div className={styled.date}>
      <div className={styled.calender}>
        <Image src="/images/calendar.svg" width="20px" height="20px" alt="calendar" />
        <label className="visually-hidden" htmlFor="date-picker">
          {labelPickDate}
        </label>
        <DatePicker
          id="date-picker"
          // showTimeSelect

          selected={pickUpAndDropDate}
          // selected={dataToSend.arrivalDate}
          // dateFormat="MM/dd/yyyy h:mm aa"
          // showTimeInput
          // timeInputLabel="Pick-up Time:"
          // dateFormat="eee d, MMM  yyyy h:mm aa"
          onSelect={(date) => setPickUpAndDropDate(date)}
          // onChange={dateSelect}
          // timeClassName={handleColor}
          minDate={new Date()}
          maxDate={new Date("02-29-2024")}
          showPopperArrow={false}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={1}
          scrollableYearDropdown
          dropdownMode="select"
          dateFormat="eee d, MMM  yyyy "
          // peekNextMonth
          // scrollableYearDropdown
          // strictParsing
          // timeIntervals={15}
          // dateFormat="MMMM d, yyyy h:mm "
          // timeCaption="Pic-up time"
          // timeFormat="p"
          // timeIntervals={1}
          // dateFormat="Pp"
          withPortal
          portalId="root-portal"
          className={styled["date-picker"]}
          // required
          // value={dataToSend.arrivalDate}
          // onChange={(e) => handlerData("arrivalDate", e.target.value)}
        />
      </div>

      <div className={styled.passengerAndPickTime}>
        <div className={styled.pickTime}>
          <Image src="/images/Clock.svg" width="20px" height="20px" alt="calendar" />
          <label className="visually-hidden" htmlFor="pickTime">
            {labelPickTime}
          </label>
          <DatePicker
            id="pickTime"
            selected={pickUpAndDropTime}
            onChange={(date) => setPickUpAndDropTime(date)}
            showTimeSelectOnly
            showTimeSelect
            timeIntervals={10}
            timeCaption="Pick-up time"
            timeFormat="HH:mm"
            dateFormat="h:mm aa"
            // showTimeInput
            // id="date-picker"
            // selected={dataToSend.arrivalDate}
            // dateFormat="MM/dd/yyyy h:mm aa"
            // showTimeInput
            // timeInputLabel="Pick-up Time:"
            // dateFormat="eee d, MMM  yyyy h:mm aa"
            // timeClassName={handleColor}
            // timeFormat="HH:mm"
            // peekNextMonth
            // scrollableYearDropdown
            // strictParsing
            // timeIntervals={15}
            // dateFormat="MMMM d, yyyy h:mm "

            // timeFormat="p"

            // dateFormat="Pp"
            // withPortal
            // portalId="root-portal"
            className={styled.datePickUp}
          />
        </div>
        <div className={styled.passenger}>
          <Image src="/images/user.svg" width="20px" height="20px" alt="user" />

          <label htmlFor="passenger">Passenger </label>
          <select
            name="passenger"
            id="passenger"
            className={styled["select-passenger"]}
            required
            onChange={getPassenger}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

            <option value="6">6</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DatePickerSearchForm;
