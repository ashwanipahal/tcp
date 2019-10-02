import styled from 'styled-components';

export default styled.div`
 .title {
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .free_dropdown_label {
    position: absolute;
  }

  .columnWrapper {
    margin-top:  ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .field_dob {
    height: auto;
  }

  .table_contact_month {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
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
