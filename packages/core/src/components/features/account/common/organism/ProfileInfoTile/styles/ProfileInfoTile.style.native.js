import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[600]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ProfileInfoTileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const InfoContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const EmailContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
const Row = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
`;

const LeftCol = styled.View`
  flex: 1.5;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightCol = styled.View`
  flex: 0.5;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export {
  UnderlineStyle,
  ProfileInfoTileContainer,
  ButtonWrapperStyle,
  InfoContainer,
  EmailContainer,
  Row,
  LeftCol,
  RightCol,
};
