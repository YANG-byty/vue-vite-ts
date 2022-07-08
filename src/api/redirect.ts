import config from '@/config'
const env: any = import.meta.env.VITE_ENV

const baseUrl = config.baseUrl[env]
export function authLogin() {
  let url = `${baseUrl}/duty/auth/client/login?redirect_uri=${config.Setting.OAUTH_REDIRECT_URI}`
  return url
}
