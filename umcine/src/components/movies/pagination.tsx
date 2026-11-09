
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};


export function Pagination({currentPage, totalPages, onPageChange} :PaginationProps) {

  const handlePageChange = (newPage: number) => {
    if(newPage>=1 && newPage<=totalPages) {
      onPageChange(newPage); }
  }

  return (
    <div className="flex flex-rows items-center gap-5 w-fit h-auto py-4 px-1">
      <button 
        onClick= {() => handlePageChange(currentPage-1)}
      >
        <img src="icons/chevron-left.svg" className="w-6 h-6"/>
      </button >
      <div className="flex flex-row">
        {/*<p>{currentPage}/{totalPages}</p>*/}
        <button className="w-9 h-9 px-[6px] py-[1px] rounded-[7px]">1</button>
        <button className="w-9 h-9 px-[6px] py-[1px] rounded-[7px]">2</button>
        <button className="w-9 h-9 px-[6px] py-[1px] rounded-[7px]">3</button>
        <button className="w-9 h-9 px-[6px] py-[1px] rounded-[7px]">4</button>
        <button className="w-9 h-9 px-[6px] py-[1px] rounded-[7px]">5</button>
      </div>

      <button 
        onClick={() => handlePageChange(currentPage+1)}
      >
        <img src="icons/chevron-right.svg" className="w-6 h-6"/>
      </button>
    </div>
    
  )
}
