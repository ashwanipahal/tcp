import styled from 'styled-components/native';

const TilesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InnerTileWrapper = styled.View`
  width: 48%;

  margin-bottom: ${props => (props.isPromoList ? '' : props.theme.spacing.ELEM_SPACING.LRG)};
  border: 1px solid red;
`;

const FirstInnerTileWrapper = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { TilesWrapper, InnerTileWrapper, FirstInnerTileWrapper };
