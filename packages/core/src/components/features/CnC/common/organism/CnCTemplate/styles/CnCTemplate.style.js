import { css } from 'styled-components';

const styles = css`
  ${props => `
  background: ${props.theme.colors.PRIMARY.PALEGRAY};
  padding: ${props.theme.spacing.ELEM_SPACING.XXXS};
  margin-bottom: 3px;
  padding-top:${props.isConfirmationPage ? props.theme.spacing.ELEM_SPACING.MED : 0}`}

  .bonusPointsDaysWrapper {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .bonusPointsDaysWrapperAccordian {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.smallMax} {
      padding-top: 0px;
      padding-bottom: 0px;
      .collapsible-header {
        padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      }
      .collapsible-icon {
        top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
      .item-opened {
        padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
  }

  .right-sec {
    margin-bottom: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.MED : 0)};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.LRG : 0)};
      margin-bottom: 0;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.MED : 0)};
      margin-bottom: 0;
    }
  }

  .hide-mobile {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }

  .placeholder-right div {
    background: ${props => props.theme.colorPalette.white};
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }
`;

export default styles;
