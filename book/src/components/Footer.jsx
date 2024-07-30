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
const Footer = () => {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
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
          <div className="footer-clock">{time}

        <div className="dateTime">
          <div className="title-bar timeDate-menu">
            <h2 className="title-bar-text">
              Date and Time Properties
            </h2>
            <div className="title-bar-controlx">
              <button className="minimize title-btn">

              </button>
              <button className="maxmize title-btn">

              </button>
              <button className="close title-btn">
        
              </button>
            </div>
          </div>
          <div className="window-body">
            <menu className="tabList">
                <button>Date & Time</button>
                <button>Time Zone</button>
                <button>Internet Time</button>
            </menu>
            <article className="tabPanel" id="DateTime" >
              <fieldset>
                <legend>Date</legend>
                <div className="monthYear">
                  <select name="" id="">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">Juny</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">Octomber</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <select name="" id="">
                    <option value="1">2013</option>
                    <option value="2">2014</option>
                    <option value="3">2015</option>
                    <option value="4">2016</option>
                    <option value="5">2017</option>
                    <option value="6">2018</option>
                    <option value="7">2019</option>
                    <option value="8">2020</option>
                    <option value="9">2021</option>
                    <option value="10">2022</option>
                    <option value="11">2023</option>
                    <option value="12">2024</option>
                  </select>
                </div>
              </fieldset>
              <fieldset>
                <legend>Time</legend>
                <h1>Clock</h1>
                <h2>{time}</h2>
              </fieldset>
            </article>
          </div>
        </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
