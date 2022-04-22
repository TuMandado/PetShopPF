import React from 'react'
import Announcement from '../../components/announcement/Announcement'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Slider from '../../components/slider/Slider'
import Categories from '../../components/Categories/Categories'
import Map from '../../components/map/Map'

const home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Map/>
      <Slider />
      <Categories/>
      <Footer /> 
    </div>
  )
}

export default home
