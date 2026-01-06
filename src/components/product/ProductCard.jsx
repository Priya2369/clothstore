import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import Button from '../ui/Button'
import { useCart } from '../../context/CartContext'

function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Get first available size
    const availableSize = product.sizes.find(
      (size) => product.sizeAvailability[size]
    )

    if (availableSize) {
      addItem({
        id: product.id,
        type: 'ready-made',
        name: product.name,
        price: product.price,
        size: availableSize,
        image: product.images[0],
      })
    }
  }

  return (
    <Link to={`/ready-made/${product.id}`} className="card group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </span>
        )}
        {product.featured && !product.originalPrice && (
          <span className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        )}

        {/* Quick Add Button */}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
            aria-label="Quick add to cart"
          >
            <ShoppingCart className="w-5 h-5 text-primary-600" />
          </button>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-900 mt-1 mb-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2 flex gap-1">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
            >
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
