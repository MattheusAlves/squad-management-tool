const nameInitials = (name: string) => {
  const nameArray = name.split(' ')
  const initials = nameArray[0]
    .charAt(0)
    .concat(nameArray[nameArray.length -1].charAt(0))
    .toLocaleUpperCase()
  return initials
}
export default nameInitials
