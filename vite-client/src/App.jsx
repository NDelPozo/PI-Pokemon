import './App.css';
import Home from '../components/home';
import Landing from '../components/Landing'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function App  (){
  return (
    <div >
      <Routes>
      <Route path = '/' element={<Landing/>}/>
        <Route path = '/home' element={<Home/>}/>

      </Routes>
    </div>
  );
}

export default App;
