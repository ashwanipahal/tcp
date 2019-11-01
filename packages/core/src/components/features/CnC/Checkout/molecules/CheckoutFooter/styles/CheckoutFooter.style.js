import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  .left-arrow {
    border: solid ${props => props.theme.colors.ANCHOR.SECONDARY};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(135deg);
  }
  @media ${props => props.theme.mediaQuery.medium} {
    border-top: 1px solid ${props => props.theme.colors.BLACK};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .footer-body-container {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
    text-align: right;
    color: ${props => props.theme.colorPalette.gray[800]};
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-align: center;
    }
  }
  .footer-buttons {
    flex-direction: column;
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
      background-color: ${props => props.theme.colorPalette.blue.C900};
      color: ${props => props.theme.colors.WHITE};
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      font-weight: ${props => props.theme.typography.fontWeights.fontWeights};
      &:hover {
        background: ${props => props.theme.colorPalette.blue.C900};
        display: inline-block;
      }
    }
    .footer-button-web {
      display: none;
      @media ${props => props.theme.mediaQuery.medium} {
        display: block;
        width: 192px;
        height: 51px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        width: 210px;
      }
    }
    .footer-button-mob {
      height: 42px;
      width: 100%;
      @media ${props => props.theme.mediaQuery.medium} {
        display: none;
      }
    }
    .footer-venmo-button {
      display: none;
      @media ${props => props.theme.mediaQuery.smallOnly} {
        display: block;
        width: 100%;
      }
    }
  }
`;

export default styles;
