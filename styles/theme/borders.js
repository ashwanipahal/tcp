import colors from './colors';

const PRIMARY_BORDER = `solid 2px ${colors.TEXT.DARKGRAY}`;
const SECONDARY_BORDER = `solid 1px ${colors.PRIMARY.GRAY}`;
const TERTIARY_BORDER = `solid 1px ${colors.PRIMARY.LIGHTGRAY}`;
const QUATERNARY_BORDER = `solid 1px ${colors.TEXT.PALEGRAY}`;
const QUINARY_BORDER = `solid 2px ${colors.WHITE}`;
const SENARY_BORDER = `solid 1px ${colors.BLACK}`;
const SEPTENARY_BORDER = `solid 1px ${colors.BRAND.PRIMARY}`;
const OCTONARY_BORDER = `solid 1px ${colors.BRAND.BOYS}`;
const NONARY_BORDER = `solid 1px ${colors.BRAND.GIRLS}`;

// Units
export default {
  primary: PRIMARY_BORDER,
  secondary: SECONDARY_BORDER,
  tertiary: TERTIARY_BORDER,
  quaternary: QUATERNARY_BORDER,
  quinary: QUINARY_BORDER,
  senary: SENARY_BORDER,
  septenary: SEPTENARY_BORDER,
  octonary: OCTONARY_BORDER,
  nonary: NONARY_BORDER,
};
