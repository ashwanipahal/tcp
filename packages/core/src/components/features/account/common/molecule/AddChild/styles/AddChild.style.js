import { css } from 'styled-components';

const styles = css`
  input {
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .addChildBirthday__cancel {
      order: 2;
    }

    .addChildBirthday__submit {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .addChildBirthday__childInfo {
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }

  .addChildBirthday__parentInfo {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }

  .addChildBirthday__btn {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }

  .addChildBirthday__heading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    background-color: ${props => props.theme.colorPalette.gray[500]};
    margin-top: -${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .addChildBirthday__lastName {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 40px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .addChildBirthday_privacy {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0 0
      ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }

  .addChildBirthday__timestamp {
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
    left: ${props => props.offset};
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: 22px;
    height: 22px;
    transform: rotate(-315deg);
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }
`;

export default styles;
