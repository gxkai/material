module.exports = (opts = {}) => {
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (e) {
      const status = parseInt(e.status)
      ctx.throw(status)
    }
  }
}
