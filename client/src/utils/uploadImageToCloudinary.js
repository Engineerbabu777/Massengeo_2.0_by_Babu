
import toast from 'react-hot-toast';



export const uploadImageToCloudinary = async(event) => {
    if (event.target.files[0]) {
        toast.success('Uploading Image Please Wait...')
        const files = event.target.files
        const url = "http://api.cloudinary.com/v1_1/djo2k58eq/image/upload"
        // const url = "add_url";

  
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'new-data')
  
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        }).then()
        const data = await response.json()
        return data;
      }
}