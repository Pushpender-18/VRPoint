import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
