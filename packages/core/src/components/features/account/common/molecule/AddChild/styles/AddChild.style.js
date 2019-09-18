import { css } from 'styled-components';

const styles = css`
  position: absolute;
  left: 0;
  top: ${props => (props.offset ? `${props.offset.top}px` : 0)};
  z-index: 1;

  input {
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }

  .submitBtn {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
      order: 2;
    }
  }

  .cancelBtn {
    @media ${props => props.theme.mediaQuery.medium} {
      order: 1;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .childInfo {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }

  .parentInfo {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .buttons {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }

  .formHeading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    background-color: ${props => props.theme.colorPalette.gray[500]};
    margin-top: -${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .lastName {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 40px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .privacy {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0 0
      ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }

  .timestamp {
    height: 60px;
    display: flex;
    align-items: flex-end;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 40px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .addChildBirthdayTip {
    position: absolute;
    left: ${props => (props.offset ? `${props.offset.left - 11}px` : 0)};
    top: -22px;
    width: 22px;
    height: 22px;
    transform: rotate(-315deg);
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }
`;

export default styles;
