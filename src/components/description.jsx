import React from "react";

function Description() {
  return (
    <div>
      <p className="font-semiBold">
        The intelligent traffic system communicates with neighboring traffic
        systems to collaboratively optimize traffic direction based on various
        factors. It connects to an app that informs city dwellers about traffic
        congestion and suggests alternate routes to maximize road resource
        efficiency. This integrated approach enhances overall traffic management
        and improves the commuting experience.
      </p>
      <p className="font-semiBold">
        A Traffic System features traffic lights facing different directions and
        communicates with neighbouring Traffic Systems, which in turn connect to
        other neighbouring Traffic Systems. This cluster-based communication
        creates a network of interactive and dynamic traffic systems that work
        together to optimize traffic flow. By coordinating their signals, these
        systems enhance efficiency, reduce wait times, and ultimately decrease
        traffic congestion.
      </p>
      <h2 className=" text-red-600 pt-5">
        You can hover or click over the red lines on the map and click on the
        traffic lights to learn more about how the system operates.
      </h2>
    </div>
  );
}

export default Description;
