import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Page1, Page2, Page3 } from './components/Pages'
import Menu from './components/Menu'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/page1/" element={<Page1 />} />
        <Route path="/page2/" element={<Page2 />} />
        <Route path="/page3/" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

