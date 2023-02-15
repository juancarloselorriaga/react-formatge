export const formValidationRgx = {
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  limitChars: (minChars: number, maxChars: number) => {
    return new RegExp(`^(\\S){${minChars},${maxChars}}$`)
  },
  onlyNumbers: /^\d+$/,
  floatNumber: /[+-]?([0-9]*[.])?[0-9]+/,
  validCharsWithLimit: (limit: number) => {
    return new RegExp(`^\\s*([0-9a-zA-Z\\s,\\-()'_@~&?!*=.ëüáéíóúÁÉÍÓÚäÄåÅöÖ\`]{1,${limit}})\\s*$`)
  },
}
