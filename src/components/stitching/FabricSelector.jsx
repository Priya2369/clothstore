import { fabrics } from '../../data/fabrics'

function FabricSelector({ selectedFabric, onSelect, meters = 1, onMetersChange }) {
  const availableFabrics = fabrics.filter((f) => f.inStock)

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-900 mb-2">
        Choose Fabric
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Select a fabric from our collection for your custom dress.
      </p>

      {/* Fabric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {availableFabrics.map((fabric) => (
          <button
            key={fabric.id}
            onClick={() => onSelect(fabric)}
            className={`text-left rounded-lg overflow-hidden border-2 transition-all ${
              selectedFabric?.id === fabric.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="relative aspect-square">
              <img
                src={fabric.image}
                alt={fabric.name}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: fabric.colorHex }}
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {fabric.name}
              </h3>
              <p className="text-primary-600 text-sm">
                ${fabric.price.toFixed(2)}/m
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Quantity Selector */}
      {selectedFabric && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">{selectedFabric.name}</h3>
              <p className="text-sm text-gray-500">{selectedFabric.type}</p>
            </div>
            <span
              className="w-8 h-8 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: selectedFabric.colorHex }}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Meters needed:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onMetersChange(Math.max(1, meters - 0.5))}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={meters}
                onChange={(e) => onMetersChange(Math.max(1, parseFloat(e.target.value) || 1))}
                min="1"
                step="0.5"
                className="w-20 text-center input py-1"
              />
              <button
                type="button"
                onClick={() => onMetersChange(meters + 0.5)}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fabric cost:</span>
              <span className="font-medium text-gray-900">
                ${(selectedFabric.price * meters).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FabricSelector
