import React from 'react'
import { addAnalytics } from '../../../firebase/Analytics'

// React function component that wraps the component
// When mouse is over the component, it starts counting the time.
// When mouse is out of the component, it stops counting the time and sends the data to firebase.
// The data is sent to firebase using the addAnalytics function.
// addAnalytics function uses the following parameters:
// - userId: the user id
// - type: the type of the event
// - productId: the product id
// - time: the time spent on the product
export const Analytics = (props) => {
  const [time, setTime] = React.useState(0)
  const [isMouseOver, setIsMouseOver] = React.useState(false)

  const handleMouseOver = () => {
    setIsMouseOver(true)
  }

  const handleMouseOut = () => {
    setIsMouseOver(false)
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time])

  React.useEffect(() => {
    if (isMouseOver) {
      const timer = setTimeout(() => {
        addAnalytics(props.userId, props.type, props.productId, time)
        setTime(0)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isMouseOver, time])

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {props.children}
    </div>
  )
}