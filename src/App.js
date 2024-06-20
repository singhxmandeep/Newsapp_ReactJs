
import './App.css';
import React, { useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

// import NewsItem from './Components/NewsItem';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

const App = () => {
  const pageSize = 15 ;
  const c= "Mandeep Singh"
  const [progress, setProgress ] = useState(0)
  

  
    return (
    <>
      <BrowserRouter>
        <Navbar/>
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Routes>
            <Route exact path="/" element={<News setProgress = {setProgress} key = "general" pageSize = {pageSize} country = "us" category = "general"     />}/>
            <Route exact path="/entertainment" element={<News setProgress = {setProgress} key = "entertainment" pageSize = {pageSize} country = "us" category = "entertainment"    />}/>
            <Route exact path="/business" element={<News setProgress = {setProgress} key = "business" pageSize = {pageSize} country = "us" category = "business"    />}/>
            <Route exact path="/general" element={<News setProgress = {setProgress} key = "general" pageSize = {pageSize} country = "us" category = "general"    />}/>
            <Route exact path="/health" element={<News setProgress = {setProgress} key = "health" pageSize = {pageSize} country = "us" category = "health"    />}/>
            <Route exact path="/science" element={<News setProgress = {setProgress} key = "science" pageSize = {pageSize} country = "us" category = "science"    />}/>
            <Route exact path="/sports" element={<News setProgress = {setProgress} key = "sports" pageSize = {pageSize} country = "us" category = "sports"    />}/>
            <Route exact path="/technology" element={<News setProgress = {setProgress} key = "technology" pageSize = {pageSize} country = "us" category = "technology"    />}/>
        </Routes>
      </BrowserRouter>
    </>

    )
  
}

export default App;

