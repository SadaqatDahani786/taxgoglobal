import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import Home from './Pages/Home'
import TaxCalculator from './Pages/TaxCalculator';
import TaxCalculatorDetails from './Pages/TaxCalculatorDetails';

function App() {
  return (
    <Router>
      <div className="App">              
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/tax-calculator' element={<TaxCalculator/>} exact/>
        <Route path='/tax-calculator/:country' element={<TaxCalculatorDetails/>} exact/>
      </Routes>                        
      </div>
    </Router>
  );
}

export default App;
