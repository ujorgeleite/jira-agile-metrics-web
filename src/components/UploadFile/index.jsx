
import { useFileContext } from '../../context/FileContext'
import { api } from '../../services/api'

import styles from './style.module.scss'

export function UploadFile() {
  const { refresh, refreshPage } = useFileContext()


  const sendFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.file.files[0]
    const fileName = event.target.name.value
    formData.append('fileName', fileName)
    formData.append('uploadFile', file)

    await api.post('Upload', formData)
    refreshPage()
    alert(`Arquivo ${fileName} enviado com sucesso!`)
  }

  return (
    <div className={styles.uploadContainer}>
      <form onSubmit={sendFile}>
        <div className={styles.formContainer}>
          <label htmlFor="name">Name:</label><br/>
          <input className={styles.formContainer__nameInput} type="text" id="name" autoComplete="name" placeholder="Digite o nome do arquivo"required /><br/>
         
          <label className={styles.formContainer__fileName} htmlFor="File"><br/>
          <span >File Name:</span> <br/> 
          <input  type="file" id="file" name="fileUpload" required />
          </label><br/>
          <div className={styles.formContainer__btn}>
          <button className={styles.btnEnviar} type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  )
}