import styled from 'styled-components';

export default styled.div`
  background-color: none;
  .product-item:nth-child(3n) {
    margin-right: 0px;
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0px;
    }
  }
`;
