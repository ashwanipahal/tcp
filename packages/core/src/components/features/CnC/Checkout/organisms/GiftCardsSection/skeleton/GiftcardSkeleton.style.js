import { css } from 'styled-components';

export default css`
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};

  .column-styling {
    border: 10px solid ${props => props.theme.colorPalette.gray[300]};
    padding: 20px;
    height: 50px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
