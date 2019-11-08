import { css } from 'styled-components';

export default css`
  .col-border-color {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .cardList__heading {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    line-height: 2.8;
  }
`;
