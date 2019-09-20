import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 432px;
      min-height: 372px;
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
    height: auto;
    width: auto;
  }

  .item-delete-confirmation-text {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    text-align: center;
  }

  .item-delete-confirmation-title {
    text-align: center;
    font-size: ${props => props.theme.typography.fontSizes.fs22};
  }

  .button-container {
    display: flex;
    margin-top: 48px;
    flex-direction: column;
  }

  .confirmation-button {
    flex: 1;
    height: 51px;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    &:hover {
      background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    }
  }

  .confirm-checkout {
    margin-top: 24px;
    background-color: ${props => props.theme.colors.WHITE};
    border: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    &:hover {
      background: ${props => props.theme.colors.WHITE};
    }
  }
`;

export default styles;
