import { useState, useMemo } from 'react'
import { Filter, SortAsc } from 'lucide-react'
import { products, productCategories } from '../data/products'
import ProductCard from '../components/product/ProductCard'

function ReadyMade() {
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (filterCategory !== 'All') {
      result = result.filter((p) => p.category === filterCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return result
  }, [filterCategory, sortBy])

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready-Made Collection
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our curated collection of ready-to-wear outfits. Premium
            quality, stylish designs, and perfect fits await you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter/Sort Bar */}
          <div className="lg:hidden flex gap-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-gray-100 py-3 px-4 rounded-lg"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filterCategory === category}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort (Desktop) */}
              <div className="hidden lg:block">
                <h3 className="font-medium text-gray-700 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              {filterCategory !== 'All' && (
                <button
                  onClick={() => setFilterCategory('All')}
                  className="w-full py-2 mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} product
                {filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={() => setFilterCategory('All')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadyMade
