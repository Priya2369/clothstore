function Card({ children, className = '', hover = true, ...props }) {
  const hoverClass = hover ? 'hover:shadow-lg' : ''

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`aspect-square overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  )
}

function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  )
}

Card.Image = CardImage
Card.Content = CardContent

export default Card
