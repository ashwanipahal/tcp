import styled from 'styled-components/native';

const ImageSize = styled.Image`
  height: '60px';
  margin-left: '12px';
  width: '60px';
`;

const TileWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
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
  height: 96px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { TileWrapper, EarnPointDesc, EarnExtraPointsTileImage, ImageSize };
