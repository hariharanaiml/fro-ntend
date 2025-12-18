import React from "react";
import "./Attractions.css";

function Attractions() {
  const rides = [
    {
      name: "Ferris Wheel",
      img: "https://thumbs.dreamstime.com/b/ferris-wheel-21342634.jpg"
    },
    {
      name: "Roller Coaster",
      img: "https://static01.nyt.com/images/2023/07/02/multimedia/29ROLLERCOASTER-02-lwgc/29ROLLERCOASTER-02-lwgc-videoSixteenByNine3000.jpg"
    },
    {
      name: "Water Splash Ride",
      img: "https://www.whitewaterwest.com/wp-content/uploads/2020/02/shoot-the-chute-ride-legoland-usa.jpg"
    },
    {
      name: "Haunted House",
      img: "https://www.grunge.com/img/gallery/the-origin-of-haunted-houses-is-older-than-you-think/this-remains-mostly-an-american-phenomenon-1664642794.jpg"
    },
    {
      name: "Bumper Cars",
      img: "https://www.safaritrampoline.com/wp-content/uploads/2018/10/2-760x570.jpg"
    }
  ];

  return (
    <div className="attractions-container">
      <h1 className="title">
        🎡 Our Attractions
      </h1>

      <div className="rides-wrapper">
        {rides.map((ride, index) => (
          <div className="ride-card" key={index}>
            <img src={ride.img} alt={ride.name} className="ride-img" />
            <h3>{ride.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attractions;
