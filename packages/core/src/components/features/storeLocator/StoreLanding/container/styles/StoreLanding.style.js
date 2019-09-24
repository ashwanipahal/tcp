import { css } from 'styled-components';

export default css`
  .favoriteStore__heading {
    font-size: 16px;
    color: #1a1a1a;
    margin: 0;
    text-transform: uppercase;
  }

  .mapView__desktop {
    display: none;
  }

  @media (max-width: 1199px) and (min-width: 768px) {
    .store__list:nth-child(even) {
      margin-right: 0;
    }

    .storeView__List {
      flex-direction: row-reverse;
    }

    .storeList__map {
      margin-right: auto;
    }
  }

  .store__map {
    padding-top: 10px;

    @media (max-width: 1199px) and (min-width: 768px) {
      margin-right: 0;
      margin-left: 15px;
    }

    @media (min-width: 1199px) {
      display: none;
    }
  }

  @media (min-width: 1199px) {
    .mapView__desktop {
      display: block;
    }

    .storeView__List,
    .store__list {
      margin-right: 0;
    }
  }

  .favoriteStore__container {
    @media (max-width: 1199px) and (min-width: 768px) {
      width: 100%;
      margin: 0;
    }
  }

  .google-map {
    img {
      width: 100%;
    }
  }


`;
