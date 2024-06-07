import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState("");
  const [file,setFile]=useState(null);

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("User not authenticated");
      }
    

      const formData = new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('category',category);
      formData.append('image',file);
      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data = await response.json()
      if(response.ok){
        console.log(data);
        alert("Firm added successfully");
        setFirmName("");
        setArea("");
        setCategory("");
        setFile(null);
      }
      else if(data.message ==="Vendor can have only one firm"){
        alert("Firm Exists. Only 1 firm can be added")
      }
      else{
        alert("Failed to add firm")
      }
      console.log("This is firmid",data.firmId);
      const firmId = data.firmId;
      localStorage.setItem("firmId",firmId)
    }

    catch (error) {
      console.error("Failed to add firm")
    }
  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br />
            <label>Area</label>
            <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
            <label>Category</label>
            <input type='text' name='category' value={category} onChange={(e)=>setCategory(e.target.value)}/><br />
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload} />
            <br />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm