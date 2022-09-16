import React, {FC, useState} from 'react'
interface Props {
    projectsPerPage: number;
    totalProjects: number;
    paginate:(page:number)=> void;
    page: number;
}



const Pagination: FC<Props> = ({projectsPerPage, totalProjects,paginate, page}:Props) => {
    console.log(page,'PAGE')
    // const [pageNumber, setPageNumber] = useState(page)
    const plus1 = page+1;
    const minus1 = page-1;
    const pageNumbers = [];
    for(let i = 1; i<=Math.ceil(totalProjects / projectsPerPage); i++){
        pageNumbers.push(i)
    }
    const pageNumberSlice = pageNumbers.slice(page-1, page+2)
    const paginationMap = pageNumberSlice.map(number=>{
        return(
        <li key={number} className='page-item'>
            <p onClick={()=>paginate(number)} className="page-link">
                {number}
            </p>
        </li>
        )
    })
  return (
    <nav>
        <ul className="pagination">
         
        <p onClick={()=>paginate(minus1)} className="page-link">&laquo;</p>
         {paginationMap}
         <p onClick={()=>paginate(plus1)} className="page-link">&raquo;</p>
        </ul>
    </nav>
  )
}

export default Pagination