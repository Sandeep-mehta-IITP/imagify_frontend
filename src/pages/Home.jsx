import React from 'react'
import Header from '../components/Header'
import HowItWorks from '../components/HowItWorks'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Header />
      <HowItWorks />
      <Description />
      <Testimonial />
      <GenerateBtn />
    </div>
  )
}

export default Home