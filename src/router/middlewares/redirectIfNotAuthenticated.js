import store from '../../store'
import UserResource from '../../api/resources/UserResource'

/**
 * Redirect Non Authenticated Middleware
 *
 * @param from
 * @param to
 * @returns {*}
 */
export default function (from, to) {

  /**
   * Non Authenticated Routes
   *
   * @type {string[]}
   */
  let allowedRoutes = [
    'login',
    'register',
    'forgot',
  ]

  if (allowedRoutes.indexOf(to.name) !== -1) {
    return store.getters.isAuthenticated ? '/claim' : null
  } else {
    UserResource.pingPong().then(res => {
      console.log('pong')
    }).catch(error => {
      store.commit('logout')
      router.push('/login')
    })
  }

  console.log(store.getters.isAuthenticated)
  console.log(to.name)
  console.log('check auth??')

  return !store.getters.isAuthenticated ? '/login' : null
}
