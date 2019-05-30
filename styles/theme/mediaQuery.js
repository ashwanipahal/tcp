import { rem } from 'polished';

export const BREAKPOINTS = {
  xSmall: 480,
  xSmallMax: 768 - 1,
  small: 768,
  smallMax: 1024 - 1,
  medium: 1024,
  mediumMax: 1440 - 1,
  large: 1440,
  largeMax: 1600 - 1,
  xLarge: 1600,
};

export const MEDIA_QUERIES = {
  xSmall: `(max-width: ${rem(BREAKPOINTS.xSmall)})`,
  xSmallMax: `(max-width: ${rem(BREAKPOINTS.xSmallMax)})`,
  small: `(min-width: ${rem(BREAKPOINTS.small)})`,
  smallMax: `(max-width: ${rem(BREAKPOINTS.smallMax)})`,
  smallOnly: `
    (min-width: ${rem(BREAKPOINTS.small)})
    and
    (max-width: ${rem(BREAKPOINTS.smallMax)})
  `,
  medium: `(min-width: ${rem(BREAKPOINTS.medium)})`,
  mediumMax: `(max-width: ${rem(BREAKPOINTS.mediumMax)})`,
  mediumOnly: `
    (min-width: ${rem(BREAKPOINTS.medium)})
    and
    (max-width: ${rem(BREAKPOINTS.mediumMax)})
  `,
  large: `(min-width: ${rem(BREAKPOINTS.large)})`,
  largeMax: `(max-width: ${rem(BREAKPOINTS.largeMax)})`,
  xLarge: `(min-width: ${rem(BREAKPOINTS.xLarge)})`,
};

export default MEDIA_QUERIES;
