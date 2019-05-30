export const BREAKPOINTS = {
  small: '375px',
  smallMax: '767px',
  medium: '768px',
  mediumMax: '1023px',
  large: '1024px',
  largeMax: '1439px',
  xlarge: '1440px',
};

export const MEDIA_QUERIES = {
  small: `(min-width: ${BREAKPOINTS.small})`,
  smallMax: `(max-width: ${BREAKPOINTS.smallMax})`,
  smallOnly: `
    (min-width: ${BREAKPOINTS.small})
    and
    (max-width: ${BREAKPOINTS.smallMax})
  `,
  medium: `(min-width: ${BREAKPOINTS.medium})`,
  mediumMax: `(max-width: ${BREAKPOINTS.mediumMax})`,
  mediumOnly: `
    (min-width: ${BREAKPOINTS.medium})
    and
    (max-width: ${BREAKPOINTS.mediumMax})
  `,
  large: `(min-width: ${BREAKPOINTS.large})`,
  largeMax: `(max-width: ${BREAKPOINTS.largeMax})`,
  largeOnly: `
    (min-width: ${BREAKPOINTS.large})
    and
    (max-width: ${BREAKPOINTS.largeMax})
  `,
  xlarge: `(min-width: ${BREAKPOINTS.xlarge})`,
};
