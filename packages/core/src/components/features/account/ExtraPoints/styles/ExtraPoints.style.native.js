import styled from 'styled-components/native';

const TilesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InnerTileWrapper = styled.View`
  width: 184px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const FirstInnerTileWrapper = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const MprTermsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { TilesWrapper, InnerTileWrapper, FirstInnerTileWrapper, MprTermsWrapper };
