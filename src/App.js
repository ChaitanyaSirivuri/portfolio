import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Blogs from './components/Blogs'
import './App.scss'
import 'animate.css'
import { Route, Routes } from 'react-router-dom'
import Contact from './components/Contact'
//bharat
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
