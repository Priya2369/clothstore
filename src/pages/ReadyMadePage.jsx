import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Grid, List, X } from 'lucide-react'
import { Container, Card, Button } from '../components/ui'
import { products, categories, priceRanges, sizes } from '../data/products'

function ReadyMadePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedSize, setSelectedSize] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

    const priceRange = priceRanges.find(r => r.id === selectedPriceRange)
    const matchesPrice = !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max)

    const matchesSize = selectedSize === 'All' || product.sizes.includes(selectedSize)

    return matchesSearch && matchesCategory && matchesPrice && matchesSize
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b.featured - a.featured
    }
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSelectedSize('All')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' || selectedSize !== 'All'

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Ready-Made Collection</h1>
            <p className="text-lg text-gray-600">
              Discover our curated collection of designer outfits ready to wear
            </p>
          </div>
        </Container>
      </section>

      {/* Filters & Products */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700">{cat.name}</span>
                        <span className="text-gray-400 text-sm">({cat.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === range.id}
                          onChange={() => setSelectedPriceRange(range.id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...sizes].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          selectedSize === size
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-300 hover:border-primary-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Sort Bar */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter size={20} />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">!</span>
                    )}
                  </button>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'hover:bg-gray-50'}`}
                      aria-label="Grid view"
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'hover:bg-gray-50'}`}
                      aria-label="List view"
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <div className="lg:hidden mt-4 pt-4 border-t space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Filters</h3>
                      <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                        <X size={20} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.count})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                      <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                      >
                        {priceRanges.map((range) => (
                          <option key={range.id} value={range.id}>{range.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                      >
                        <option value="All">All Sizes</option>
                        {sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
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
              </div>

              {/* Results Count */}
              <p className="text-gray-600 mb-4">{sortedProducts.length} products found</p>

              {/* Products Grid/List */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
                  <button
                    onClick={clearFilters}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    Clear filters and try again
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <Card className="h-full">
                        <div className="relative">
                          <Card.Image src={product.images[0]} alt={product.name} />
                          {product.originalPrice > product.price && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                              Sale
                            </span>
                          )}
                        </div>
                        <Card.Content>
                          <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-primary-600 font-bold text-lg">
                              Rs.{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-gray-400 line-through text-sm">
                                Rs.{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Sizes: {product.sizes.join(', ')}
                          </p>
                        </Card.Content>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <Card className="flex flex-col sm:flex-row overflow-hidden">
                        <div className="sm:w-48 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 sm:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-primary-600 font-bold text-lg">
                              Rs.{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-gray-400 line-through text-sm">
                                Rs.{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">Sizes: {product.sizes.join(', ')}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default ReadyMadePage
