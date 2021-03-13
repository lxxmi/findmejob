import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export default function SearchForm({ params, onParamChange, find, setFind }) {

  const handleClick = ()=>{
    if(params.description || params.location){
      setFind(!find)
    }
  }
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col} lg="6">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={onParamChange} value={params.description} name="description"
          className="px-3" placeholder="Search by job name, companies, keywords" type="text" />
        </Form.Group>
        <Form.Group as={Col} lg="5">
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={onParamChange} value={params.location} name="location"
          className="px-3" placeholder="City, state, country" type="text" />
        </Form.Group>
      </Form.Row>
      <Form.Row className="d-flex align-items-center justify-content-between">
        <Form.Group className="ml-2 my-0">
            <Form.Check onChange={onParamChange} value={params.full_time} name="full_time" id="full-time" label="Only Full Time" type="checkbox" className="mb-2" />
          </Form.Group>
        <Button className="mr-2 px-4" onClick={handleClick} variant="primary">
          Find
        </Button>
      </Form.Row>
    </Form>
  )
}
