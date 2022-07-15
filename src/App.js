import './App.css';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//UI Components
import Header from './Components/Header';
import Footer from './Components/Footer';

//Pages
import Home from './Pages/Home'
import TaxCalculator from './Pages/TaxCalculator';

/*
** **
** ** ** STYLED COMPONENTS
** **
*/
//Main
const Main = styled.main`
  max-width: 1200px;
  min-height: 83vh;
  margin: 0 auto;
  padding: 40px 0;
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
          <Route path='/tax-calculator/:country' element={<TaxCalculator/>} exact/>          
        </Routes>
      </Main>                        
      <Footer/>      
      </div>      
    </Router>
  );
}

export default App;
