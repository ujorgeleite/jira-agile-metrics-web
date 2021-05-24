import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa';
import { useFileContext } from '../../context/FileContext';

import { api } from '../../services/api'

import styles from "./style.module.scss"

export function InputFiles() {
  const [files, setFiles] = useState([String])
  const { refresh, refreshPage, isLoadingPage } = useFileContext()

  const getFiles = async () => {
    const { data } = await api.get('List');
    setFiles(data)
  }

  const generateFiles = async () => {
    isLoadingPage(true)
    const { data } = await api.post('/Process')
    setTimeout(() => {
      refreshPage()
    }, (data+8) * 1000);
  }

  const removeFiles = async () => {
    await api.delete('/Delete')
    refreshPage()
  }

  const showFiles = (files) => {

    if (!files || files.length === 0) {
      return <p className={styles.InputList__alert}>Nenhum arquivo</p>
    }
    return files.map((file, index) => {
      return (
        <li key={index}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
          </svg>
          {file.name}
        </li>)
    })
  }

  useEffect(() => {
    getFiles()
  }, [refresh])

  return (
    <div>
      <div className={styles.InputList}>
        <div className={styles.InputList__titulo} >
          <span>Arquivos enviados</span>
        </div>
        <ul>
          {
            showFiles(files)
          }
        </ul>
      </div>
      <div className={styles.InputList__btn}>
        <button className={styles.generate} type="button" onClick={generateFiles}>Gerar Arquivos</button>
        <button className={styles.remove} type="button" onClick={removeFiles}>Remover Arquivos</button>
      </div>
    </div>
  )
}