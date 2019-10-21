import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .pickupContactAlternateContainer {
    margin-top: 0px;
  }
  .row-one {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .row-two {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .col-0 {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .pickup-store-details-container {
    display: flex;
    flex-direction: 'row';
  }
  .pickupTitle {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .row-one {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    .row-two {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    .pickupContactAlternateContainer {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .TextBox__input {
    background: transparent;
  }
`;

export default styles;
