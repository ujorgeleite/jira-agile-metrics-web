import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://jira-agile-metrics-api.herokuapp.com/'
})