

import { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'

import { useFileContext } from '../../context/FileContext';
import { api } from '../../services/api'

import styles from './style.module.scss'

type File = {
  name: string
}

export function DownloadFiles() {
  const [files, setFiles] = useState<File[]>([])
  const { refresh, isLoading, isLoadingPage } = useFileContext()

  const getDownloadFiles = async () => {
    const { data }: { data: File[] } = await api.get('/Download/List')
    setFiles(data);
    isLoadingPage(false)
  }

  const downloadFile = async ({ currentTarget: { name } }) => {
    const { data } = await api.get(`/Download?fileName=${name}`, {
      responseType: 'blob',
    })
    return fileDownload(data, name);
  }

  const showFiles = (files) => {
    if (isLoading) {
      return <p className={styles.DownloadList__alert}>Os arquivos serão carregados em breve  , aguarde.</p>
    }

    if (!files || files.length == 0) {
      return <p className={styles.DownloadList__alert}>Nenhum arquivo</p>
    } else {
      return files.map((file, index) => {
        return (
          <li key={index}>
            <button onClick={downloadFile} name={file.name}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
              </svg>
              {file.name}
            </button>
          </li>)
      })
    }
  }



  useEffect(() => {
    getDownloadFiles()
  }, [refresh])
  return (
    <div className={styles.DownloadList}>
      <span className={styles.DownloadList__titulo}>Arquivos para Download</span>
      <ul >

        {
          showFiles(files)
        }
      </ul>
    </div>)

}