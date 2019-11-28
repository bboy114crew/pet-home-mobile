export const Color = {
  red: "#EC466A",
  pink: "#FF8EBC",
  white: '#FFFFFF',
  black: '#000000',
  green1: '#22D973',
  green2: '#00cc99',
  yellow: '#FDD84B',
  blue1: '#7DDFEA',
  violet: '#CA9DF7',
  gray1: '#B5B5B5',
  gray2: '#C5C5C5',
  gray3: '#615c70'
}


export const Opacity = (color = Color.white, opacity = 100) => {
  return color + opacity
}

