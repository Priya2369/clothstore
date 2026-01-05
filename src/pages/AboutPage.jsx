import { Users, Award, Heart, Clock } from 'lucide-react'
import { Container } from '../components/ui'

function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every stitch is a testament to our commitment to excellence. We use only the finest materials and techniques.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen, understand, and deliver exactly what you envision.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our skilled tailors bring decades of experience and passion to every garment they create.',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We respect your time and ensure your orders are completed and delivered as promised.',
    },
  ]

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & Master Tailor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      description: 'With over 35 years of experience in traditional and modern tailoring.',
    },
    {
      name: 'Sunita Devi',
      role: 'Head Designer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      description: 'Specializing in bridal wear and contemporary fusion designs.',
    },
    {
      name: 'Amit Singh',
      role: 'Production Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      description: 'Ensuring every piece meets our high quality standards.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">About ClothStore</h1>
            <p className="text-lg text-gray-600">
              A legacy of fine tailoring, passed down through generations
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-secondary mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ClothStore was founded in 1990 with a simple vision: to bring the art of
                  bespoke tailoring to everyone. What started as a small shop in the heart
                  of the city has grown into a trusted name in custom clothing.
                </p>
                <p>
                  Our founder, Rajesh Kumar, learned the craft from his father and grandfather,
                  inheriting not just skills but a deep respect for quality and attention to detail.
                  Today, that tradition continues as we blend time-honored techniques with modern
                  designs and convenience.
                </p>
                <p>
                  We believe that perfectly fitted clothes have the power to transform how you
                  feel. That's why we pour our expertise and passion into every garment, whether
                  it's a simple everyday kurti or an elaborate bridal lehenga.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600"
                alt="Tailoring craftsmanship"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The talented people behind every beautiful creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mb-4 relative inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-primary-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg opacity-90">
              To make custom tailoring accessible to everyone, combining traditional
              craftsmanship with modern convenience. We strive to create clothes that
              not only fit perfectly but also reflect the unique personality and style
              of each customer.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default AboutPage
