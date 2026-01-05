import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronLeft, Upload, X, HelpCircle, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Card } from '../components/ui'
import { dressTypes, measurementGuide } from '../data/dressTypes'
import { useCart } from '../context/CartContext'

function CustomStitchingPage() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDressType, setSelectedDressType] = useState(null)
  const [measurements, setMeasurements] = useState({})
  const [referenceImages, setReferenceImages] = useState([])
  const [notes, setNotes] = useState('')
  const [showTooltip, setShowTooltip] = useState(null)
  const fileInputRef = useRef(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const steps = [
    { number: 1, title: 'Select Dress Type' },
    { number: 2, title: 'Enter Measurements' },
    { number: 3, title: 'Add References' },
    { number: 4, title: 'Review & Confirm' },
  ]

  const handleDressTypeSelect = (dressType) => {
    setSelectedDressType(dressType)
    setMeasurements({})
    reset()
  }

  const handleMeasurementSubmit = (data) => {
    setMeasurements(data)
    setCurrentStep(3)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    setReferenceImages(prev => [...prev, ...newImages].slice(0, 5))
  }

  const removeImage = (index) => {
    setReferenceImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleAddToCart = () => {
    const customOrder = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: `Custom ${selectedDressType.name}`,
      dressType: selectedDressType,
      measurements,
      referenceImages: referenceImages.map(img => img.name),
      notes,
      price: selectedDressType.basePrice,
      quantity: 1,
    }

    addItem(customOrder)
    navigate('/cart')
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Custom Stitching</h1>
            <p className="text-lg text-gray-600">
              Create your perfect outfit with our custom tailoring service. Follow the steps below.
            </p>
          </div>
        </Container>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <Container className="py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle size={20} /> : step.number}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Step Content */}
      <section className="section-padding bg-gray-50">
        <Container>
          {/* Step 1: Select Dress Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="heading-secondary mb-8 text-center">Select Dress Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {dressTypes.map((dress) => (
                  <Card
                    key={dress.id}
                    className={`cursor-pointer transition-all ${
                      selectedDressType?.id === dress.id
                        ? 'ring-2 ring-primary-600'
                        : ''
                    }`}
                    onClick={() => handleDressTypeSelect(dress)}
                  >
                    <Card.Image src={dress.image} alt={dress.name} />
                    <Card.Content>
                      <h3 className="font-semibold text-lg mb-1">{dress.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{dress.description}</p>
                      <p className="text-primary-600 font-semibold">
                        Starting from Rs.{dress.basePrice}
                      </p>
                    </Card.Content>
                  </Card>
                ))}
              </div>

              {selectedDressType && (
                <div className="mt-8 text-center">
                  <Button onClick={() => setCurrentStep(2)} size="lg">
                    Continue with {selectedDressType.name}
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Enter Measurements */}
          {currentStep === 2 && selectedDressType && (
            <div className="max-w-2xl mx-auto">
              <h2 className="heading-secondary mb-2 text-center">Enter Your Measurements</h2>
              <p className="text-gray-600 text-center mb-8">
                All measurements should be in inches. Hover over the help icon for guidance.
              </p>

              <form onSubmit={handleSubmit(handleMeasurementSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedDressType.measurements.map((measurement) => (
                    <div key={measurement.id}>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        {measurement.name}
                        {measurement.required && <span className="text-red-500">*</span>}
                        <button
                          type="button"
                          className="relative"
                          onMouseEnter={() => setShowTooltip(measurement.id)}
                          onMouseLeave={() => setShowTooltip(null)}
                          onClick={() => setShowTooltip(showTooltip === measurement.id ? null : measurement.id)}
                        >
                          <HelpCircle size={16} className="text-gray-400" />
                          {showTooltip === measurement.id && (
                            <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg z-10">
                              {measurementGuide[measurement.id] || 'Enter your measurement in inches'}
                            </div>
                          )}
                        </button>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          {...register(measurement.id, {
                            required: measurement.required && `${measurement.name} is required`,
                            min: { value: 1, message: 'Must be at least 1 inch' },
                            max: { value: 100, message: 'Must be less than 100 inches' },
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors[measurement.id] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={measurement.placeholder}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          {measurement.unit}
                        </span>
                      </div>
                      {errors[measurement.id] && (
                        <p className="mt-1 text-sm text-red-600">{errors[measurement.id].message}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ChevronLeft className="mr-2" size={20} />
                    Back
                  </Button>
                  <Button type="submit">
                    Continue
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Add References */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="heading-secondary mb-2 text-center">Add Reference Images</h2>
              <p className="text-gray-600 text-center mb-8">
                Upload design inspirations or reference images (optional, max 5 images)
              </p>

              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">
                    PNG, JPG, JPEG up to 5MB each
                  </p>
                </div>

                {/* Preview Images */}
                {referenceImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {referenceImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview}
                          alt={`Reference ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Any specific requirements, preferred style, or additional instructions..."
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ChevronLeft className="mr-2" size={20} />
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Review Order
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && selectedDressType && (
            <div className="max-w-2xl mx-auto">
              <h2 className="heading-secondary mb-8 text-center">Review Your Order</h2>

              <Card className="p-6 md:p-8">
                {/* Dress Type */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-lg mb-4">Dress Type</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDressType.image}
                      alt={selectedDressType.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{selectedDressType.name}</p>
                      <p className="text-primary-600 font-semibold">
                        Rs.{selectedDressType.basePrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Measurements */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-lg mb-4">Measurements</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedDressType.measurements.map((m) => (
                      <div key={m.id} className="flex justify-between">
                        <span className="text-gray-600">{m.name}:</span>
                        <span className="font-medium">{measurements[m.id] || 'N/A'} {m.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reference Images */}
                {referenceImages.length > 0 && (
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-lg mb-4">Reference Images</h3>
                    <div className="flex gap-2 flex-wrap">
                      {referenceImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.preview}
                          alt={`Reference ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {notes && (
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
                    <p className="text-gray-600">{notes}</p>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold mb-6">
                  <span>Total</span>
                  <span className="text-primary-600">Rs.{selectedDressType.basePrice}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(3)}
                  >
                    <ChevronLeft className="mr-2" size={20} />
                    Edit Order
                  </Button>
                  <Button className="flex-1" onClick={handleAddToCart}>
                    Add to Cart
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}

export default CustomStitchingPage
