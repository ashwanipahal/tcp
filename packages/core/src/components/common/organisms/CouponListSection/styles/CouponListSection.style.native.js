import styled, { css } from 'styled-components';

const styles = css``;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: column;
`;
const PCContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const TitleContainer = styled.View`
  margin-bottom: 24px;
  padding: 0px 15px 0px 13px;
`;

const CardContainer = styled.View`
  width: 100%;
`;

const IconContainer = styled.View`
  text-align: center;
  justify-content: center;
  background: ${props => props.theme.colors.PRIMARY.GREEN};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  height: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const IconTextContainer = styled.Text`
  text-align: center;
  justify-content: center;
  line-height: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  background: ${props => props.theme.colors.PRIMARY.GREEN};
  color: ${props => props.theme.colors.WHITE};
`;

const ShowMoreContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 15px 0px 13px;
`;

export {
  styles,
  WrapperStyle,
  PCContainer,
  TitleContainer,
  CardContainer,
  ShowMoreContainer,
  IconContainer,
  IconTextContainer,
};
