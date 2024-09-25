import React from "react";
import GoogleMaps from "../components/GoogleMaps";
import Description from "../components/description";
import trafficLightIcon from "../assets/images/traffic-light-icon.png";

function Home() {
  console.warn(`shina ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
  return (
    <div>
      <div className="mx-auto my-5 max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-stone-200">
        <div className="relative mx-auto  my-auto flex items-center justify-center gap-4">
        <img
            src={trafficLightIcon}
            width={50}
            height={50}
            alt="traffic-light"
          />
          <h1 className="text-blue-gray-900 text-3xl font-extrabold">
            Intelligent Traffic System
          </h1>
          <img
            src={trafficLightIcon}
            width={50}
            height={50}
            alt="traffic-light"
          />
        </div>
      </div>
      <div className="mx-auto my-5 max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <Description />
      </div>
      <div className="h-screen border-2 border-red-500">
        <GoogleMaps />
      </div>
    </div>
  );
}

export default Home;
