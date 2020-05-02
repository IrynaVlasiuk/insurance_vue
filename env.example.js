/**
 * Copy one of these configurations into your .env file
 */

/** Local Config **/
export default {
  INSTANCE: 'locale',
  API_URL: 'http://localhost',
  OAUTH_CLIENT_SECRET: '1p7SGIhUYV8eATSC4HXaJsmmLhHCSUeAvXQmLetQ', // Camille remote Secret
  OAUTH_CLIENT_ID: 2,
  INSTANCE_NAVBAR_COLOR: '#443393'
}

/** Dev Config **/
export default {
  INSTANCE: 'dev',
  API_URL: 'http://157.230.106.47:9596',
  OAUTH_CLIENT_SECRET: '1p7SGIhUYV8eATSC4HXaJsmmLhHCSUeAvXQmLetQ',
  OAUTH_CLIENT_ID: 2,
  INSTANCE_NAVBAR_COLOR: '#443393'
}

/** Test Config **/
export default {
  INSTANCE: 'test',
  API_URL: 'http://68.183.220.145:9596',
  OAUTH_CLIENT_SECRET: '1p7SGIhUYV8eATSC4HXaJsmmLhHCSUeAvXQmLetQ',
  OAUTH_CLIENT_ID: 2,
  INSTANCE_NAVBAR_COLOR: 'beige'
}

/** Prod Config **/
export default {
  INSTANCE: 'prod',
  API_URL: '',
  OAUTH_CLIENT_SECRET: '',
  OAUTH_CLIENT_ID: 2,
  INSTANCE_NAVBAR_COLOR: 'green'
}

