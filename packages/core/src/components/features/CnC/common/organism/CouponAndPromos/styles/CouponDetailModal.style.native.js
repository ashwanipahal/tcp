import styled from 'styled-components/native';

const ModalHeaderStyle = { maxHeight: 50 };

const FullHeaderStyle = { width: '100%' };

const StyledModalWrapper = styled.View`
  align-items: center;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const Horizontal = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
  flex-direction: row;
  width: 100%;
`;

const PrivacyContent = styled.View`
  text-align: left;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { StyledModalWrapper, Horizontal, PrivacyContent, ModalHeaderStyle, FullHeaderStyle };
