import styled from 'styled-components';

export default styled.div`
  .mainWrapper {
    text-align: center;
    height: 31px;
    padding-right: 0;
    padding-left: 0;
  }
  .subHeaderText {
    text-decoration: none;
  }
  .pointsRewards {
    color: ${props => props.theme.colorPalette.orange['800']};
  }
`;
