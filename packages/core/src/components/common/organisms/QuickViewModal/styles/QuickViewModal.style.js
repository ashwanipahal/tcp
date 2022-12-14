import { css } from 'styled-components';

const styles = css``;

export const customHeaderStyle = css`
  div.TCPModal__InnerContent {
    padding: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .Modal_Heading {
    border-bottom: none;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: flex;
    justify-content: center;
    height: auto;
    margin-bottom: 0px;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      justify-content: center;
      height: auto;
    }
  }
  .Modal-Header {
    z-index: ${props => props.theme.zindex.zIndexQuickView};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .close-modal {
    height: 14px;
    right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      right: 0px;
    }
  }
  .add-to-bag-button {
    width: 100%;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
      width: 264px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      width: 243px;
    }
    margin: 0 auto;
  }
  .add-to-bag-button-wrapper {
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: sticky;
    background-color: ${props => props.theme.colors.WHITE};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
    }
  }
`;

export const quickViewColorSwatchesCss = css`
  .color-chips-selector-item {
    /* Image color of item */
    .color-image {
      width: 23px;
      height: 23px;
    }

    .input-radio-icon-checked {
      width: 23px;
      height: 23px;
    }

    .input-radio-icon-checked + .input-radio-title .color-image {
      width: 19px;
      height: 19px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .color-chips-selector-item {
      .color-image {
        width: 20px;
        height: 20px;
      }
      .input-radio-icon-checked {
        width: 20px;
        height: 20px;
      }

      .input-radio-icon-checked + .input-radio-title .color-image {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const customSpinnerStyle = css`
  height: 100%;
`;

export default styles;
