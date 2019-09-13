import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  @media ${props => props.theme.mediaQuery.medium} {
    border-top: 1px solid ${props => props.theme.colors.BLACK};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .footer-body-container {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
    text-align: right;
    color: ${props => props.theme.colorPalette.gray[800]};
  }
  .footer-buttons {
    flex-direction: column-reverse;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
      width: auto;
      flex-direction: row;
    }

    .back-space {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .back-link {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
      color: ${props => props.theme.colors.PRIMARY.BLUE};
      font-size: ${props => props.theme.typography.fontSizes.fs16};
      text-transform: none;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      @media ${props => props.theme.mediaQuery.medium} {
        width: auto;
        margin-top: unset;
      }
    }
    .back-link-image {
      position: absolute;
      top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.MED};
      left: 0;
      width: 9px;
      height: 18px;
    }
    .footer-button {
      background-color: ${props => props.theme.colors.PRIMARY.BLUE};
      color: ${props => props.theme.colors.WHITE};
      height: 42px;
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      font-weight: ${props => props.theme.typography.fontWeights.fontWeights};
      &:hover {
        background: ${props => props.theme.colors.PRIMARY.BLUE};
      }
      width: 100%;
      @media ${props => props.theme.mediaQuery.medium} {
        width: 192px;
        height: 51px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        width: 210px;
      }
    }
  }
`;

export default styles;
