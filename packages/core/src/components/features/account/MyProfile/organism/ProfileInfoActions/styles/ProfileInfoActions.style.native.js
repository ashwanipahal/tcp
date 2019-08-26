import styled from 'styled-components/native';

export const TopRowWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

export const ProfileProgressWrapper = styled.View`
  flex-basis: 40%;
  align-items: flex-end;
`;

export const ProfileTextWrapper = styled.View`
  flex-basis: 60%;
`;

export const ProfileTileWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
