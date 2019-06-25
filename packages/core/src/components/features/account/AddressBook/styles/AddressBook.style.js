import styled from 'styled-components';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';

const AddressTileComponent = styled.div`
  border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
  padding: 16px 16px 12px 16px;
  margin-bottom: 20px;
`;

const AddressTileContainerComponent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmptyAddressRow = styled(BodyCopy)`
  margin-bottom: 16px;
`;

const AddressCTAContainerComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    margin-left: 16px;
  }
`;

const AddNewAddressCTAContainer = styled.div`
  margin-bottom: 36px;
`;

export {
  AddressTileComponent,
  AddressTileContainerComponent,
  AddressCTAContainerComponent,
  EmptyAddressRow,
  AddNewAddressCTAContainer,
};
