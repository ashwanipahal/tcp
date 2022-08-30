import { css } from 'styled-components';

export default css`
  .storelocatorlink__container {
    display: flex;
    align-items: flex-end;

    &--fav {
      display: flex;
      align-items: center;
    }
  }
  .storelocatorlink__img {
    margin-right: 5px;
  }
  .storelocatorlink__detail {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
    }
    .storelocatorlink__detail__storename {
      text-transform: capitalize;
      &:hover {
        color: ${props => props.theme.colorPalette.blue[500]};
      }
    }
    .store-welcome-txt {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: ${props => props.theme.typography.fontWeights.semibold};
      @media ${props => props.theme.mediaQuery.medium} {
        display: none;
      }
    }
  }
`;
