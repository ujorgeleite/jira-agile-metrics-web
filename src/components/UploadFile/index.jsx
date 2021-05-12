
import { api } from '../../services/api'

import styles from './style.module.scss'

export function UploadFile() {


  const sendFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.file.files[0]
    const fileName = event.target.name.value
    formData.append('fileName', fileName)
    formData.append('uploadFile', file)

    await api.post('Upload', formData)
    alert(`Arquivo ${fileName} enviado com sucesso!`)
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