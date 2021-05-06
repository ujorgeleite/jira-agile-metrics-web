import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa';

import { api } from '../../services/api'

import styles from "./style.module.scss"

export function InputFiles() {
  const [files, setFiles] = useState([String])
  const [refresh, setRefresh] = useState(false)

  const getFiles = async () => {
    const { data } = await api.get('List');
    setFiles(data)
  }

  const generateFiles = async () => {
    await api.post('/Process')
    setRefresh(!refresh)
  }

  const removeFiles = async () => {
    await api.delete('/Delete')
    setRefresh(!refresh)
  }

  useEffect(() => {
    getFiles()
  }, [refresh])

  return (
    <div className={styles.InputList}>
      <p>Arquivos enviados</p>
      <ul>
        {
          files.map((file, index) => {
            return (<li key={index}>
              <FaFileExcel className={styles.icon} />
              {file.name}
            </li>)
          })
        }
      </ul>
      <div className={styles.buttons}>
        <button className={styles.generate} type="button" onClick={generateFiles}>Gerar Arquivos</button>
        <button className={styles.remove} type="button" onClick={removeFiles}>Remover Arquivos</button>
      </div>
    </div>
  )
}