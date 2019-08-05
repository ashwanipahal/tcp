import styled from 'styled-components';

export default styled.div`
  .mainWrapper {
    text-align: center;
    background-color: ${props => props.theme.colorPalette.gray['300']};
    height: 31px;
    padding-right: 0;
    padding-left: 0;
  }
  .subHeaderText {
    text-decoration: underline;
  }
`;
