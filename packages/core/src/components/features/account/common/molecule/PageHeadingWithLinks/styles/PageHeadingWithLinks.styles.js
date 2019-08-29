import { css } from 'styled-components';

const styles = css`
  border-bottom: 3px solid ${props => props.theme.colors.BLACK};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-family: ${props => props.theme.fonts.primaryFontFamily};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: 800;
`;

export default styles;
