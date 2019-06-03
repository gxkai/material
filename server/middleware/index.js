const path = require('path')
const ip = require('ip')
const session = require('koa-session')
const miLog = require('./mi-log')
// 引入规则中件间
const miRule = require('./mi-rule')

module.exports = app => {
  // app.use(
  //   miLog({
  //     env: app.env,
  //     projectName: 'mes',
  //     appLogLevel: 'debug',
  //     dir: 'logs',
  //     serverIp: ip.address()
  //   })
  // )
  // session
  app.keys = ['some session']

  const CONFIG = {
    key: 'SESSION' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  }
  app.use(session(CONFIG, app))

  miRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../service'),
        name: 'service'
      },
      {
        path: path.join(__dirname, '../db/dao'),
        name: 'dao'
      },
      {
        path: path.join(__dirname, '../lib'),
        name: 'lib'
      }
    ]
  })

  app.use(async (ctx, next) => {
    const token = ctx.request.query.token
    console.log(`accept token:%s`, token)
    if (token) {
      ctx.session.token = token
      const authUser = await app.service.auth.GetUserBaseInfo(ctx)
      ctx.session.authUser = authUser
    }
    await next()
  })
  // 增加错误的监听处理
  app.on('error', (err, ctx) => {
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
