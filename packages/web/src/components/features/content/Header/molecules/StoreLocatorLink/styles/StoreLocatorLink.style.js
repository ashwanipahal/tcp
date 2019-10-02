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

  .storelocatorlink__detail {
    .storelocatorlink__detail__storename {
      text-transform: capitalize;
    }
  }
`;
