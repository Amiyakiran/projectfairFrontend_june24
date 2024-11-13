import React from 'react'
import Card from 'react-bootstrap/Card';
import projectPhoto from '../assets/mediaPlayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import prjPhoto from '../assets/mediaPlayer.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../services/serverUrl';





function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: '100%' }} className='mt-4 shadow border-0 rounded-0'>
        <Card.Img variant="top" src={`${serverUrl}/upload/${project.projectImage}`} className='w-100' onClick={handleShow} style={{height:'250px'}} />
        <Card.Body>
          <Card.Title className='text-center'>{project.title}</Card.Title>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <img src={`${serverUrl}/upload/${project.projectImage}`} alt="no image" className='w-100' />
              </div>
              <div className="col-md-6">
                <h4>Description</h4>
                <p>{project?.overview}</p>
                <h4>Technologies</h4>
                <p>{project?.language}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
          <Link to={project?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='fa-2x me-3' /></Link>
          <Link to={project?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='fa-2x me-3' /></Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard