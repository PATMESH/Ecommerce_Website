import Home from './components/Home';
import { AddProducts } from './components/AddProducts';
import { BrowserRouter ,  Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar'

import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/Home' Component={Home}></Route>
        <Route path='/AddProducts' Component={AddProducts}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
