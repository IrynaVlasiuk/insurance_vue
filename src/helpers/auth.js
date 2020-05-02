export function getLocalUser () {
  const userStr = localStorage.getItem('user')

  if (!userStr) {
    return null; // If there is no user - return null
  }

  return JSON.parse(userStr);
}
