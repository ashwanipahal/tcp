import { css } from 'styled-components';

export default css`
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  position: relative;
  width: 100%;

  .help-center-icon {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background: #ffffff;
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .help-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${props => props.theme.mediaQuery.large} {
      flex-direction: row;
      justify-content: center;
    }
  }
  .help-center-title {
    &__text {
      text-align: center;
      text-transform: uppercase;
      font-size: ${props => props.theme.fonts.fontSize.heading.small.h4};
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
      @media ${props => props.theme.mediaQuery.medium} {
        font-size: ${props => props.theme.fonts.fontSize.heading.small.h4}px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
      }
    }
  }
`;
