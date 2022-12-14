import styled from 'styled-components/native';

const TileWrapper = styled.View`
  background: ${props => props.theme.colors.WHITE};
  min-height: 240px;
`;

const PromoTileImage = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { TileWrapper, PromoTileImage };
