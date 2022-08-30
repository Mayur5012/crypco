import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Coins from './components/Coins'
import Coin from './routes/Coin'
import Navbar from './components/Navbar'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import Crypnews from './components/crypnews'

function App() {
  const pageSize = 5;
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false'
  const apiKey= process.env.REACT_APP_NEWSdata_API

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Navbar />
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
      <Routes>
        <Route path='/crypco' element={<Coins coins={coins} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      {/* <Route path='/crypto'><News setProgress={setProgress} apiKey={apiKey} key="crypto" pageSize={pageSize} country="in" category="crypto"/></Route>  */}
      <Route path='/crypto' element={<News />}>
        <Route element={<News />} setProgress={setProgress} apiKey={apiKey} key="crypto" pageSize={pageSize} country="in" category="crypto" />
      </Route> 
      </Routes>

    </>
  );
}

export default App;
