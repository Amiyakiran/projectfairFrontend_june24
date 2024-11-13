import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
  const [show, setShow] = useState(false);

  const {setAddResponse} = useContext(addResponseContext)

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  const [preview, setPreview] = useState("")
  const [token , setToken] = useState("")
  const [key , setKey]= useState(1)

/*   console.log(projectDetails);
  console.log(preview);
  console.log(token) */;
  

  const handleFile = (e) => {
    /*  console.log(e.target.files[0]); */
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })

  }

  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
    if(key==1){
      setKey(0)
    }
    else{
      setKey(1)
    }
  }

  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info('Please fill the form completely')
    }
    else {
      //append() - if the request conatins uploaded content then the request body should with the help of append method in formData class. - inshort request body should a formData
      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)


      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        
        const result = await addProjectApi(reqBody,reqHeader)
       /*  console.log(result); */
        if(result.status==200){
         
          toast.success('Project added successfully')
          setTimeout(()=>{
            handleClose()
          },2003)
          setAddResponse(result)
        
        }
        else if(result.status==406){
          toast.warning(result.response.data)
          handleCancel()
        }
        else{
          toast.error('Something went wrong')
          handleClose()
        }
        
      }
      else{
        toast.warning('Please login')
      }
    }
  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }

  }, [projectDetails.projectImage])


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  return (
    <>
      <button className='btn rounded-0 text-light' onClick={handleShow} style={{ backgroundColor: 'rgb(62,179,24)' }}>Add Project</button>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectImage">
                  <input id='projectImage' type="file" style={{ display: 'none' }} key={key} onChange={(e) => handleFile(e)} />
                  <img src={preview ? preview : "https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mt-2">
                  <input type="text" value={projectDetails.title} placeholder='Title' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.language} placeholder='Language' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.github} placeholder='Github' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.website} placeholder='Website' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea rows={5} value={projectDetails.overview} className='form-control' placeholder='Overview' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>

     

    </>
  )
}

export default Addproject