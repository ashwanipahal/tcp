import styled from 'styled-components/native';

export const WrapperStyle = styled.View`
  flex: 1;
`;

export const ScrollViewWrapper = styled.ScrollView`
  height: ${props => (props.showAddTobag ? '60%' : '75%')};
`;

export const HeadingViewStyle = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.primary.dark};
  border-bottom-width: 2;
  margin: 0;
  width: 50%;
  padding: 13px 14px 22px;
  margin-left: 10px;
`;

export const HeadingTextStyle = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs18};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  text-align: center;
  width: 100%;
`;

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

export default {
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
  ScrollViewWrapper,
  BonusPointsWrapper,
};
