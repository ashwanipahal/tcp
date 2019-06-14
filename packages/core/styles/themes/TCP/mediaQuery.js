export const breakpoints = {
  small: '375px',
  smallMax: '767px',
  medium: '768px',
  mediumMax: '1023px',
  large: '1024px',
  largeMax: '1439px',
  xlarge: '1440px',
};

export const mediaQuery = {
  small: `only screen and (min-width: ${breakpoints.small})`,
  smallMax: `only screen and (max-width: ${breakpoints.smallMax})`,
  smallOnly: `
  only screen and (min-width: ${breakpoints.small})
    and
    (max-width: ${breakpoints.smallMax})
  `,
  medium: `only screen and (min-width: ${breakpoints.medium})`,
  mediumMax: `only screen and (max-width: ${breakpoints.mediumMax})`,
  mediumOnly: `
  only screen and (min-width: ${breakpoints.medium})
    and
    (max-width: ${breakpoints.mediumMax})
  `,
  large: `only screen and (min-width: ${breakpoints.large})`,
  largeMax: `only screen and (max-width: ${breakpoints.largeMax})`,
  largeOnly: `
  only screen and (min-width: ${breakpoints.large})
    and
    (max-width: ${breakpoints.largeMax})
  `,
  xlarge: `only screen and (min-width: ${breakpoints.xlarge})`,
};
