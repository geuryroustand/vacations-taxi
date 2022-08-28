import React, { useState } from "react";
import styled from "./DatePickerSearchForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

function DatePickerSearchForm({ labelPickDate, labelPickTime }) {
  const [startDate, setStartDate] = useState(new Date());
  const [startDatePickUpTime, setStartDatePickUpTime] = useState(new Date());

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

          selected={startDate}
          // selected={dataToSend.arrivalDate}
          // dateFormat="MM/dd/yyyy h:mm aa"
          // showTimeInput
          // timeInputLabel="Pick-up Time:"
          // dateFormat="eee d, MMM  yyyy h:mm aa"
          onChange={(date) => setStartDate(date)}
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
          required
          // value={dataToSend.arrivalDate}
          // onChange={(e) => handlerData("arrivalDate", e.target.value)}
        />
      </div>

      <div className={styled.passengerAndPickTime}>
        <div className={styled.pickTime}>
          <Image src="/images/clock.svg" width="20px" height="20px" alt="calendar" />
          <label className="visually-hidden" htmlFor="pickTime">
            {labelPickTime}
          </label>
          <DatePicker
            id="pickTime"
            selected={startDatePickUpTime}
            onChange={(date) => setStartDatePickUpTime(date)}
            // id="date-picker"
            // selected={dataToSend.arrivalDate}
            // dateFormat="MM/dd/yyyy h:mm aa"
            // showTimeInput
            // timeInputLabel="Pick-up Time:"
            // dateFormat="eee d, MMM  yyyy h:mm aa"
            // timeClassName={handleColor}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeCaption="Pick-up time"
            dateFormat="h:mm aa"
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

            // value={dataToSend.arrivalDate}
            // onChange={(e) => handlerData("arrivalDate", e.target.value)}
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
            // value={dataToSend.passengers}
            // onChange={(e) => handlerData("passengers", e.target.value)}
          >
            {/* <option value="passenger">Passenger</option> */}
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
