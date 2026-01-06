import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              ClothStore
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium tailoring services and ready-made fashion. Quality fabrics,
              expert craftsmanship, and personalized service since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/fabrics" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Browse Fabrics
                </Link>
              </li>
              <li>
                <Link to="/custom-stitching" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Custom Stitching
                </Link>
              </li>
              <li>
                <Link to="/ready-made" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Ready-Made Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                info@clothstore.com
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0 mt-0.5" />
                123 Fashion Street, Style City, SC 12345
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Business Hours</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
              <li>Saturday: 10:00 AM - 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ClothStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
