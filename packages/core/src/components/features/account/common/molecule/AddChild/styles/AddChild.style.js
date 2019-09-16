import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.smallMax} {
    .addChildBirthday__cancel {
      order: 2;
    }

    .addChildBirthday__submit {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .addChildBirthday__heading {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL}
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    ${props => props.theme.spacing.ELEM_SPACING.XL};
    ${props => props.theme.spacing.ELEM_SPACING.XS};
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
`;

export default styles;
