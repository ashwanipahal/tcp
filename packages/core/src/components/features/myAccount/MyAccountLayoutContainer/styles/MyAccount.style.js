import styled from 'styled-components';

export default styled.ul`
  list-style-type: none;
  padding: 0;
  box-sizing: border-box;
  border-right: 1px solid black;
  li {
    padding: 12px 0;

    a {
      text-decoration: none;
    }

    a.selected {
      color: #1a1a1a;
    }

    a.default {
      color: #9b9b9b;
    }
  }

  & & {
    padding-top: 12px;
    li {
      padding-bottom: 0;
      padding-left: 25px;
    }
    border: none;
  }
`;
