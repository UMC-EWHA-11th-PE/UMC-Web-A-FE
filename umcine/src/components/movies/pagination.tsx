
import { movies } from "../../data/movies";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({currentPage, totalPages, onPageChange} :PaginationProps) {

  return (
    <main className="flex flex-rows items-center gap-5 w-[1440px] h-[1185px] py-6 px-1">
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
