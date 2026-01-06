import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import DressTypeSelector from '../components/stitching/DressTypeSelector'
import MeasurementForm from '../components/stitching/MeasurementForm'
import FabricSelector from '../components/stitching/FabricSelector'
import ReferenceUpload from '../components/stitching/ReferenceUpload'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'

const steps = [
  { id: 1, name: 'Dress Type' },
  { id: 2, name: 'Measurements' },
  { id: 3, name: 'Fabric' },
  { id: 4, name: 'References' },
  { id: 5, name: 'Review' },
]

function CustomStitching() {
  const [currentStep, setCurrentStep] = useState(1)
  const [dressType, setDressType] = useState(null)
  const [measurements, setMeasurements] = useState(null)
  const [selectedFabric, setSelectedFabric] = useState(null)
  const [fabricMeters, setFabricMeters] = useState(2)
  const [referenceImages, setReferenceImages] = useState([])
  const [notes, setNotes] = useState('')

  const { addItem } = useCart()

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return dressType !== null
      case 2:
        return measurements !== null
      case 3:
        return selectedFabric !== null
      case 4:
        return true // References are optional
      case 5:
        return true
      default:
        return false
    }
  }

  const calculateTotal = () => {
    let total = 0
    if (dressType) {
      total += dressType.basePrice
    }
    if (selectedFabric) {
      total += selectedFabric.price * fabricMeters
    }
    return total
  }

  const handleAddToCart = () => {
    const customOrder = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: `Custom ${dressType.name}`,
      dressType: dressType,
      measurements: measurements,
      fabric: selectedFabric,
      fabricMeters: fabricMeters,
      referenceImages: referenceImages.length,
      notes: notes,
      price: calculateTotal(),
      quantity: 1,
    }
    addItem(customOrder)
    // Reset form
    setCurrentStep(1)
    setDressType(null)
    setMeasurements(null)
    setSelectedFabric(null)
    setFabricMeters(2)
    setReferenceImages([])
    setNotes('')
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Custom Dress Stitching
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Create your perfect outfit with our custom tailoring service. Select
            your dress type, provide measurements, and choose your fabric.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex items-center justify-center overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={`flex items-center ${
                    step.id < currentStep ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  disabled={step.id > currentStep}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : step.id === currentStep
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </span>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-2 text-gray-300" />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
          {currentStep === 1 && (
            <DressTypeSelector
              selectedType={dressType}
              onSelect={setDressType}
            />
          )}

          {currentStep === 2 && dressType && (
            <MeasurementForm
              dressType={dressType.id}
              defaultValues={measurements}
              onSubmit={(data) => {
                setMeasurements(data)
                setCurrentStep(3)
              }}
            />
          )}

          {currentStep === 3 && (
            <FabricSelector
              selectedFabric={selectedFabric}
              onSelect={setSelectedFabric}
              meters={fabricMeters}
              onMetersChange={setFabricMeters}
            />
          )}

          {currentStep === 4 && (
            <ReferenceUpload
              existingImages={referenceImages}
              onUpload={setReferenceImages}
            />
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                Review Your Order
              </h2>

              <div className="space-y-6">
                {/* Dress Type */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Dress Type</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={dressType.image}
                      alt={dressType.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{dressType.name}</p>
                      <p className="text-sm text-gray-500">
                        Stitching charge: ${dressType.basePrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fabric */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Fabric</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedFabric.image}
                      alt={selectedFabric.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedFabric.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {fabricMeters} meters @ ${selectedFabric.price}/m = $
                        {(selectedFabric.price * fabricMeters).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Measurements Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Measurements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>{' '}
                        <span className="text-gray-900">{value}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* References */}
                {referenceImages.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Reference Images
                    </h3>
                    <p className="text-sm text-gray-600">
                      {referenceImages.length} image(s) uploaded
                    </p>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="input resize-none"
                    placeholder="Any special instructions or preferences..."
                  />
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="font-bold text-primary-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            currentStep !== 2 && (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
              >
                Continue
              </Button>
            )
          ) : (
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomStitching
