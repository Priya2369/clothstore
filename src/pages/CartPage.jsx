import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Container, Button } from '../components/ui'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <Container className="section-padding">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
            Start shopping to fill it up!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/ready-made">Shop Ready-Made</Button>
            <Button to="/custom-stitching" variant="outline">
              Custom Stitching
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 md:py-16">
        <Container>
          <h1 className="heading-primary text-center">Shopping Cart</h1>
        </Container>
      </section>

      <section className="section-padding bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">{items.length} item(s) in cart</p>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear Cart
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row gap-4"
                >
                  {/* Image */}
                  {item.type === 'ready-made' ? (
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>
                  ) : (
                    <div className="w-full sm:w-32 h-32 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-medium text-sm text-center px-2">
                        Custom Order
                      </span>
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.type === 'ready-made' ? (
                          <p className="text-sm text-gray-500">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {item.dressType?.name} - Custom Measurements
                          </p>
                        )}
                      </div>
                      <p className="text-primary-600 font-bold text-lg">
                        Rs.{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Custom Order Details */}
                    {item.type === 'custom' && item.measurements && (
                      <div className="mt-2 text-sm text-gray-500">
                        <p className="mb-1">Measurements:</p>
                        <div className="flex flex-wrap gap-x-4">
                          {Object.entries(item.measurements).slice(0, 4).map(([key, value]) => (
                            <span key={key}>
                              {key.replace(/-/g, ' ')}: {value}"
                            </span>
                          ))}
                          {Object.keys(item.measurements).length > 4 && (
                            <span>+{Object.keys(item.measurements).length - 4} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="text-red-500 hover:text-red-600 p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold text-xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs.{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (Included)</span>
                    <span className="font-medium">-</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">Rs.{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button to="/checkout" size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="ml-2" size={20} />
                </Button>

                <div className="mt-4 text-center">
                  <Link to="/ready-made" className="text-sm text-primary-600 hover:underline">
                    Continue Shopping
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Have a promo code?</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default CartPage
