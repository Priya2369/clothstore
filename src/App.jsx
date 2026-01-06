import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Fabrics from './pages/Fabrics'
import CustomStitching from './pages/CustomStitching'
import ReadyMade from './pages/ReadyMade'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="fabrics" element={<Fabrics />} />
          <Route path="custom-stitching" element={<CustomStitching />} />
          <Route path="ready-made" element={<ReadyMade />} />
          <Route path="ready-made/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
