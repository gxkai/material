export default async ({ redirect, route, store, $axios }) => {
  const redirectUri = encodeURIComponent(
    `http://localhost:3000${route.fullPath.replace(/token=[^&]*(&)?/g, '')}`
  )
  if (!store.state.token || !store.state.authMenu.includes(route.path)) {
    return redirect(
      `http://ksat.luxshare-ict.com/passport/login?appid=Lux.MES&redirect_uri=${redirectUri}`
    )
  }
  try {
    await $axios.post(`/mpi/auth/checkToken`, { token: store.state.token })
  } catch (e) {
    return redirect(
      `http://ksat.luxshare-ict.com/passport/login?appid=Lux.MES&redirect_uri=${redirectUri}`
    )
  }
}
