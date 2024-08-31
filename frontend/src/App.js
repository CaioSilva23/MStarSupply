import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Mercadorias from "./pages/mercadorias/Mercadorias"
import Operacoes from "./pages/operacoes/Operacoes"


function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/operacoes' exact element={<Operacoes />}></Route>
        <Route path='/mercadorias' exact element={<Mercadorias />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
