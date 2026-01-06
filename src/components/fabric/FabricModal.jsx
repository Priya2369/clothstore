import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Button from '../ui/Button'

function FabricModal({ fabric, onClose }) {
  if (!fabric) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image with Zoom */}
          <div className="relative bg-gray-100 aspect-square lg:aspect-auto lg:h-[500px]">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                    <button
                      onClick={() => zoomIn()}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: fabric.colorHex }}
                />
                <span className="text-sm text-gray-500">{fabric.color}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                {fabric.name}
              </h2>

              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 mb-4">
                {fabric.type}
              </span>

              <p className="text-gray-600 mb-6">{fabric.description}</p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-600">Price per meter</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${fabric.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Availability</span>
                  <span className={fabric.inStock ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {fabric.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Material</span>
                  <span className="text-gray-900">{fabric.type}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full"
                disabled={!fabric.inStock}
                onClick={onClose}
              >
                {fabric.inStock ? 'Select This Fabric' : 'Out of Stock'}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">
                Use pinch or scroll to zoom. Drag to pan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FabricModal
