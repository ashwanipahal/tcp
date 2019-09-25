import styled from 'styled-components';

export default styled.div`
  background-color: none;
  padding: 0px 14px;

  @media ${props => props.theme.mediaQuery.medium} {
    padding: 0px ${props => (props.isPLCCModalFlow ? `0px` : `39px`)};
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding-left: ${props => (props.isPLCCModalFlow ? `0px` : `250px`)};
  }

  .iAgree_terms_conditions {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    > input {
      flex: -1 0 50%;
      margin-top: 5px;
    }
    > p {
      flex: 1 0 50%;
    }
    > div {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      flex: 1 0 100%;
    }
  }

  .contact_information_form {
    text-align: left;
    > label {
      > p {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      }
    }
  }

  .plcc_min_phone {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
    }
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px
      ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
  }

  .free_dropdown_label {
    position: absolute;
  }

  .columnWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .no_thanks_link {
    text-align: center;
    padding: 36px 0px 36px 0px;
    text-underline-position: under;
    text-decoration: underline;
    > div {
      cursor: pointer;
    }
  }

  .no_thanks_link_wrapper {
    justify-content: space-around;
  }

  .submit_plcc_form {
    justify-content: space-around;
  }

  .submit_button_plcc_form_container {
    text-align: center;
    margin-top: 67px;
  }

  .submit_button_plcc_form {
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    letter-spacing: 1px;
    text-align: center;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 50%;
    }
  }

  .pre-approved-offer-criteria {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
  }

  .message-terms {
    padding-bottom: 21px;
    font-family: ${props => props.theme.typography.fonts.secondary};
  }

  .message-information {
    font-family: ${props => props.theme.typography.fonts.primaryFontBlackFamily};
  }

  .title {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    margin: 34px 0px 27px 0px;
    line-height: 1;
  }
`;
