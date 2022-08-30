import styled from 'styled-components/native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

const MyFavoriteTileItemContainer = styled.View`
  height: 20px;
  flex: 1;
  flex-direction: row;
`;

const BodyCopyWrapper = styled(BodyCopy)`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  text-transform: ${props => (props.textTransform ? props.textTransform : 'capitalize')};
`;

const LeftContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export { MyFavoriteTileItemContainer, LeftContainer, RightContainer, BodyCopyWrapper };
