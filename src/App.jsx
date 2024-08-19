import logo from './logo.svg';
import './App.css';
import Info from './components/Info';
import Nav from './components/Nav';
import About from './components/About';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
//import Contact from './components/Contact';
import { BrowserRouter } from 'react-router-dom';
import Contact from './components/Contact';
import Socials from './components/Socials';

function App() {
  const h = window.innerHeight;

  return (
    <BrowserRouter>
      <div className="bg-blue px-8 md:px-0 text-white">
        <Nav />
        <Info />
        <div id="about">
          <About />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        {h < 1000 ? <div className='h-1/2 w-full'></div> : ""}
        <div id="contact">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;