import styled, { css } from 'styled-components/native';

export default styled.View`
  display: flex;
  width: 100%;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  border-bottom-width: ${props => (props.variation === 'detail' ? 0 : 1)};
  border-bottom-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  ${props =>
    props.selectedStoreId
      ? `
        border: solid 1px ${props.theme.colorPalette.gray[500]};
        background-color: ${props.theme.colorPalette.gray[300]};
        `
      : ''};
`;

export const TileHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const TileBody = styled.View`
  display: flex;
  align-items: flex-start;
`;

export const TileFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DetailsHeader = styled.Text`
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  color: ${props => props.theme.colors.TEXT.DARK};
  text-align: ${props => props.textAlign || 'center'};
  text-transform: capitalize;
`;

export const ListingTileWrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ListingTitleStoreName = styled.Text`
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3};
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  color: ${props => props.theme.colors.TEXT.DARK};
  text-align: ${props => props.textAlign || 'center'};
  text-transform: uppercase;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const headerTextStyle = css`
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2};
  font-weight: ${props => props.theme.fonts.fontWeight.normal};
  color: ${props => props.theme.colors.TEXT.DARK};
  text-align: ${props => props.textAlign || 'center'};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  line-height: ${props => props.theme.fonts.fontSize.body.bodytext.copy4};
`;

export const headerLinkStyle = css`
  ${headerTextStyle}
  text-decoration: underline;
`;

export const ListingTitleText = styled.Text`
  ${headerTextStyle}
`;

export const AddressText = styled.Text`
  ${headerTextStyle}
`;

export const StoryType = styled.View`
  display: flex;
  width: 100%;
  height: 14;
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const brandImageStyles = css`
  height: 14;
  width: 59;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const markerImageStyles = css`
  height: 25;
  width: 19;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const FavStore = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const favStoreIconStyles = css`
  width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

export const ButtonPlaceHolder = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const FavStoreText = styled.Text`
  ${headerTextStyle}
  margin-right: 0;
`;

export const FooterBtnWrapper = styled.View`
  flex-direction: row;
  display: flex;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const BtnFullWidth = css`
  width: 100%;
`;

export const FooterBtnRight = styled.View`
  flex: 1;
  padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;
export const FooterBtnLeft = styled.View`
  flex: 1;
  padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;

export const StoreMeta = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export const StoreMetaLeft = styled.View`
  flex-direction: column;
  display: flex;
  flex: 1;
`;
export const StoreMetaRight = styled.View`
  flex-direction: column;
  display: flex;
`;
