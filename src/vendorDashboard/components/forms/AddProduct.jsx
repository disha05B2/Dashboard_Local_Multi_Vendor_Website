import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName,setProductName]=useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory]= useState("");
  const [description,setDescription] = useState("");
  const [file,setFile]= useState(null);

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleAddProduct = async(e)=>{
    e.preventDefault()
    try {
      const loginToken = localStorage.getItem('loginToken')
      const firmId = localStorage.getItem('firmId')
      if(!loginToken || firmId){
        console.error("User Not Authenticated")
      }
      const formData = new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('category',category);
      formData.append('description',description);
      formData.append('image',file);
      
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body:formData
      })
      const data = await response.json()
      if(response.ok){
        alert("Product Added Successfully")
        setProductName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setFile(null);
      }
    } catch (error) {
      alert("Failed to add product")
      
    }


  }
  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/><br />
            <label>Price</label>
            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/><br />
            <label>Category</label>
            <input type='text' value={category} onChange={(e)=>setCategory(e.target.value)} /><br />
            <label>Description</label>
            <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload}/>
            <br />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct