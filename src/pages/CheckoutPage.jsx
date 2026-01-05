import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft, CreditCard, Truck, CheckCircle, Package } from 'lucide-react'
import { Container, Button } from '../components/ui'
import { useCart } from '../context/CartContext'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const watchedFields = watch()

  if (items.length === 0 && !orderPlaced) {
    return (
      <Container className="section-padding text-center">
        <h1 className="text-2xl font-bold mb-4">No Items to Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty. Add some items first.</p>
        <Button to="/ready-made">Continue Shopping</Button>
      </Container>
    )
  }

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(2)
    } else {
      // Place order
      const newOrderId = `ORD-${Date.now()}`
      setOrderId(newOrderId)
      setOrderPlaced(true)
      clearCart()
    }
  }

  if (orderPlaced) {
    return (
      <Container className="section-padding">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-lg font-medium mb-8">
            Order ID: <span className="text-primary-600">{orderId}</span>
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <Package className="text-primary-600 mt-0.5" size={20} />
                <span>You'll receive an order confirmation email shortly.</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="text-primary-600 mt-0.5" size={20} />
                <span>We'll notify you when your order ships.</span>
              </li>
              <li className="flex items-start gap-3">
                <CreditCard className="text-primary-600 mt-0.5" size={20} />
                <span>
                  {paymentMethod === 'cod'
                    ? 'Payment will be collected upon delivery.'
                    : 'Your payment has been processed.'}
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/">Back to Home</Button>
            <Button to="/ready-made" variant="outline">Continue Shopping</Button>
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
          <h1 className="heading-primary text-center">Checkout</h1>
        </Container>
      </section>

      <section className="section-padding bg-gray-50">
        <Container>
          {/* Progress */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="text-sm mt-1">Details</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="text-sm mt-1">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="font-bold text-xl mb-6">Shipping Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          {...register('phone', { required: 'Phone is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('address', { required: 'Address is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Street address"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('city', { required: 'City is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('state', { required: 'State is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('pincode', { required: 'PIN code is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                            errors.pincode ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.pincode && (
                          <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" to="/cart">
                        <ChevronLeft className="mr-2" size={20} />
                        Back to Cart
                      </Button>
                      <Button type="submit">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="font-bold text-xl mb-6">Payment Method</h2>

                    <div className="space-y-4">
                      <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary-600"
                        />
                        <Truck size={24} className="text-gray-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </label>

                      <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary-600"
                        />
                        <CreditCard size={24} className="text-gray-600" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </label>

                      {paymentMethod === 'card' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 text-center">
                            Card payment integration coming soon. Please use Cash on Delivery for now.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        <ChevronLeft className="mr-2" size={20} />
                        Back
                      </Button>
                      <Button type="submit">
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold text-xl mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-3">
                      {item.type === 'ready-made' ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-primary-600 text-center">Custom</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary-600">
                          Rs.{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs.{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-primary-600">Rs.{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Shipping Address Preview */}
                {step === 2 && watchedFields.firstName && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-2">Shipping to:</h3>
                    <p className="text-sm text-gray-600">
                      {watchedFields.firstName} {watchedFields.lastName}<br />
                      {watchedFields.address}<br />
                      {watchedFields.city}, {watchedFields.state} {watchedFields.pincode}<br />
                      Phone: {watchedFields.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default CheckoutPage
