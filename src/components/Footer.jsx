import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-white">
                ClothStore
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Premium tailoring and clothing since 1990. Crafting elegance with every stitch.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fabrics" className="hover:text-primary-400 transition-colors">
                  Browse Fabrics
                </Link>
              </li>
              <li>
                <Link to="/custom-stitching" className="hover:text-primary-400 transition-colors">
                  Custom Stitching
                </Link>
              </li>
              <li>
                <Link to="/ready-made" className="hover:text-primary-400 transition-colors">
                  Ready-Made Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>hello@clothstore.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <Clock size={18} className="flex-shrink-0" />
                <div>
                  <p>Mon - Fri: 9AM - 7PM</p>
                  <p>Saturday: 10AM - 6PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} ClothStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
