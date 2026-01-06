import { Award, Users, Heart, Clock } from 'lucide-react'

function About() {
  const stats = [
    { icon: Clock, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Heart, value: '100%', label: 'Satisfaction Rate' },
  ]

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Master Tailor & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    },
    {
      name: 'Raj Patel',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    },
    {
      name: 'Anita Kumar',
      role: 'Fabric Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-50 to-primary-50 py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded with a passion for craftsmanship and an eye for detail,
              ClothStore has been creating beautiful garments and unforgettable
              experiences for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=500&fit=crop"
                alt="Our workshop"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ClothStore was born from a simple belief: everyone deserves
                  clothing that fits perfectly and makes them feel confident.
                  What started as a small tailoring shop has grown into a
                  trusted destination for quality fashion.
                </p>
                <p>
                  Our team of skilled artisans brings together traditional
                  techniques and modern innovation. Each piece we create is a
                  testament to our commitment to quality and attention to detail.
                </p>
                <p>
                  We source the finest fabrics from around the world and
                  transform them into garments that tell your unique story.
                  Whether it is a wedding outfit or everyday wear, we treat
                  every order with the same dedication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our talented team of professionals is dedicated to bringing your
              fashion visions to life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on materials or craftsmanship. Every stitch
                matters.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Honest pricing, transparent processes, and genuine care for our
                customers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Blending traditional techniques with modern design for timeless
                results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
