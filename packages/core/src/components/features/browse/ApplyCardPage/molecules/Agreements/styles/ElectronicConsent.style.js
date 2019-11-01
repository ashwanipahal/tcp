import styled from 'styled-components';

export default styled.div`
  p {
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: bold;
  }
  a {
    color: black;
  }
`;
