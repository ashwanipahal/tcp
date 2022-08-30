import { css } from 'styled-components';

export default css`
  &__backlink {
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM} 0;

  .favoriteStore__heading {
    font-size: 16px;
    color: ${props => props.theme.colors.TEXT.DARK};
    margin: 0;
    text-transform: uppercase;
  }

  .mapView__desktop {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .storeView__ListAndMap {
      flex-direction: row-reverse;
    }

    .storeList__map {
      margin-right: auto;
    }
  }

  .store__map {
    padding-top: 10px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-right: 0;
      margin-left: 15px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .mapView__desktop {
      display: block;
    }

    .storeView__List,
    .store__list {
      margin-right: 0;
    }
  }

  .favoriteStore__container {
    width: 100%;
    margin: 0 0 20px;

    .address-tile {
      border-bottom: 0;
    }
  }

  .google-map {
    img {
      width: 100%;
    }
  }
  .storeview__error {
    width: 100%;
  }
`;
