import axios from 'axios';

const githubService = axios.create({
  baseURL: 'https://api.github.com',
});

export { githubService }
