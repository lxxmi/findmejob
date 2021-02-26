import React, {useState} from 'react'
import useFetchJobs from './useFetchJobs'
import {Container} from 'react-bootstrap'
import Job from './Job'
import PaginationComp from './PaginationComp';
import InputForm from './InputForm'
import Loader from './Loader'

const App = () => {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const {jobs, error, loading, hasNextPage} = useFetchJobs(params, page);
  let footer

  function handleParams(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  if(jobs.length >0) {
     footer = <PaginationComp page={page} setPage={setPage} hasNextPage={hasNextPage} />
    }
    if(!loading && jobs.length <1) {
      footer = <h3>No jobs found for the above parameters</h3>
     }
  

  return (
    <Container className='my-4'>
      <h1>GitHub Jobs</h1>
      <Loader/>
      <InputForm params={params} onParamChange={handleParams} />
      {loading && <Loader/>}
      {error && <h5>Something went wrong</h5>}
      {jobs.map(job =>{
        return <Job key={job.id} job ={job} />
      })
      }
      {footer}
    </Container>
  );
}

 
export default App;