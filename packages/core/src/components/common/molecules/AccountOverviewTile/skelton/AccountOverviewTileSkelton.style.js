import { css } from 'styled-components';

export default css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border: 1px solid ${props => props.theme.colorPalette.gray[1600]};
  background: ${props => props.theme.colors.WHITE};
  width: 100%;
  height: auto;

  .headingWrapper {
    width: 75%;
    height: 42px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .contentWrapper {
    width: 100%;
    height: 400px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .ctaWrapper {
    width: 100%;
    height: 42px;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
