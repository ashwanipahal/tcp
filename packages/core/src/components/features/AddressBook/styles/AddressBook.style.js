import styled, { css } from 'styled-components';

const AddressBookHeaderComponent = styled.p`
  font-weight: 800;
  font-size: 16px;
  color: #1a1a1a;
  font-family: Montserrat;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ColoredLine = styled.hr`
  background-color: ${props => props.backgroundColor};
  height: 3px;
  border: none;
`;

const MyStyle = css`
  .add-new-address-button {
    margin-top: 42px;
    background-color: #2e6a91;
  }
`;

const AddressItemsComponent = styled.ul`
  display: flex;
  padding: 0;
  margin: 38.5px 0 0 0;
`;

const AddressItemContainerComponent = styled.li`
  background: #ffffff;
  border: solid 1px #979797;
  padding: 16px 20px 13px 20px;
  margin-bottom: 20px;
  list-style-type: none;
`;

const AddressDetailComponent = styled.p`
  & > span {
    font-family: 'Nunito';
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    text-decoration: none;
    letter-spacing: normal;
    line-height: 1.29;
    text-transform: none;
    color: #1a1a1a;
  }
`;

const AddressSpanComponent = styled.span`
  color: #1a1a1a;
`;

export {
  AddressBookHeaderComponent,
  ColoredLine,
  MyStyle,
  AddressItemsComponent,
  AddressItemContainerComponent,
  AddressDetailComponent,
  AddressSpanComponent,
};
