import { css } from 'styled-components';

export default css`
  .choose-list-container {
    position: relative;
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
  }

  .choose-list-button {
    margin-top: 3px;
    padding: 0;
    text-transform: none;
    text-align: center;
    letter-spacing: normal;
    outline: none;
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs24};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    white-space: nowrap;
    width: 100%;

    &:focus {
      background: transparent;
    }

    & .accordian-item-arrow {
      right: 0;
      position: absolute;
      top: 20px;
    }
  }

  .choose-list-section {
    min-width: 256px;
    border: solid 1px ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    background: ${props => props.theme.colors.WHITE};
    position: absolute;
    z-index: 1;
    top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    width: 91%;
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.MED};

    .create-wish-list-header {
      color: ${props => props.theme.colors.PRIMARY.DARK};
      font-family: ${props => props.theme.typography.fonts.secondary};
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      padding-bottom: 0;
    }

    .wish-list-item {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};

      &:last-child {
        padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }

    .wish-list-change-item__button {
      width: 100%;
      min-height: auto;
      &:focus {
        background: transparent;
      }
    }

    .default-list-item,
    .default-list-count {
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
    .wish-list-item-section {
      color: ${props => props.theme.colors.PRIMARY.DARK};
      font-family: ${props => props.theme.typography.fonts.secondary};
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      display: flex;
      justify-content: space-between;
      text-transform: initial;

      .wish-list-name {
        display: flex;
      }
    }
  }
  .fav-list-heart-icon {
    width: 16px;
    height: 14px;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .edit-setting-btn {
    background: transparent;
    border: 0;
    text-transform: initial;
    font-weight: normal;
    color: ${props => props.theme.colors.PRIMARY.DARK};
    text-decoration: underline;
  }
`;
