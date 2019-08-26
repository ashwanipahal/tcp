import styled from 'styled-components/native';
import Image from '@tcp/core/src/components/common/atoms/Image';

export const ProfileInfoActionTileWrapper = styled.View`
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  flex-basis: 49%;
  margin-bottom: 2%;
`;

export const DoneIconWrapper = styled(Image)`
  position: absolute;
  right: 10;
  top: 10;
  width: 20;
  height: 20;
`;
