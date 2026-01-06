import { useState } from 'react'
import { Upload, X, Image } from 'lucide-react'

function ReferenceUpload({ onUpload, existingImages = [] }) {
  const [images, setImages] = useState(existingImages)
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = (files) => {
    const newImages = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
          }
          setImages((prev) => {
            const updated = [...prev, newImage]
            onUpload(updated)
            return updated
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      onUpload(updated)
      return updated
    })
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-900 mb-2">
        Reference Images (Optional)
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Upload any design inspirations or reference images to help our tailors
        understand your vision.
      </p>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-primary-600">Click to upload</span>{' '}
          or drag and drop
        </p>
        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
      </div>

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Uploaded Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReferenceUpload
