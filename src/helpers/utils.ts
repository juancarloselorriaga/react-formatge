export const slugify = ( text: string ) =>
    text
    .toString()
    .normalize( 'NFD' )
    .replace( /[\u0300-\u036f]/g, '' )
    .toLowerCase()
    .trim()
    .replace( /^\/|/g, '' )
    .replace( /\s+/g, '-' )
    .replace( /[^\w-/\\?=&+]+/g, '' )
    .replace( /--+/g, '-' )

export const uppercasefy = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '_')

export const formatDate = (date: Date) => {
  let month = '' + (date.getMonth() + 1),
    day = '' + date.getDate()

  const year = date.getFullYear()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }
  //  returns the date on format  YYYY-MM-DD
  return [year, month, day].join('-')
}

export const titleCasify = (text: string) =>
  text.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())
