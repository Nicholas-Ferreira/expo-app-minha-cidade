import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://backend-peruibe-melhor.us-east-1.elasticbeanstalk.com'
})
