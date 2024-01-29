import { PaginationContainer, PageNumber, PageLink, PageList } from '../styles/Paginationstyles';

export default function Pagination({ pokemonsPerPage, allPokemon, pagination }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allPokemon / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <PaginationContainer>
      <PageList>
        {pageNumber.map((number) => (
          <PageNumber key={number}>
            <PageLink onClick={() => pagination(number)}>{number}</PageLink>
          </PageNumber>
        ))}
      </PageList>
    </PaginationContainer>
  );
}