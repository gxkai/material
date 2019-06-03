import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description
} from 'koa-swagger-decorator'

const tag = tags(['Auth'])

class AuthRouter {
  @request('POST', '/auth/logout')
  @summary('退出登录')
  @description('退出登录')
  @tag
  static async logout(ctx) {
    ctx.session.token = null
    ctx.status = 200
  }
}
export default AuthRouter
