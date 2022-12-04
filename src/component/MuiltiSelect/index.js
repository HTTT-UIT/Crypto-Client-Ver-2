import { MultiSelect } from 'chakra-multiselect'
import { useState, useEffect } from 'react'

const MultiSelecCS = ({onChange, title, options}) => {
  const [value, setValue] = useState([])

  useEffect(() => {
    const optionsF = options.filter(item => {
      let check = false
      value.forEach(v => {
        console.log(v, item.title, v === item.title)
        if (v === item.title){
          check = true
        }
      })
      return check
    })
    onChange(optionsF.map(item => item.id))

  }, [value])

  return (
    <MultiSelect
      options={options.map(item => item.title)}
      value={value}
      label={title}
      onChange={setValue}
      zIndex={"999"}
      bg={"white"}
      bgColor={"white"}
    />
  )
}

export default MultiSelecCS