import React from 'react'
import Announcement from '../../components/announcement/Announcement'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Slider from '../../components/slider/Slider'

const home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Footer /> 
    </div>
  )
}

export default home
