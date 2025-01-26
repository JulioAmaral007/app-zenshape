export const getProfileImage = (file: { uri?: string } | string | null) => {
  if (file && typeof file === 'string') return file
  if (file && typeof file === 'object') return file.uri

  return require('../assets/images/defaultAvatar.png')
}
