import styled, { css } from 'styled-components/native';

const PageContainer = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const Container = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const TitleText = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  color: ${props => props.theme.colorPalette.gray[900]};
  line-height: 19.2;
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

const getFlatListContainerStyle = () => ({
  marginTop: 8,
});

const ItemSeparatorStyle = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ApplyAndClearButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: row;
  justify-content: space-between;
`;

const styles = css``;

export {
  styles,
  PageContainer,
  Container,
  getFlatListContainerStyle,
  ItemSeparatorStyle,
  TitleText,
  ApplyAndClearButtonContainer,
};
