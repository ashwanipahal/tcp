import { css } from 'styled-components';

export default css`
  padding: 24px 14px;
  background-color: ${props =>
    props.theme.isGymboree
      ? props.theme.colorPalette.orange[50]
      : props.theme.colors.PRIMARY.COLOR1};
  font-size: ${props => props.theme.typography.fontSizes.fs12};

  .searchFormBody {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }
  .searchBar {
    position: relative;
  }

  .TextBox__input {
    background-color: transparent;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: 2px;
    }
  }

  .location-image {
    vertical-align: bottom;
  }

  .CheckBox__text {
    padding-top: 6px;
  }

  .storeLocatorHeading {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    color: ${props => props.theme.colors.PRIMARY.DARK};
    margin: 0 0 12px;
  }

  .button-search-store {
    position: absolute;
    right: -4px;
    bottom: 10px;
  }

  .currentLocationWrapper {
    margin-bottom: 16px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-bottom: 8px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 0;
    }
  }

  .currentLocation {
    margin-left: 8px;
  }

  .storeOptionList {
    margin-top: 12px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: 0;
    }
  }

  .storeOptions {
    display: inline-block;
    min-width: 150px;

    &:nth-of-type(odd) {
      float: left;
    }
  }

  .storeLinks {
    display: inline-block;

    a {
      text-decoration: underline;
    }
  }

  .storeLinksList {
    margin-top: 16px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: 20px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 8px;
    }

    .storeLinks {
      padding: 0 10px;
      border-right: 1px solid;
    }

    .storeLinks:first-child {
      padding-left: 0;
    }

    .storeLinks:last-child {
      border-right: none;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .mapLink {
      display: none;

      & + .storeLinks {
        padding-left: 0;
      }
    }
  }
`;
