import styled from 'styled-components/native';

export const OptionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const Options = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS};
  text-align: center;
  flex-direction: row;
  height: 45px;
`;

export const QuestionWrapper = styled.View`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const QuestionText = styled.View`
  align-items: center;
  justify-content: center;
  text-align: center;
`;
