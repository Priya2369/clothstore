import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FabricsPage from './pages/FabricsPage'
import CustomStitchingPage from './pages/CustomStitchingPage'
import ReadyMadePage from './pages/ReadyMadePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/fabrics" element={<FabricsPage />} />
            <Route path="/custom-stitching" element={<CustomStitchingPage />} />
            <Route path="/ready-made" element={<ReadyMadePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App
