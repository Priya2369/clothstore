import { useState } from 'react'
import { Filter } from 'lucide-react'
import { fabrics, fabricTypes, fabricColors } from '../data/fabrics'
import FabricCard from '../components/fabric/FabricCard'
import FabricModal from '../components/fabric/FabricModal'

function Fabrics() {
  const [selectedFabric, setSelectedFabric] = useState(null)
  const [filterType, setFilterType] = useState('All')
  const [filterColor, setFilterColor] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredFabrics = fabrics.filter((fabric) => {
    const matchesType = filterType === 'All' || fabric.type === filterType
    const matchesColor = filterColor === 'All' || fabric.color === filterColor
    return matchesType && matchesColor
  })

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Fabrics
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our collection of premium fabrics. Click on any fabric to view
            details and zoom in to see the texture and quality.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">Filters</h2>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Fabric Type</h3>
                <div className="space-y-2">
                  {fabricTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={filterType === type}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Color</h3>
                <div className="space-y-2">
                  {fabricColors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={filterColor === color}
                        onChange={(e) => setFilterColor(e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-600">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(filterType !== 'All' || filterColor !== 'All') && (
                <button
                  onClick={() => {
                    setFilterType('All')
                    setFilterColor('All')
                  }}
                  className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Fabric Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredFabrics.length} fabric{filteredFabrics.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredFabrics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No fabrics match your filters.</p>
                <button
                  onClick={() => {
                    setFilterType('All')
                    setFilterColor('All')
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFabrics.map((fabric) => (
                  <FabricCard
                    key={fabric.id}
                    fabric={fabric}
                    onSelect={setSelectedFabric}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fabric Modal */}
      {selectedFabric && (
        <FabricModal
          fabric={selectedFabric}
          onClose={() => setSelectedFabric(null)}
        />
      )}
    </div>
  )
}

export default Fabrics
