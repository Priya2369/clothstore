import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Heart, Ruler, X } from 'lucide-react'
import { Container, Button, Card } from '../components/ui'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function SizeChartModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Size Chart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Bust (inches)</th>
                <th className="px-4 py-3 text-left">Waist (inches)</th>
                <th className="px-4 py-3 text-left">Hip (inches)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: 'XS', bust: '32-33', waist: '24-25', hip: '34-35' },
                { size: 'S', bust: '34-35', waist: '26-27', hip: '36-37' },
                { size: 'M', bust: '36-37', waist: '28-29', hip: '38-39' },
                { size: 'L', bust: '38-40', waist: '30-32', hip: '40-42' },
                { size: 'XL', bust: '41-43', waist: '33-35', hip: '43-45' },
                { size: 'XXL', bust: '44-46', waist: '36-38', hip: '46-48' },
              ].map((row) => (
                <tr key={row.size} className="border-b">
                  <td className="px-4 py-3 font-medium">{row.size}</td>
                  <td className="px-4 py-3">{row.bust}</td>
                  <td className="px-4 py-3">{row.waist}</td>
                  <td className="px-4 py-3">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          For the best fit, measure yourself and compare with the chart above. If you're between sizes,
          we recommend going with the larger size.
        </p>
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = products.find(p => p.id === id)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <Container className="section-padding text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Button to="/ready-made">Back to Shop</Button>
      </Container>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem({
      id: product.id,
      type: 'ready-made',
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor || product.colors[0],
      quantity,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div>
      <Container className="section-padding">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/ready-made" className="hover:text-primary-600">Ready-Made</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {product.originalPrice > product.price && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
            <h1 className="text-3xl font-display font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                Rs.{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">
                  Rs.{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color: {selectedColor || product.colors[0]}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      (selectedColor || product.colors[0]) === color
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size: {selectedSize || 'Select a size'}</h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-primary-600 hover:underline flex items-center gap-1"
                >
                  <Ruler size={16} />
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                {addedToCart ? (
                  'Added!'
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <button
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                aria-label="Add to wishlist"
              >
                <Heart size={24} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="heading-secondary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card>
                    <Card.Image src={relatedProduct.images[0]} alt={relatedProduct.name} />
                    <Card.Content>
                      <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                      <span className="text-primary-600 font-bold">
                        Rs.{relatedProduct.price.toLocaleString()}
                      </span>
                    </Card.Content>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Size Chart Modal */}
      {showSizeChart && <SizeChartModal onClose={() => setShowSizeChart(false)} />}
    </div>
  )
}

export default ProductDetailPage
