import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import OwnedPage from './pages/Owned';
import BuyPage from './pages/Buy';
import SellPage from './pages/Sell';
import TransactionPage from './pages/Transaction';
import CreatePage from './pages/Create';

function App() {

  return (
    <div className="absolute">
      <div className="bg-gd-l"></div>
      <div className="bg-gd-r"></div>
      <div className="gd-l"></div>
      <div className="gd-r"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="home" element={<Home />} >
            <Route index element={<OwnedPage />}></Route>
            <Route path='buy' element={<BuyPage />}></Route>
            <Route path='sell' element={<SellPage />}></Route>
            <Route path='transaction' element={<TransactionPage />}></Route>
          </Route>
          <Route path='create' element={<CreatePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
