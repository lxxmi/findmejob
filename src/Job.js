import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactTextFormat from 'react-text-format'

export default function Job({ job }) {
  const [open, setOpen] = useState(false)

  return (
      <Card className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between">
                <div>
                    <Card.Title>
                        {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                        {new Date(job.created_at).toLocaleDateString()}
                    </Card.Subtitle>
                    <Badge className='mr-2' variant ='secondary'>{job.type}</Badge>
                    <Badge className='mr-2' variant ='secondary'>{job.location}</Badge>
                        <div style={{wordBreak:'break-all'}}>
                        <ReactTextFormat >
                            <ReactMarkdown source={job.how_to_apply} />
                            </ReactTextFormat>
                        </div>
                </div>
                <img className="d-none d-md-block" src={job.company_logo} height="50px" alt={job.company}/>
            </div>
            <Card.Text>
                <Button onClick={()=>setOpen(open => !open)}
                 variant="primary">
                     {open ? 'Hide Details':'View Details'}
                </Button>
            </Card.Text>
            <Collapse in={open}>
                <div className="mt-4">
                    <ReactTextFormat>
                        <ReactMarkdown source={job.description} />
                    </ReactTextFormat>
                </div>
                </Collapse>
            </Card.Body>
        </Card>
  )
}
