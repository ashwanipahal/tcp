import styled from 'styled-components';

export default styled.div`
 .title {
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .columnWrapper {
    margin-top:  ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .field_dob {
    height: auto;
  }

  .row-personal-information {
    fieldset.date_of_birth {
      padding: 0;
      margin: 0;
      border: 0;
    }

    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      .contact_information_form:nth-of-type(2) {
        margin-top: 12px;
      }
    }
  }

  .table_contact_month {
    .select__input {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .table_contact_day {
    .select__input {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .table_contact_year {
    .select__input {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
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
