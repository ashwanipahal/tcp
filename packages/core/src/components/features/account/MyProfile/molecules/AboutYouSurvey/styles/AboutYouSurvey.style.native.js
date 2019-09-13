import styled from 'styled-components/native';

export const StageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ActionsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  width: 100%;
`;

export const SurveyWrapper = styled.View`
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XL}
    ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export const Title = styled.View`
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 75px;
  width: 80%;
`;

export const StageLine = styled.View`
  border-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray['500']};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
`;

export const TouchableWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextStyle = {
  flex: 1,
  textAlign: 'center',
};
