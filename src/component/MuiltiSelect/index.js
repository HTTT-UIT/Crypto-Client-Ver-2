import { MultiSelect } from 'chakra-multiselect'
import { useState, useEffect } from 'react'

const MultiSelecCS = ({onChange, title, options}) => {
  const [value, setValue] = useState(["Tất cả"])

  useEffect(() => {
    let checkAll = false
    const optionsF = options.filter(item => {
      let check = false
      value.forEach(v => {
        console.log(v, item.title, v === item.title)
        if (v === item.title){
          check = true
        }
        if (v === "Tất cả")
         checkAll = true
      })
      return check
    })

    if (!checkAll)
      onChange(optionsF.map(item => item.id))
    else
      onChange([])
  }, [value])

  return (
    <MultiSelect
      options={options.map(item => item.title)}
      value={value}
      label={title}
      onChange={setValue}
      bg={"white"}
      bgColor={"black"}
    />
  )
}

export default MultiSelecCS