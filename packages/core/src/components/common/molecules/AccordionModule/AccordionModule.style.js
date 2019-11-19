import { css } from 'styled-components';

const style = css`
  .module-accordion {
    position: relative;
  }
  .list-item {
    cursor: pointer;
    background: ${props => props.theme.colors.BUTTON.WHITE.NORMAL};
    @media ${props => props.theme.mediaQuery.medium} {
      border-bottom: 1px solid ${props => props.theme.colors.BUTTON.WHITE.FOCUS};
    }
    .accordion {
      padding: 18px 0;
      height: auto;
      @media ${props => props.theme.mediaQuery.medium} {
        padding: 24px 0;
        font-size: ${props => props.theme.fonts.fontSize.anchor.xlarge}px;
        font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
        line-height: normal;
      }
      &.active,
      &.inactive {
        background: ${props => props.theme.colors.BUTTON.WHITE.NORMAL};
      }
      &.active::after {
        right: 0;
      }
      &.inactive::after {
        right: 0;
      }
      background: ${props => props.theme.colors.BUTTON.WHITE.NORMAL};
    }
  }
`;

export default style;
