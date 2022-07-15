import './App.css';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//UI Components
import Header from './Components/Header';
import Footer from './Components/Footer';

//Pages
import Home from './Pages/Home'
import TaxCalculator from './Pages/TaxCalculator';
import TaxCalculatorDetails from './Pages/TaxCalculatorDetails';

/*
** **
** ** ** STYLED COMPONENTS
** **
*/
//Main
const Main = styled.main`
  max-width: 1200px;
  min-height: 50vh;
  margin: 0 auto;
`

/*
** **
** ** ** COMPONENT [App]
** **
*/
function App() {
  return (
    <Router>
      <div className="App">              
      <Header/>      
      <Main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/tax-calculator' element={<TaxCalculator/>} exact/>
          <Route path='/tax-calculator/:country' element={<TaxCalculatorDetails/>} exact/>
        </Routes>
      </Main>                        
      <Footer/>      
      </div>      
    </Router>
  );
}

export default App;
