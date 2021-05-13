

import { useState, useEffect } from 'react'
import { FaFileExcel } from 'react-icons/fa';
import fileDownload from 'js-file-download'

import { useFileContext } from '../../context/FileContext';
import { api } from '../../services/api'

import styles from './style.module.scss'

type File = {
  name: string
}

export function DownloadFiles() {
  const [files, setFiles] = useState<File[]>([])
  const { refresh } = useFileContext()

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

  const showFiles = (files) => {
    if(!files || files.length ==0 ){
      return <p>Nenhum arquivo</p>
    }else{
      return files.map((file, index) => {
        return (
          <li key={index}>
            <button onClick={downloadFile} name={file.name}>
              <FaFileExcel className={styles.icon} />
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
      <p>Arquivos para Download</p>
      <ul>
        {
          showFiles(files)
        }
      </ul>
    </div>)

}