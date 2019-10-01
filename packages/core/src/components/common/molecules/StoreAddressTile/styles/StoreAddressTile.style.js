import styled, { css } from 'styled-components';

export const TileHeader = styled.div`
  .store-listing-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .title-one {
    span {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
  .title-two {
    flex: 1;
    span {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
  .store-name {
    &--details {
      margin-top: 0;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      color: ${props => props.theme.colors.TEXT.DARK};
    }
  }
`;

export const TileFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${props =>
    props.variation === 'detail'
      ? props.theme.spacing.ELEM_SPACING.MED
      : props.theme.spacing.ELEM_SPACING.XS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const TileBody = styled.div`
  flex: 1;
  .address-wrapper {
    @media ${props => props.theme.mediaQuery.largeOnly} {
      display: ${props => (props.variation === 'listing' ? 'flex' : 'block')};
      align-items: center;
    }
  }
  .store-type {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    &__marker {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }
  .address-meta {
    display: ${props => (props.variation === 'detail' ? 'flex' : 'block')};
    align-items: flex-end;
    &__left {
      flex: ${props => (props.variation === 'detail' ? 1 : 'none')};
    }
    &__right {
      flex: none;
    }
  }
`;

export const FavStore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  .favorite-store-icon {
    width: 30px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default css`
  display: flex;
  flex-direction: column;
  box-sizing: bored-box;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

  .brand-store {
    display: flex;
    align-items: center;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};

    &__image {
      height: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }

  .address-details {
    font-style: normal;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    margin-right: ${props =>
      props.variation === 'listing' ? props.theme.spacing.ELEM_SPACING.XL : 0};
  }

  .listing-header {
    .title {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
      @media ${props => props.theme.mediaQuery.largeOnly} {
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
      span {
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: flex;
      .heading-left {
        flex: 1;
      }
      .heading-right {
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .address-details {
        padding: 0;
      }
    }
    .address-inline {
      display: none;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: block;
      }
    }
    .address-block {
      display: flex;
      flex-direction: column;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: none;
      }
    }
  }
  .address-details--listing-header {
    @media ${props => props.theme.mediaQuery.largeOnly} {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .brand-store--sm {
    display: none;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.largeOnly} {
      display: flex;
    }
  }

  .brand-store--lg {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.largeOnly} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin: 0;
    }
  }

  .heading-right {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.largeOnly} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;
