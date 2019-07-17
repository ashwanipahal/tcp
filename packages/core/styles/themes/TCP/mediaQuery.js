export const breakpoints = {
  small: '375px',
  smallMax: '767px',
  medium: '768px',
  mediumMax: '1023px',
  large: '1024px',
  largeMax: '1439px',
  xlarge: '1440px',
  keys: ['xs', 'sm', 'lg', 'xl'],
  values: { xs: 0, sm: 768, lg: 1024, xl: 1440 },
};

export const mediaQuery = {
  small: `(min-width: ${breakpoints.small})`,
  smallMax: `(max-width: ${breakpoints.smallMax})`,
  smallOnly: `
    (min-width: ${breakpoints.small})
    and
    (max-width: ${breakpoints.smallMax})
  `,
  medium: `(min-width: ${breakpoints.medium})`,
  mediumMax: `(max-width: ${breakpoints.mediumMax})`,
  mediumOnly: `
    (min-width: ${breakpoints.medium})
    and
    (max-width: ${breakpoints.mediumMax})
  `,
  large: `(min-width: ${breakpoints.large})`,
  largeMax: `(max-width: ${breakpoints.largeMax})`,
  largeOnly: `
    (min-width: ${breakpoints.large})
    and
    (max-width: ${breakpoints.largeMax})
  `,
  xlarge: `(min-width: ${breakpoints.xlarge})`,
};
