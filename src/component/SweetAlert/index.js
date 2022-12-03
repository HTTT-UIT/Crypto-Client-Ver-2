import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// MySwal.fire({
//   title: <p>Hello World</p>,
//   didOpen: () => {
//     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
//     MySwal.showLoading()
//   },
// }).then(() => {
//   return MySwal.fire(<p>Shorthand works too</p>)
// })

export const handleInfo = (title, text) => {
  MySwal.fire({
    icon: 'info',
    title,
    html: text,
    confirmButtonText: "Trở lại"
  })
}


export const handleSuccess = (title, text) => {
  MySwal.fire({
    icon: 'success',
    title,
    html: text,
    confirmButtonText: "Trở lại"
  })
}

export const handleWarning = (title, text) => {
  MySwal.fire({
    icon: 'warning',
    title,
    html: text,
    confirmButtonText: "Trở lại"
  })
}