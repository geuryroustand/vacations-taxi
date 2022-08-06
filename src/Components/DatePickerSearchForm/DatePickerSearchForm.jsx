import React, { useState } from "react";
import styled from "./DatePickerSearchForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

function DatePickerSearchForm() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styled.date}>
      <div className={styled.calender}>
        <Image src="/images/calendar.svg" width="20px" height="20px" alt="calendar" />
        <label className="visually-hidden" htmlFor="date-picker">
          Pick your travel date
        </label>
        <DatePicker
          id="date-picker"
          // showTimeSelect
          selected={startDate}
          // selected={dataToSend.arrivalDate}

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
          // dateFormat="MMMM d, yyyy h:mm aa"
          // dateFormat="Pp"
          withPortal
          portalId="root-portal"
          className={styled["date-picker"]}
          required
          // value={dataToSend.arrivalDate}
          // onChange={(e) => handlerData("arrivalDate", e.target.value)}
        />
      </div>

      <div className={styled.passenger}>
        <Image src="/images/user.svg" width="18px" height="18px" alt="user" />

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
  );
}

export default DatePickerSearchForm;
