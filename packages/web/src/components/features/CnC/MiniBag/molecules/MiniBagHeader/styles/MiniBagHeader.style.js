import { css } from 'styled-components';

export default css`
  .mainWrapper {
    text-align: center;
    height: 31px;
    padding-right: 0;
    padding-left: 0;
    justify-content: center;
  }
  .subHeaderText {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .subHeaderTextIcon {
    padding-left: 23px;
    text-decoration: none;
    align-items: center;
    justify-content: flex-end;
    width: auto;
  }
  .pointsRewards {
    color: ${props => props.theme.colorPalette.orange['800']};
    padding-left: 6px;
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
  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;
