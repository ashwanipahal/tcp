import styled from 'styled-components';

export default styled.div`
 .title {
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .select__label {
    padding-top: 8px;
  }

  .Checkbox__error {
    padding-left: 12px;
  }

  .TCPModal__InnerContent {
    padding: 24px 14px;
  }

  .columnWrapper {
    margin-top:  ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .field_dob {
    height: auto;
  }

  .classifiedInfo {
    margin-top: 44px;
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
  }

  .table_contact_month {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .iAgreeCheck {
    line-height: 2;
  }

  .table_contact_day {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .table_contact_year {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
    }
  }

  .plcc_iAgree_container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .contact_information_form {
    text-align: left;
      >label {
        >p {
          margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
        }
      }
    }
  `;
