import { createClient } from 'contentful';

console.log('Space ID:', process.env.REACT_APP_CONTENTFUL_SPACE_ID);
console.log('Access Token:', process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN);

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});

export default client;