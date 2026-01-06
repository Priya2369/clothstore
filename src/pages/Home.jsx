import { Link } from 'react-router-dom'
import { Scissors, Shirt, Sparkles, Truck } from 'lucide-react'
import Button from '../components/ui/Button'

function Home() {
  const features = [
    {
      icon: Scissors,
      title: 'Expert Tailoring',
      description: 'Precision cutting and stitching by master craftsmen with years of experience.',
    },
    {
      icon: Shirt,
      title: 'Quality Fabrics',
      description: 'Hand-picked premium fabrics from the finest mills around the world.',
    },
    {
      icon: Sparkles,
      title: 'Custom Designs',
      description: 'Bring your vision to life with personalized designs and perfect fits.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Reliable delivery service to get your garments to you on time.',
    },
  ]

  const categories = [
    {
      title: 'Browse Fabrics',
      description: 'Explore our collection of premium fabrics',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
      link: '/fabrics',
    },
    {
      title: 'Custom Stitching',
      description: 'Get your perfect fit with custom tailoring',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
      link: '/custom-stitching',
    },
    {
      title: 'Ready-Made',
      description: 'Shop our ready-to-wear collection',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      link: '/ready-made',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Crafting Elegance,{' '}
              <span className="text-primary-600">One Stitch at a Time</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the art of bespoke tailoring. From premium fabrics to perfect
              fits, we bring your fashion dreams to life with expert craftsmanship
              and personalized service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/custom-stitching">
                <Button size="lg">Start Custom Order</Button>
              </Link>
              <Link to="/ready-made">
                <Button variant="outline" size="lg">
                  Shop Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ClothStore?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern convenience to deliver
              an exceptional tailoring experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you need custom tailoring or ready-made fashion, we have
              something for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.link}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-xl font-semibold mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Create Your Perfect Outfit?
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Whether you are looking for a custom-tailored piece or a ready-made
            design, we are here to help you look your best.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
