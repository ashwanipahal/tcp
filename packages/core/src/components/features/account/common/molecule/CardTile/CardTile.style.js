import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  & .recaptcha {
    webkit-transform: scale(0.7);
    transform: scale(0.7);
    position: relative;
    left: -45px;
  }
  & .giftcardTile__wrapper {
    display: flex;
    align-items: flex-end;
  }
  & form {
    width: 90%;
  }
  & .input-fields-wrapper {
    height: auto;
  }
  & .TextBox__error {
    padding-bottom: 10px;
  }

  & .TextBox__label {
    display: none;
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
  }
  .cardTile__expiry {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .cardTile__defaultSection {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .cardTile__img {
    width: 90px;
    height: 56px;
    margin-bottom: auto;
    margin-top: ${props =>
      props.card.ccType !== 'GiftCard' && props.card.ccType !== 'VENMO'
        ? props.theme.spacing.ELEM_SPACING.MED
        : props.theme.spacing.ELEM_SPACING.XL};
  }
  .cardTile__ctaLinks {
    display: flex;
    margin-top: 35px;
    float: right;
  }
  .cardTile__anchor {
    margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  }
`;

export default styles;
