import styled from 'styled-components/native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

const MainContainer = styled(ViewWithSpacing)`
  margin-right: -14px;
  margin-left: -14px;
  background-color: ${props => props.theme.colorPalette.black};
`;

const Container = styled(ViewWithSpacing)`
  border-bottom-color: ${props => props.theme.colorPalette.white};
  border-bottom-width: ${props => (props.separator ? '1px' : '0px')};
`;

const RowContainer = styled(ViewWithSpacing)`
  flex-direction: row;
`;

export { MainContainer, Container, RowContainer };
