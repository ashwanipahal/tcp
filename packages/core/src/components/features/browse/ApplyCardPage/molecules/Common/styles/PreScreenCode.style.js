import styled from 'styled-components';

export default styled.div`
  .contact_information_form {
    > label {
      > p {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      }
    }
  }

  .click-here-link {
    text-underline-position: under;
    text-decoration: underline;
  }
`;
