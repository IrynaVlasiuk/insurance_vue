import redirectIfNotAuthenticated from './redirectIfNotAuthenticated'
import store from '../../store'
import ApiSettings from '../../api/ApiSettings'
import UserResource from '../../api/resources/UserResource'

/**
 * Before Each Route Middleware
 *
 * @param to
 * @param from
 * @param next
 */
export default function (to, from, next) {

  let authRedirect = redirectIfNotAuthenticated(from, to)

  ApiSettings.updateAccessToken()

  return authRedirect ? next(authRedirect) : next()
}
