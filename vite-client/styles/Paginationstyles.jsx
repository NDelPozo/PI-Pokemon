import styled from 'styled-components';

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PageNumber = styled.li`
  margin: 0 5px;
  display: inline-block;
`;

export const PageLink = styled.a`
  text-decoration: none;
  color: #333;
  background-color: #f0f0f0; /* Cambia el color de fondo según tu preferencia */
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 50%; /* Hace que el enlace tenga forma de círculo */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Agrega esta línea para posicionar elementos relativos */

  &:hover {
    background-color: #ccc; /* Cambia el color de fondo al pasar el ratón */
  }
`;