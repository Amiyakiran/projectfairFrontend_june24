import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {
  const [userProject, setUserProject] = useState([])
  const {addResponse} =  useContext(addResponseContext)
  const {editResponse} = useContext(editResponseContext)
  const [removeStatus , setRemoveStatus] = useState({})

  const getUserProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await userProjectApi(reqHeader)
      // console.log(result);
      setUserProject(result.data);

    }

  }
/*   console.log(userProject); */

  const handleDelete = async(id)=>{
     if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await removeUserProjectApi(id , reqHeader)
     /*  console.log(result); */
       if(result.status==200){
        setRemoveStatus(result)
       }
       else{
        alert('something went wrong')
       }
     }
  }

  useEffect(() => {
    getUserProject()
  }, [addResponse, removeStatus , editResponse])

  return (
    <div className='p-4 shadow w-100'>
      <div className="d-flex mt-4 justify-content-between">
        <h3 style={{ color: 'rgb(62,179,24)' }}>My Project</h3>
        <Addproject />
      </div>
      {userProject?.length > 0 ?
        userProject?.map((item) => (
          <div className='p-3 bg-light mt-4 rounded-2 d-flex justify-content-between align-items-center'>
            <h4>{item?.title}</h4>
            <div className="d-flex">
              <Edit projects = {item} />
              <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='text-warning mx-3 ' /></Link>
              <Link to={item?.github} target='_blank' > <FontAwesomeIcon icon={faGithub} className='text-success mx-3' /></Link>
              <FontAwesomeIcon icon={faTrashCan} className='text-danger mx-3' onClick={()=>handleDelete(item?._id)} />
            </div>
          </div>
        ))

        :
        <h4 className='text-center text-warning mt-5'>No project added yet</h4>}

    </div>
  )
}

export default Myproject