import styled from 'styled-components';

export default styled.div`
  .contactFormTitle {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    margin: 34px 0px 0px 0px;
    line-height: 1;
  }
  .stateField {
    .select__input {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
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
