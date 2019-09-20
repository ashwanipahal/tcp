import { css } from 'styled-components';

const styles = css`
  .storetile__action__links {
    align-items: flex-end;
  }
  .store__tile__brandicon {
    display: flex;
    align-items: center;

    ${props => props.theme.mediaQuery.smallOnly} {
      margin-top: 8px
    }
  }
  .store__tile__brandicon__image {
    height: 22px;
    width: 62px;
  }
  .storetile__storeaddress__section {
    align-items: center;
    @media ${props => props.theme.mediaQuery.mediumOnly} and ${props =>
  props.theme.mediaQuery.smallOnly} {
      margin-top: 19px
    }
  }
`;

export default styles;
