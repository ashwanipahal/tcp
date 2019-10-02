import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 0;
      padding-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      bottom: auto;
      padding: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  div.TCPModal__InnerContent.item-delete-confirmation-modal {
    width: 305px;
    height: 269px;
    max-width: 305px;
    min-height: 269px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
      height: auto;
      max-width: 432px;
      min-height: 372px;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    .close-modal {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        top: ${props => props.theme.spacing.ELEM_SPACING.SM};
        right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }
  }

  .item-delete-confirmation-text {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    }
    text-align: center;
  }

  .item-delete-confirmation-title {
    text-align: center;
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs22};
    }
  }

  .button-container {
    display: flex;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    flex-direction: column;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }

  .item-delete-button {
    height: 51px;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    &:hover {
      background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      height: 42px;
      margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
      margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
  }

  .confirm-button {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    background-color: ${props => props.theme.colors.WHITE};
    border: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    &:hover {
      background: ${props => props.theme.colors.WHITE};
    }
  }
`;

export default styles;
