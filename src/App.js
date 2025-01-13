import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Pastes from './components/Pastes';
import View from './components/View';


function App() {
  return (
    <BrowserRouter >
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/:id' element={<Home/>}/>
         <Route path='/pastes' element={<Pastes/>}/>
         <Route path='/pastes/:id' element={<View/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
