import { css } from 'styled-components';

export default css`
  padding: 25px 0px 13px 0px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  .div1 {
    width: 57px;
    height: 20px;
    display: block;
    margin-bottom: 10px;
  }

  .div3 {
    width: 73px;
    height: 20px;
    display: block;
    margin-bottom: 10px;
  }

  .div4 {
    width: 89px;
    height: 20px;
    display: block;
    margin-bottom: 10px;
  }

  .div5 {
    margin-left: 10px;
    width: 49px;
    height: 15px;
    display: block;
    margin-bottom: 15px;
  }

  .div6 {
    width: 89px;
    height: 18px;
    display: block;
    margin-bottom: 10px;
  }

  .div7 {
    width: 106px;
    height: 20px;
    display: block;
  }

  .div8 {
    margin-left: 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(163, 162, 162, 0.5);
    box-shadow: 0 1px 0 0 rgba(163, 162, 162, 0.5);
  }

  .div9 {
    width: 67px;
    height: 18px;
    display: block;
    margin-bottom: 10px;
  }
  .column-end {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
