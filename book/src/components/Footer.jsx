import React, { useEffect, useState } from "react";
import "./Footer.css";

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = "AM";
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

const getDate = () => {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
    day: date.getDate(),
  };
};

const setClockAngles = () => {
  const hourHand = document.querySelector(".hour");
  const minuteHand = document.querySelector(".minute");
  const secondHand = document.querySelector(".second");

  if (!hourHand || !minuteHand || !secondHand) return;

  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
};

const Footer = () => {
  const [time, setTime] = useState(getTime);
  const [date, setDate] = useState(getDate);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
      setClockAngles();
    }, 1000);
    setClockAngles(); // Call it initially to set the time immediately
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setClockAngles(); // Set clock angles when the window becomes visible
    }
  }, [isVisible]);

  const countDays = () => {
    const numbers = [];
    for (let i = 0; i < 31; i++) {
      numbers.push(
        <li key={i} className="nums">
          {[i + 1]}
        </li>
      );
    }
    return numbers;
  };
  const renderDialLines = () => {
    const lines = [];
    for (let i = 0; i < 60; i++) {
      const isHourMark = i % 5 === 0;
      lines.push(
        <div
          className={isHourMark ? "diallines hour-mark" : "diallines"}
          key={i}
          style={{ transform: `rotate(${6 * i}deg)` }}
        ></div>
      );
    }
    return lines;
  };
  return (
    <>
      <div className="footer taskBar">
        <div className="start">
          <img src="../../images/download (14).png" alt="" />
        </div>
        <div className="clock">
          <div className="footer-icon">
            <img src="../../images/download (11).png" alt="" />
          </div>
          <div className="footer-icon">
            <img src="../../images/download (12).png" alt="" />
          </div>
          <div className="footer-icon">
            <img src="../../images/download (13).png" alt="" />
          </div>
          <div className="footer-clock">
            <span onClick={() => setIsVisible(!isVisible)}>{time}</span>
            {isVisible && (
              <div className="dateTime">
                <div className="title-bar timeDate-menu">
                  <h2 className="title-bar-text">Date and Time Properties</h2>
                  <div className="title-bar-controlx">
                    <button className="minimize title-btn"></button>
                    <button className="maxmize title-btn"></button>
                    <button
                      onClick={() => setIsVisible(!isVisible)}
                      className="close title-btn"
                    ></button>
                  </div>
                </div>
                <div className="window-body">
                  <menu className="tabList">
                    <button>Date & Time</button>
                    <button>Time Zone</button>
                    <button>Internet Time</button>
                  </menu>
                  <article className="tabPanel" id="DateTime">
                    <fieldset className="date">
                      <legend>Date</legend>
                      <div className="monthYear">
                        <select
                          name="month"
                          id="month"
                          defaultValue={date.month}
                        >
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                        <select name="year" id="year" defaultValue={date.year}>
                          {Array.from({ length: 20 }, (_, i) => 2005 + i).map(
                            (year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="calendar">
                        <table>
                          <thead>
                            <tr>
                              <th>Su</th>
                              <th>Mo</th>
                              <th>Tu</th>
                              <th>We</th>
                              <th>Th</th>
                              <th>Fr</th>
                              <th>Sa</th>
                            </tr>
                          </thead>
                          <tbody>{countDays()}</tbody>
                        </table>
                      </div>
                    </fieldset>
                    <fieldset className="watch">
                      <legend>Time</legend>
                      <div className="analogClock">
                        <div className="center"></div>
                        <div className="Clock">
                          <div className="hour"></div>
                          <div className="minute"></div>
                          <div className="second"></div>
                        </div>
                        {renderDialLines()}
                      </div>
                    </fieldset>
                  </article>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
