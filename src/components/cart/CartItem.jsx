import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, item.type, item.size, newQuantity)
  }

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Custom
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.type === 'custom' ? (
                <>
                  Custom Order
                  {item.fabric && ` • ${item.fabric.name}`}
                </>
              ) : (
                <>Size: {item.size}</>
              )}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id, item.type, item.size)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          {item.type !== 'custom' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Qty: 1</span>
          )}

          {/* Price */}
          <span className="font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
