import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import TopPick from '../../components/TopPicks/TopPick'


const Home = () => {

  const [category, setCategory] = useState('All');
  
  

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <TopPick/>
    </div>
  )
}

export default Home
