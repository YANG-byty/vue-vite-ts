import config from '@/config'

const baseUrl = config.Setting.apiBaseURL
export function authLogin() {
  let url = `${baseUrl}/duty/auth/client/login?redirect_uri=${config.Setting.OAUTH_REDIRECT_URI}`
  return url
}
