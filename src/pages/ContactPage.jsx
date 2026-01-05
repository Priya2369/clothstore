import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { Container, Button } from '../components/ui'

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['123 Fashion Street', 'Style City, SC 12345'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['hello@clothstore.com', 'support@clothstore.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: ['Mon - Fri: 9AM - 7PM', 'Sat: 10AM - 6PM', 'Sun: Closed'],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-secondary mb-6">Send us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      {...register('subject', { required: 'Please select a subject' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="custom-order">Custom Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="order-status">Order Status</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send size={20} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="heading-secondary mb-6">Get in Touch</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="bg-gray-50 rounded-xl p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <div className="text-gray-600 text-sm">
                        {info.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Map Embed Placeholder */}
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Map integration coming soon</p>
                  <p className="text-sm">123 Fashion Street, Style City, SC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-secondary text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                {
                  q: 'How long does custom tailoring take?',
                  a: 'Standard orders are typically completed within 7-10 business days. Rush orders can be accommodated for an additional fee.',
                },
                {
                  q: 'Can I visit the store for measurements?',
                  a: 'Absolutely! Walk-ins are welcome during business hours. You can also book an appointment for a more personalized experience.',
                },
                {
                  q: 'What if the fit isn\'t perfect?',
                  a: 'We offer free alterations within 15 days of delivery if the fit needs adjustment. Your satisfaction is our guarantee.',
                },
                {
                  q: 'Do you ship internationally?',
                  a: 'Yes, we ship to most countries. International shipping typically takes 10-15 business days.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default ContactPage
