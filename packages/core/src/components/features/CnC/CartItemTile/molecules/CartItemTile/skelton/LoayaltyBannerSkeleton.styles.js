import { css } from 'styled-components';

export default css`
  padding: 25px 0px 13px 0px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  display: flex;
  align-items: center;
  flex-direction: column;

  .div1 {
    width: 160px;
    height: 20px;
    margin-bottom: 10px;
  }

  .div2 {
    width: 200px;
    height: 20px;

    margin-bottom: 10px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
