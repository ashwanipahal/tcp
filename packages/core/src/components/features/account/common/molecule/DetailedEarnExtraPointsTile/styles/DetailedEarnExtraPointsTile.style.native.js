import styled from 'styled-components/native';

const TileWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  border-bottom: 2px solid
    ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.orange[800]
        : props.theme.colorPalette.blue[500]};
`;

const EarnPointDesc = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const EarnExtraPointsTileImage = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  height: 100px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    transform: translate3d(-50%, -50%, 0);
  }
  margin-bottom: 5px;
`;

export { TileWrapper, EarnPointDesc, EarnExtraPointsTileImage };
