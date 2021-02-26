import React from 'react';
import {Pagination} from 'react-bootstrap'

const PaginationComp = ({page, setPage, hasNextPage}) => {
    const adjustPage = n =>{
        setPage(page => page+n)
    }
    return (  
        <Pagination>
            {page>2 && 
            <Pagination.Prev
             onClick={()=>adjustPage(-1)} />
            }
            {page >5 && <Pagination.Item onClick={()=>setPage(1)} >1</Pagination.Item>}
            {page >5 && <Pagination.Ellipsis/>}
            {page !==1 && <Pagination.Item onClick={()=>setPage(page-1)}>{page-1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onClick={()=>setPage(page+1)}>{page+1}</Pagination.Item>}
            {hasNextPage && 
            <Pagination.Next
            onClick={()=>adjustPage(1)} />
        }
        </Pagination>
    );
}
 
export default PaginationComp;