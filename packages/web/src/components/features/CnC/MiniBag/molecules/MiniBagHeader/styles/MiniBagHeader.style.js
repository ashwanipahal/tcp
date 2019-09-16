import { css } from 'styled-components';

const cartItemMargin = item => {
  let marginBottom = '-7px';
  if (item && item.length > 0) {
    switch (item.length) {
      case 2:
        marginBottom = '-9px';
        break;
      case 3:
        marginBottom = '-14px';
        break;
      default:
        break;
    }
  }
  return marginBottom;
};

export default css`
  .mainWrapper {
    text-align: center;
    height: 31px;
    padding-right: 0;
    padding-left: 0;
    justify-content: flex-end;
  }
  .subHeaderText {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 28px;
    width: auto;

    .userName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90px;
      text-align: right;
      padding-right: 32px;
    }
  }
  .subHeaderTextLogin {
    display: flex;
    margin: 6px -36px 1px 0px;
    a {
      font-size: ${props => props.theme.fonts.fontSize.body.large.secondary}px;
    }
  }
  .separator {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .subHeaderTextIcon {
    width: auto;
    margin-right: 16px;
  }
  .pointsRewards {
    color: ${props => props.theme.colorPalette.orange['800']};
    padding-left: 6px;
    white-space: nowrap;
    width: auto;
  }
  .cartCount {
    background: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.primary.dark
        : props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    margin: 1px 0px 0px ${props => cartItemMargin(props.cartItemCount)};
    padding: 2px 6px;
  }
  .favIcon {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .rightLink {
    box-sizing: border-box;
  }
`;
