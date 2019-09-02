import { css } from 'styled-components';

const styles = css`
  width: 100%;

  @media ${props => props.theme.mediaQuery.medium} {
    .pickupField {
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
    .fieldLastName,
    .fieldNumber {
      margin-right: 0px;
    }
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .pickupField {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
    .fieldFirstName,
    .fieldEmail {
      margin-right: 0px;
    }
    .fieldLastName,
    .fieldNumber {
      margin-right: 0px;
    }
  }
`;

export default styles;
