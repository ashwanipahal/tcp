export const BREAKPOINTS = {
  small: 375,
  smallMax: 768 - 1,
  medium: 768,
  mediumMax: 1024 - 1,
  large: 1024,
};

export const MEDIA_QUERIES = {
  small: `(min-width: ${BREAKPOINTS.small}px)`,
  smallMax: `(max-width: ${BREAKPOINTS.smallMax}px)`,
  smallOnly: `
    (min-width: ${BREAKPOINTS.small}px)
    and
    (max-width: ${BREAKPOINTS.smallMax}px)
  `,
  medium: `(min-width: ${BREAKPOINTS.medium}px)`,
  mediumMax: `(max-width: ${BREAKPOINTS.mediumMax}px)`,
  mediumOnly: `
    (min-width: ${BREAKPOINTS.medium}px)
    and
    (max-width: ${BREAKPOINTS.mediumMax}px)
  `,
  large: `(min-width: ${BREAKPOINTS.large}px)`,
};
