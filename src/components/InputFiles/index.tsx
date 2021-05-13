import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa';
import { useFileContext } from '../../context/FileContext';

import { api } from '../../services/api'

import styles from "./style.module.scss"

export function InputFiles() {
  const [files, setFiles] = useState([String])
  const { refresh, refreshPage } = useFileContext()

  const getFiles = async () => {
    const { data } = await api.get('List');
    setFiles(data)
  }

  const generateFiles = async () => {
     api.post('/Process')
    refreshPage()
  }

  const removeFiles = async () => {
    await api.delete('/Delete')
    refreshPage()
  }

  const showFiles = (files) => {

    if (!files || files.length === 0) {
      return <p>Nenhum arquivo</p>
    }
    return files.map((file, index) => {
      return (
      <li key={index}>
        <FaFileExcel className={styles.icon} />
        {file.name}
      </li>)
    })
  }

  useEffect(() => {
    getFiles()
  }, [refresh])

  return (
    <div className={styles.InputList}>
      <p>Arquivos enviados</p>
      <ul>
        {
          showFiles(files)
        }
      </ul>
      <div className={styles.buttons}>
        <button className={styles.generate} type="button" onClick={generateFiles}>Gerar Arquivos</button>
        <button className={styles.remove} type="button" onClick={removeFiles}>Remover Arquivos</button>
      </div>
    </div>
  )
}