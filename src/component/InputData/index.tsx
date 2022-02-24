import React, { useMemo, useState } from "react";
import { format, addDays } from "date-fns";
import { MenuItem, Select } from "@material-ui/core";
import InputMask from "react-input-mask";
import Expand from "@material-ui/icons/ExpandMoreOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "../../App.css";

import {
  DAYS_OF_WEEK,
  MONTHS,
  generateCalendar,
  getYears,
  includeMaskDate,
} from "../../utils";
import { TWeek } from "../../types";

type ICalendar = {
  value: string;
  onChange: (date: Date, value: string) => void;
  maxDate?: string;
};

const Calendario = ({ value, onChange, maxDate }: ICalendar) => {
  const { years } = getYears();
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [dataInput, setDataInput] = useState<string>(value);

  const [monthSelected, setMonthSelected] = useState<string>(
    format(new Date(), "MM")
  );

  const [yearSelected, setYearSelected] = useState<string>(
    format(new Date(), "yyyy")
  );

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const weeks = useMemo(() => {
    return generateCalendar(yearSelected + "-" + monthSelected + "-01");
  }, [monthSelected, yearSelected]);

  const handleDate = (value: TWeek) => {
    onChange(addDays(new Date(value.date), 1), value.date);
    setSelectedDay(value.date);
    setDataInput(format(addDays(new Date(value.date), 1), "dd/MM/yyyy"));
    setShowCalendar(false);
  };

  const handleAlterMonth = (value: string) => {
    setMonthSelected(value);
  };

  const handleAlterYear = (value: string) => {
    setYearSelected(value);
  };

  const handleInputDate = (value: string) => {
    setDataInput(includeMaskDate(value));
    if (value.length === 10) {
      let month = value.split("/")[1];
      let day = value.split("/")[0];
      let year = value.split("/")[2];
      let dateFormat = year + "/" + month + "/" + day;
      setMonthSelected(month);
      setYearSelected(year);
      setSelectedDay(format(new Date(dateFormat), "yyyy-MM-dd"));
    }
  };

  const showDopDownCalendar = () => {
    setShowCalendar(!showCalendar);
    // setErrorDate("");
  };

  return (
    <div className="container-calendar">
      <div className="cancelamento-plano-data-container">
        <div className="cancelamento-plano-data">
          <div className={`cancelamento-plano-data-container-input `}>
            <InputMask
              placeholder="dd/mm/aaaa"
              mask="99/99/9999"
              value={dataInput}
              onChange={({ target }) => {
                onChange(new Date(target.value), target.value);
                handleInputDate(includeMaskDate(target.value));
              }}
            />

            <div className="vertical-line" />

            <CalendarTodayIcon
              onClick={showDopDownCalendar}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      {showCalendar && (
        <div className={`body_calendar`}>
          <div className="body_calendar_header">
            <div className="body_calendar_select_month">
              <Select
                variant="outlined"
                className="select_month"
                margin="dense"
                value={monthSelected}
                IconComponent={Expand}
                onChange={({ target }) =>
                  handleAlterMonth(String(target.value))
                }
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}>
                {MONTHS.map((month) => {
                  return (
                    <MenuItem key={month.value} value={month.value}>
                      {month.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <Select
              variant="outlined"
              className="select_month"
              margin="dense"
              IconComponent={Expand}
              value={yearSelected}
              onChange={({ target }) => handleAlterYear(String(target.value))}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}>
              {years.map((month) => {
                console.log(month);
                return (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="body_calendar_content">
            {DAYS_OF_WEEK.map((day) => {
              return <div key={day}>{day}</div>;
            })}
          </div>
          <div className="body_calendar_content_day">
            {weeks.map((week, ind) => {
              console.log(week);
              return (
                <div
                  key={week[ind].date}
                  className="body_calendar_content_day_per">
                  {week.map((cell) => {
                    let monthCell = cell.date.split("-")[1];

                    return (
                      <div
                        key={cell.date}
                        onClick={() => {
                          if (monthCell === monthSelected) handleDate(cell);
                        }}
                        className={`${
                          monthCell !== monthSelected && "date-not-today"
                        } ${
                          selectedDay === cell.date &&
                          monthCell === monthSelected &&
                          "activeDay"
                        }`}>
                        {cell.dayOfMonth}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
