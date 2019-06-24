import styled from 'styled-components';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';

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
  margin-bottom: 40px;
`;

const AddressTileComponent = styled.div`
  border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
  padding: 16px 20px 13px 20px;
  margin-bottom: 20px;
`;

const AddressTileContainerComponent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddressRow = styled(BodyCopy)`
  margin: 0;
`;

const EmptyAddressRow = styled(BodyCopy)`
  margin-bottom: 16px;
`;

const AddressSectionComponent = styled.div``;

const AddressCTAContainerComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    margin-left: 14px;
  }
`;

const AddNewAddressCTAContainer = styled.div`
  margin-bottom: 36px;
`;

export {
  AddressBookHeaderComponent,
  ColoredLine,
  AddressTileComponent,
  AddressTileContainerComponent,
  AddressSectionComponent,
  AddressCTAContainerComponent,
  AddressRow,
  EmptyAddressRow,
  AddNewAddressCTAContainer,
};
