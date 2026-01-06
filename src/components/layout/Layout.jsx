import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useCart } from '../../context/CartContext'

function Layout() {
  const { notification } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}

export default Layout
