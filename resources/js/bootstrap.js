import axios from 'axios';
window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set the base URL to HTTPS
window.axios.defaults.baseURL = 'https://mba-test.on-pasb.com';

// Ensure the X-Requested-With header is set
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
