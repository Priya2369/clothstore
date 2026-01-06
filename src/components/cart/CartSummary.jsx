import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { useCart } from '../../context/CartContext'

function CartSummary({ showCheckoutButton = true }) {
  const { subtotal, itemCount } = useCart()

  const shipping = subtotal >= 100 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span className="text-gray-900">${shipping.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {subtotal < 100 && (
        <p className="text-xs text-gray-500 mt-4">
          Add ${(100 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}

      {showCheckoutButton && (
        <Link to="/checkout" className="block mt-6">
          <Button className="w-full" disabled={itemCount === 0}>
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  )
}

export default CartSummary
