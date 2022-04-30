import React from "react";
import { uploadAnalytic } from "../../../firebase/Analytics/hover";


// React function component that wraps the component
// When mouse is over the component, it starts counting the time.
// When mouse is out of the component, it stops counting the time and sends the data to firebase.
// The data is sent to firebase using the uploadAnalytic function.
// uploadAnalytic function uses the following parameters:
// - userId: the user id
// - type: the type of the event
// - productId: the product id
// - time: the time spent on the product
export const Analytics = (props) => {
  const [time, setTime] = React.useState(0);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  // If mouse is over the component, start counting the time
  React.useEffect(() => {
    if (isMouseOver) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1);
      return () => clearInterval(interval);
    }
  }, [isMouseOver]);

  // If mouse is out of the component, reset the time and send the data to firebase
  React.useEffect(() => {
    if (!isMouseOver) {
      try {
        // Send the data to firebase and console.log something if it works. If time is 0, don't send the data.
        if (time && time > 0) {
          uploadAnalytic(props.userId, props.type, props.productId, time);
        }
        setTime(0);
      } catch (error) {
        console.log("uploadAnalytic error: ", error);
      }
    }
  }, [isMouseOver]);

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {props.children}
    </div>
  );
};

