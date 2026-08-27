import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Programs from './pages/Programs'
import Results from './pages/Results'
import Trichology101 from './pages/Trichology101'
import TheMethod from './pages/TheMethod'
import Book from './pages/Book'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Policies from './pages/Policies'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/results" element={<Results />} />
        <Route path="/trichology-101" element={<Trichology101 />} />
        <Route path="/the-method" element={<TheMethod />} />
        <Route path="/book" element={<Book />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}
