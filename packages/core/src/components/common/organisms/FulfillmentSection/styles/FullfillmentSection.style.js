import { css } from 'styled-components';

const styles = css`
  &.fulfillment-section {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: 57px;
    padding-right: 50px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: 90px;
      padding-right: 89px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 100%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding-top: 15px;
      padding-left: 72px;
      padding-right: 70px;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;
export default styles;
