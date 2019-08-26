import styled from 'styled-components/native';
import Image from '@tcp/core/src/components/common/atoms/Image';

export const ProfileInfoActionTileWrapper = styled.View`
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  flex-basis: 49%;
  align-items: center;
  margin-bottom: 2%;
  height: 150px;
`;

export const DoneIconWrapper = styled(Image)`
  position: absolute;
  right: 10;
  top: 10;
  width: 20;
  height: 20;
`;

export const TileIconWrapper = styled(Image)`
  margin-top: 30px;
  max-height: 55px;
  resizeMode: contain;
`;
