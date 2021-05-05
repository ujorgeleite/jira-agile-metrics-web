import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa';

import { api } from '../../services/api'

import styles from "./style.module.scss"

export function InputFiles() {
  const [files, setFiles] = useState([String])

  const getFiles = async () => {
    const { data } = await api.get('List');
    setFiles(data)
  }

  useEffect(() => {
    getFiles()
  }, [])

  return (
    <div className={styles.InputList}>
      <p>Arquivos enviados</p>
      <ul>
        {
          files.map((file, index) => {
            return (<li key={index}>
              <FaFileExcel className={styles.icon}/>
              {file.name}
            </li>)
          })
        }
      </ul>
    </div>
  )
}