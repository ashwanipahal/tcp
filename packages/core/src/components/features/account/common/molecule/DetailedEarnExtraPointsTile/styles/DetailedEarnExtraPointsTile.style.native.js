import styled from 'styled-components/native';

const ImageSize = styled.Image`
  height: 60px;
  width: 60px;
`;

const TileWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  border-bottom-width: 2px;
  min-height: 275px;
  border-bottom-color: ${props =>
    props.theme.isGymboree
      ? props.theme.colorPalette.orange[800]
      : props.theme.colorPalette.blue[500]};
`;

const EarnPointDesc = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  margin-top: ${props =>
    props.viewAll ? props.theme.spacing.LAYOUT_SPACING.LRG : props.theme.spacing.ELEM_SPACING.XXS};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const EarnExtraPointsTileImage = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { TileWrapper, EarnPointDesc, EarnExtraPointsTileImage, ImageSize };
