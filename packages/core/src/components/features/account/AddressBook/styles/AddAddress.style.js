import { css } from 'styled-components';

const styles = css`
  .addAddress__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: 0;
  }
  .addAddress__anchor__back {
    position: relative;
    top: -15px;
    cursor: pointer;
  }
  .button_wrapper {
    display: inline-block;
    text-align: right;
    display: block;
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .button_wrapper {
      margin: 0 auto;
      width: 60%;
      .cancel {
        padding-right: 0;
        margin: 10px 0;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .addressBook__addNewCtaContainer {
      text-align: left;
    }
  }
`;

export default styles;
