import styled from 'styled-components';

const GridBody = styled.div`
  display: grid;
  grid-template-rows: minmax(90px, auto) auto;
  grid-template-columns: 1fr 4fr 1fr;
  justify-items: center;
`;

export default GridBody;
