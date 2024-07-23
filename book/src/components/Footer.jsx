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
          <div className="footer-clock">{time}</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
