import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/ui/Button'

function Cart() {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you have not added anything to your cart yet. Start shopping
            to fill it up!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ready-made">
              <Button>Shop Ready-Made</Button>
            </Link>
            <Link to="/custom-stitching">
              <Button variant="outline">Custom Stitching</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {items.map((item, index) => (
                <CartItem key={`${item.id}-${item.type}-${item.size}-${index}`} item={item} />
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/ready-made"
              className="inline-block mt-6 text-primary-600 hover:text-primary-700 font-medium"
            >
              &larr; Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
