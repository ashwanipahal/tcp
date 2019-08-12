import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-word;
  height: ${props => (props.card && props.card.ccType === 'GiftCard' ? 'auto' : '100%')};
  min-height: ${props => (props.card && props.card.ccType === 'VENMO' ? '173px' : '')};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.MED};

  .recaptcha {
    -webkit-transform: scale(0.6);
    -ms-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    position: relative;
    left: -45px;
  }
  & .giftcardTile__wrapper {
    display: flex;
    align-items: flex-end;
  }
  & form {
    width: 70%;
  }
  & .input-fields-wrapper {
    height: auto;
  }
  & .TextBox__error {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  & .TextBox__label {
    display: none;
    height: 100%;
    min-height: ${props => (props.card && props.card.ccType === 'VENMO' ? '173px' : '')};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
        ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .cardTile {
    display: flex;
    justify-content: space-between;
  }
  .cardTile__heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .cardTile__number {
    margin-bottom: ${props =>
      props.card.ccType === 'PLACE CARD' ? props.theme.spacing.ELEM_SPACING.XL : ''};
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
  }
  .cardTile__expiry {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .cardTile__defaultSection {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .cardTile__img_wrapper {
    width: 90px;
    height: 56px;
    margin-bottom: auto;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .cardTile__img {
    width: 100%;
  }
  .cardTile__ctaLinks {
    display: flex;
    justify-content: flex-end;
    margin-top: ${props => (props.card && props.card.ccType === 'GiftCard' ? '-15px' : 'auto')};
  }
  .cardTile__anchor {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
