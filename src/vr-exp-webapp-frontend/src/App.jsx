import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import OwnedPage from './pages/Owned';
import BuyPage from './pages/Buy';
import SellPage from './pages/Sell';
import TransactionPage from './pages/Transaction';

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
          <Route path="/home" element={<Home />} >
            <Route index element={<OwnedPage />}></Route>
            <Route path='buy' element={<BuyPage />}></Route>
            <Route path='sell' element={<SellPage />}></Route>
            <Route path='transaction' element={<TransactionPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
