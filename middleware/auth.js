export default async ({ redirect, route, store, $axios, isClient }) => {
  const redirectUri = encodeURIComponent(
    `http://localhost:3000${route.fullPath.replace(/token=[^&]*(&)?/g, '')}`
  )
  console.log(store.state.token)
  if (!store.state.token) {
    return redirect(
      `http://ksat.luxshare-ict.com/passport/login?appid=Lux.MES&redirect_uri=${redirectUri}`
    )
  }
}
