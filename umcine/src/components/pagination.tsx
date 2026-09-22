
import { movies } from "../data/movies";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({currentPage, totalPages, onPageChange} :PaginationProps) {


  return (
    <main className="pagination">
      <button 
        onClick={() =>
          {((currentPage>0)&&(currentPage<movies.length))? onPageChange(currentPage):onPageChange(currentPage-1)}
        }
      >
        {"<"}
      </button>
      
        <p>{currentPage}</p>

      <button 
        onClick={() =>
          {( ((currentPage>0)&&(currentPage<totalPages))? onPageChange(currentPage):onPageChange(currentPage+1) )}
        }
      >
        {">"}
      </button>
    </main>
    
  )
}
