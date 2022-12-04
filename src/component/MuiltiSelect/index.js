import { MultiSelect } from 'chakra-multiselect'
import { useState } from 'react'

const MultiSelecCS = ({title, options}) => {
  const [value, setValue] = useState([])

  return (
    <MultiSelect
      options={options}
      value={value}
      label={title}
      onChange={setValue}
    />
  )
}

export default MultiSelecCS