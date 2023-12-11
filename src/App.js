import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [pageSize] = useState(10);
  const [progress, setProgress] = useState(0);
  const [apikey] = useState(process.env.REACT_APP_NEWS_API);

    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<News apikey={apikey} setProgress={setProgress}  pageSize={pageSize} country={'in'} category={'general'}/>}></Route>
            <Route exact path='/business' element={<News apikey={apikey} setProgress={setProgress}  key={'business'}  pageSize={pageSize} country={'in'} category={'business'}/>}></Route>
            <Route exact path='/entertainment' element={<News apikey={apikey} setProgress={setProgress}  key={'entertainment'} pageSize={pageSize} country={'in'} category={'entertainment'}/>}></Route>
            <Route exact path='/health' element={<News apikey={apikey} setProgress={setProgress}  key={'health'} pageSize={pageSize} country={'in'} category={'health'}/>}></Route>
            <Route exact path='/science' element={<News apikey={apikey} setProgress={setProgress}  key={'science'} pageSize={pageSize} country={'in'} category={'science'}/>}></Route>
            <Route exact path='/sports' element={<News apikey={apikey} setProgress={setProgress}  key={'sports'} pageSize={pageSize} country={'in'} category={'sports'}/>}></Route>
            <Route exact path='/technology' element={<News apikey={apikey} setProgress={setProgress}  key={'technology'} pageSize={pageSize} country={'in'} category={'technology'}/>}></Route>
            <Route exact path='/general' element={<News apikey={apikey} setProgress={setProgress}  key={'general'} pageSize={pageSize} country={'in'} category={'general'}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
}

export default App;