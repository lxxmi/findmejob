import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import './App.css';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [find, setFind] = useState(true)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page, find)
  console.log(jobs)
  
  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm
       params={params} 
       find={find}
       setFind={setFind}
       onParamChange={handleParamChange} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.length>0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {jobs &&
      jobs.map((job) =>  <Job key={job.id} job={job} />)
      }
      {jobs.length>0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {jobs && jobs.length===0 && <h2>No jobs found</h2>}
    </Container>
  )
}

export default App;
