import { Link } from 'react-router-dom'
import { ArrowRight, Scissors, Shirt, Palette, Star } from 'lucide-react'
import { Container, Button, Card } from '../components/ui'
import { products } from '../data/products'

function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3)

  const services = [
    {
      icon: Palette,
      title: 'Browse Fabrics',
      description: 'Explore our collection of premium fabrics with zoom functionality',
      link: '/fabrics',
    },
    {
      icon: Scissors,
      title: 'Custom Stitching',
      description: 'Get perfectly fitted clothes tailored to your measurements',
      link: '/custom-stitching',
    },
    {
      icon: Shirt,
      title: 'Ready-Made',
      description: 'Shop our collection of ready-to-wear designer outfits',
      link: '/ready-made',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200')] opacity-5 bg-cover bg-center" />
        <Container className="relative py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="heading-primary mb-6">
              Crafting Elegance,{' '}
              <span className="text-primary-600">Stitch by Stitch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Experience the art of bespoke tailoring with premium fabrics and expert craftsmanship.
              From custom-fitted dresses to ready-made collections, we bring your fashion dreams to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/custom-stitching" size="lg">
                Start Custom Order
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button to="/ready-made" variant="outline" size="lg">
                Shop Ready-Made
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From fabric selection to final fitting, we offer complete tailoring solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group"
                >
                  <Card className="p-8 text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-secondary mb-2">Featured Collection</h2>
              <p className="text-gray-600">Handpicked designs for every occasion</p>
            </div>
            <Button to="/ready-made" variant="outline">
              View All
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card>
                  <Card.Image src={product.images[0]} alt={product.name} />
                  <Card.Content>
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
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Why Choose ClothStore</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of customers for quality and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '30+', label: 'Years Experience' },
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Fabric Varieties' },
              { number: '100%', label: 'Quality Guarantee' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary-600 text-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                review: 'The custom blouse fitting was perfect! The attention to detail and quality of stitching exceeded my expectations.',
              },
              {
                name: 'Anjali Patel',
                review: 'I ordered my wedding lehenga from ClothStore. The craftsmanship was exceptional and it arrived exactly as promised.',
              },
              {
                name: 'Meera Reddy',
                review: 'Great collection of fabrics and the zoom feature helped me see the texture clearly. Very professional service.',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 opacity-90">{testimonial.review}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-secondary mb-4">
              Ready to Create Your Perfect Outfit?
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you need custom tailoring or want to shop our ready-made collection,
              we're here to help you look your best.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/custom-stitching" size="lg">
                Start Custom Order
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
