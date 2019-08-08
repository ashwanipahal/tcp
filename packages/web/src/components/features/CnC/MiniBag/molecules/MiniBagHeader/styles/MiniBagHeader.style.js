import { css } from 'styled-components';

export default css`
  .mainWrapper {
    text-align: center;
    height: 31px;
    padding-right: 0;
    padding-left: 0;
  }
  .subHeaderText {
    text-decoration: none;
  }
  .pointsRewards {
    color: ${props => props.theme.colorPalette.orange['800']};
  }
  .cartCount {
    background: ${props => props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    margin: 1px 0px 0px -8px;
    padding: 2px 6px;
  }
  .favIcon {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;
