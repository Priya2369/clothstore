import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Check, ChevronLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/ui/Button'

function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart, subtotal } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  const onSubmit = async (data) => {
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate order number
    const orderNum = `CLO-${Date.now().toString().slice(-8)}`
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-gray-600 mb-8">
            Your order number is:{' '}
            <span className="font-mono font-bold text-primary-600">
              {orderNumber}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            We have sent a confirmation email with order details. Our team will
            contact you shortly to confirm measurements and delivery details.
          </p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Cart
        </Link>

        <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      {...register('firstName', {
                        required: 'First name is required',
                      })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      {...register('lastName', {
                        required: 'Last name is required',
                      })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="input"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      className="input"
                      {...register('phone', {
                        required: 'Phone number is required',
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      className="input"
                      {...register('address', {
                        required: 'Address is required',
                      })}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      className="input"
                      {...register('address2')}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        className="input"
                        {...register('city', { required: 'City is required' })}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        className="input"
                        {...register('state', { required: 'State is required' })}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        className="input"
                        {...register('zip', { required: 'ZIP code is required' })}
                      />
                      {errors.zip && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">
                  Order Notes (Optional)
                </h2>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="Any special instructions for your order..."
                  {...register('notes')}
                />
              </div>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <CartSummary showCheckoutButton={false} />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary showCheckoutButton={false} />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4"
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
