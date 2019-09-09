import styled from 'styled-components';

export default styled.div`
  .title {
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .label_zip {
    @media ${props => props.theme.mediaQuery.small} and ${props =>
  props.theme.mediaQuery.mediumMax}{
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax}{
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .columnWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  /*
   * With reference to changing placeholder (Very specific to plcc form requirements  and to avoid global changes. )
   */
  .contact_information_form {
    text-align: left;
    > label {
      > p {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      }
    }
  }
`;
