
import { api } from '../../services/api'

import styles from './style.module.scss'

export function UploadFile() {


  const sendFile = async (event) => {
    const formData = new FormData();
    const file = event.target.file.files[0]
    formData.append('fileName', event.target.name.value)
    formData.append('uploadFile', file)

    const result = await api.post('Upload', formData)
  }

  return (
    <div className={styles.uploadContainer}>
      <form onSubmit={sendFile}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete="name" required />
        </div>
        <div>
          <div>
            <label htmlFor="File">
              File Name:
          <input type="file" id="file" name="fileUpload" required />
            </label>
          </div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
}