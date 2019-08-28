import styled from 'styled-components';

export default styled.div`
  .title {
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .columnWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .contact_information_form {
    > label {
      > p {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      }
    }
  }
`;
