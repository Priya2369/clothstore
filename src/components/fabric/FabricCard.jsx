function FabricCard({ fabric, onSelect }) {
  return (
    <div
      className="card cursor-pointer group"
      onClick={() => onSelect(fabric)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={fabric.image}
          alt={fabric.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!fabric.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className="w-6 h-6 rounded-full border-2 border-white shadow-md inline-block"
            style={{ backgroundColor: fabric.colorHex }}
            title={fabric.color}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{fabric.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{fabric.type}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary-600">
            ${fabric.price.toFixed(2)}
            <span className="text-sm font-normal text-gray-500">/meter</span>
          </span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            {fabric.color}
          </span>
        </div>
      </div>
    </div>
  )
}

export default FabricCard
