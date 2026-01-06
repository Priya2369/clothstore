function SizeSelector({ sizes, sizeAvailability, selectedSize, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Select Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isAvailable = sizeAvailability[size]
          const isSelected = selectedSize === size

          return (
            <button
              key={size}
              onClick={() => isAvailable && onSelect(size)}
              disabled={!isAvailable}
              className={`
                min-w-[48px] px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                    : isAvailable
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                }
              `}
            >
              {size}
            </button>
          )
        })}
      </div>
      {!sizes.some((size) => sizeAvailability[size]) && (
        <p className="mt-2 text-sm text-red-600">
          All sizes are currently out of stock
        </p>
      )}
    </div>
  )
}

export default SizeSelector
