import styled from 'styled-components/native';
import { get } from 'lodash';

const getStyle = props => {
  const marginTop = get(props, 'marginTop', 0);
  const marginBottom = get(props, 'marginBottom', 0);
  return `
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${marginTop};
  margin-bottom: ${marginBottom};
  `;
};

const StyledCheckBox = styled.View`
  ${getStyle}
`;

const StyledImage = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { StyledCheckBox, StyledImage };
