import toast from 'react-hot-toast'

export const uploadImageToCloudinary = async event => {
  if (event.target.files[0]) {
    toast.success('Uploading Image Please Wait...')
    const files = event.target.files
    const url = process.env.URL

    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'new-data')

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    }).then()
    const data = await response.json()
    return data
  }
}
