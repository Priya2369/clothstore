import { useState } from 'react'
import { Search, Filter, X, ZoomIn } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Container, Card, Button } from '../components/ui'
import { fabrics, fabricTypes, fabricColors } from '../data/fabrics'

function FabricDetailModal({ fabric, onClose }) {
  if (!fabric) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image with Zoom */}
        <div className="md:w-1/2 bg-gray-100 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 md:hidden"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={() => zoomIn()}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Zoom out"
                  >
                    <ZoomIn size={18} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-3 py-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-sm font-medium"
                  >
                    Reset
                  </button>
                </div>
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Pinch or scroll to zoom
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full hidden md:block"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: fabric.colorHex }}
            />
            <span className="text-gray-600">{fabric.color}</span>
          </div>

          <h2 className="text-2xl font-display font-bold mb-2">{fabric.name}</h2>
          <p className="text-primary-600 text-xl font-semibold mb-4">
            Rs.{fabric.pricePerMeter}/meter
          </p>

          <p className="text-gray-600 mb-6">{fabric.description}</p>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Material</span>
              <span className="font-medium">{fabric.material}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">{fabric.weight}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Width</span>
              <span className="font-medium">{fabric.width}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Care</span>
              <span className="font-medium">{fabric.careInstructions}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Availability</span>
              <span className={`font-medium ${
                fabric.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {fabric.availability}
              </span>
            </div>
          </div>

          <Button to="/custom-stitching" className="w-full">
            Use for Custom Order
          </Button>
        </div>
      </div>
    </div>
  )
}

function FabricsPage() {
  const [selectedFabric, setSelectedFabric] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedColor, setSelectedColor] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredFabrics = fabrics.filter((fabric) => {
    const matchesSearch = fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'All' || fabric.type === selectedType
    const matchesColor = selectedColor === 'All' ||
      fabric.color.toLowerCase().includes(selectedColor.toLowerCase())

    return matchesSearch && matchesType && matchesColor
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('All')
    setSelectedColor('All')
  }

  const hasActiveFilters = searchQuery || selectedType !== 'All' || selectedColor !== 'All'

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Fabric Collection</h1>
            <p className="text-lg text-gray-600">
              Browse our premium fabrics. Click on any fabric to view details and zoom in for texture.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm">
        <Container className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={20} />
              Filters
              {hasActiveFilters && (
                <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {fabricTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {fabricColors.map((color) => (
                  <option key={color} value={color}>
                    {color === 'All' ? 'All Colors' : color}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  {fabricTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  {fabricColors.map((color) => (
                    <option key={color} value={color}>
                      {color === 'All' ? 'All Colors' : color}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2.5 text-primary-600 border border-primary-600 rounded-lg font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Fabrics Grid */}
      <section className="section-padding bg-gray-50">
        <Container>
          {filteredFabrics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No fabrics found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:underline font-medium"
              >
                Clear filters and try again
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{filteredFabrics.length} fabrics found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFabrics.map((fabric) => (
                  <Card
                    key={fabric.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedFabric(fabric)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-full text-sm font-medium">
                          Click to zoom
                        </span>
                      </div>
                    </div>
                    <Card.Content>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: fabric.colorHex }}
                        />
                        <span className="text-sm text-gray-500">{fabric.color}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{fabric.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{fabric.description}</p>
                      <p className="text-primary-600 font-semibold">
                        Rs.{fabric.pricePerMeter}/meter
                      </p>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Modal */}
      {selectedFabric && (
        <FabricDetailModal
          fabric={selectedFabric}
          onClose={() => setSelectedFabric(null)}
        />
      )}
    </div>
  )
}

export default FabricsPage
