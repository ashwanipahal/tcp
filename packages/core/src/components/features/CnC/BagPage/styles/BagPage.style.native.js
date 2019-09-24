import styled from 'styled-components/native';

export const WrapperStyle = styled.View`
  flex: 1;
`;

export const ScrollViewWrapper = styled.ScrollView`
  height: ${props => (props.showAddTobag ? '60%' : '75%')};
`;

export const HeadingViewStyle = styled.TouchableOpacity`
  width: 50%;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
    ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const SflHeadingViewStyle = styled.TouchableOpacity`
  width: 50%;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const HeadingTextStyle = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs18};
  font-family: ${props => props.theme.typography.fonts.secondary};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  text-align: center;
  width: 100%;
`;

export const InActiveBagHeaderText = styled.Text`
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  color: ${props => props.theme.colors.TEXT.DARKGRAY};
`;

export const ActiveBagHeaderText = styled.Text`
  font-weight: ${props => props.theme.fonts.fontWeight.black};
`;

export const ActiveBagHeaderView = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.black};
  border-bottom-width: 2;
`;

export const InActiveBagHeaderView = styled.View``;

export const RowSectionStyle = styled.View`
  width: 100%;
  margin: 15px 0;
  background: #fff;
`;

export const BonusPointsWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const MainSection = styled.View`
  flex: 1;
  background: #f3f3f3;
  padding-bottom: 15px;
  margin-bottom: 3px;
`;

export const BagHeaderRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;

export const SuccessTickImage = styled.Image`
  width: 23px;
  height: 23px;
  margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;

export const SuccessMessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: ${props => props.theme.colors.NOTIFICATION.SUCCESS};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export default {
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
  ScrollViewWrapper,
  BonusPointsWrapper,
  BagHeaderRow,
  SflHeadingViewStyle,
  InActiveBagHeaderText,
  ActiveBagHeaderText,
  ActiveBagHeaderView,
  InActiveBagHeaderView,
  SuccessTickImage,
  SuccessMessageContainer,
};
