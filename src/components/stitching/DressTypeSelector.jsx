const dressTypes = [
  {
    id: 'saree-blouse',
    name: 'Saree Blouse',
    description: 'Traditional blouse for sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=200&fit=crop',
    basePrice: 45,
  },
  {
    id: 'kurti',
    name: 'Kurti',
    description: 'Casual to semi-formal kurta',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=200&fit=crop',
    basePrice: 55,
  },
  {
    id: 'gown',
    name: 'Gown',
    description: 'Formal evening gown',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop',
    basePrice: 150,
  },
  {
    id: 'suit',
    name: 'Suit',
    description: 'Three-piece formal suit',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=200&fit=crop',
    basePrice: 200,
  },
  {
    id: 'lehenga',
    name: 'Lehenga',
    description: 'Traditional lehenga choli',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=200&fit=crop&hue=330',
    basePrice: 250,
  },
  {
    id: 'salwar-kameez',
    name: 'Salwar Kameez',
    description: 'Traditional salwar set',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=200&fit=crop',
    basePrice: 75,
  },
]

function DressTypeSelector({ selectedType, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
        Select Dress Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dressTypes.map((dress) => (
          <button
            key={dress.id}
            onClick={() => onSelect(dress)}
            className={`text-left rounded-xl overflow-hidden border-2 transition-all ${
              selectedType?.id === dress.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <img
              src={dress.image}
              alt={dress.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{dress.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{dress.description}</p>
              <p className="text-primary-600 font-medium">
                Starting from ${dress.basePrice}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DressTypeSelector
