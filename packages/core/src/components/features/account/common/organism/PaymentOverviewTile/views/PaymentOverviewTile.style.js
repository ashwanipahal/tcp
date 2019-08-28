import { css } from 'styled-components';

const styles = css`
  .cardDetailsWrapper {
    display: flex;
    padding-top: 12px;
  }
  .cardDescriptionWrapper {
    display: flex;
    flex-direction: column;
  }
  .section-heading {
    display: flex;
    justify-content: space-between;
  }
  .venmo-tile {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .cardExpiryWrapper {
    color: ${props => props.theme.colorPalette.gray[700]};
  }
`;

export default styles;
