import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

const measurementFields = {
  'saree-blouse': [
    { name: 'bust', label: 'Bust', unit: 'inches' },
    { name: 'underBust', label: 'Under Bust', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'armhole', label: 'Armhole', unit: 'inches' },
    { name: 'sleeveLength', label: 'Sleeve Length', unit: 'inches' },
    { name: 'blouseLength', label: 'Blouse Length', unit: 'inches' },
  ],
  kurti: [
    { name: 'bust', label: 'Bust', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'hips', label: 'Hips', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'armLength', label: 'Arm Length', unit: 'inches' },
    { name: 'kurtiLength', label: 'Kurti Length', unit: 'inches' },
  ],
  gown: [
    { name: 'bust', label: 'Bust', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'hips', label: 'Hips', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'armLength', label: 'Arm Length', unit: 'inches' },
    { name: 'gownLength', label: 'Gown Length', unit: 'inches' },
    { name: 'neckline', label: 'Neckline Depth', unit: 'inches' },
  ],
  suit: [
    { name: 'chest', label: 'Chest', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'armLength', label: 'Arm Length', unit: 'inches' },
    { name: 'jacketLength', label: 'Jacket Length', unit: 'inches' },
    { name: 'trouserWaist', label: 'Trouser Waist', unit: 'inches' },
    { name: 'trouserLength', label: 'Trouser Length', unit: 'inches' },
    { name: 'inseam', label: 'Inseam', unit: 'inches' },
  ],
  lehenga: [
    { name: 'bust', label: 'Bust', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'hips', label: 'Hips', unit: 'inches' },
    { name: 'lehengaLength', label: 'Lehenga Length', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'choliLength', label: 'Choli Length', unit: 'inches' },
  ],
  'salwar-kameez': [
    { name: 'bust', label: 'Bust', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'hips', label: 'Hips', unit: 'inches' },
    { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
    { name: 'armLength', label: 'Arm Length', unit: 'inches' },
    { name: 'kameezLength', label: 'Kameez Length', unit: 'inches' },
    { name: 'salwarWaist', label: 'Salwar Waist', unit: 'inches' },
    { name: 'salwarLength', label: 'Salwar Length', unit: 'inches' },
  ],
}

function MeasurementForm({ dressType, onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  })

  const fields = measurementFields[dressType] || []

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-900 mb-2">
        Enter Your Measurements
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Please provide accurate measurements for the best fit. All measurements
        are in inches.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label} ({field.unit})
              </label>
              <input
                id={field.name}
                type="number"
                step="0.5"
                min="0"
                className="input"
                placeholder={`e.g., 36`}
                {...register(field.name, {
                  required: `${field.label} is required`,
                  min: { value: 1, message: 'Must be greater than 0' },
                  max: { value: 100, message: 'Please check this measurement' },
                })}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Save Measurements
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MeasurementForm
