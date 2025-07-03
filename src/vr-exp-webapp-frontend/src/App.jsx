import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import "./index.css"

function App() {

  return (
    <div className="absolute">
      <div class="bg-gd-l"></div>
      <div class="bg-gd-r"></div>
      <div class="gd-l"></div>
      <div class="gd-r"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
