

import { useState, useEffect } from 'react'
import { FaFileExcel } from 'react-icons/fa';
import fileDownload from 'js-file-download'

import { api } from '../../services/api'

import styles from './style.module.scss'

type File = {
  name: string
}

export function DownloadFiles() {
  const [files, setFiles] = useState<File[]>([])

  const getDownloadFiles = async () => {
    const { data }: { data: File[] } = await api.get('/Download/List')
    return setFiles(data);
  }

  const downloadFile = async ({ currentTarget: { name } }) => {
    const { data } = await api.get(`/Download?fileName=${name}`, {
      responseType: 'blob',
    })
    return fileDownload(data, name);
  }

  useEffect(() => {
    getDownloadFiles()

  }, [])
  return (
    <div className={styles.DownloadList}>
      <p>Arquivos para Download</p>
      <ul>
        {
          files.map((file, index) => {
            return (
              <li key={index}>
                <button onClick={downloadFile} name={file.name}>
                  <FaFileExcel className={styles.icon} />
                  {file.name}
                </button>
              </li>)
          })
        }
      </ul>
    </div>)

}