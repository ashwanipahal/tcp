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
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    text-underline-position: under;
    text-decoration: underline;
  }
`;
