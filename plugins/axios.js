export default function(app) {
  const { $axios, redirect } = app
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onResponse(response => {
    console.log(response.data)
  })
  $axios.onError(error => {
    const reponse = error.response
    const status = reponse.status
    switch (status) {
      case 401:
        alert(`权限异常`)
        break
      case 400:
        alert(`参数异常`)
        break
      default:
        alert(`服务器异常`)
        break
    }
  })
}
