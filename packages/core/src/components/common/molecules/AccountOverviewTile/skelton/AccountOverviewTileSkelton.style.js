import { css } from 'styled-components';

export default css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border: 1px solid ${props => props.theme.colorPalette.gray[1600]};
  background: ${props => props.theme.colors.WHITE};
  width: 100%;
  height: auto;

  .headingWrapper {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .contentWrapper {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
