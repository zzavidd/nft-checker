import axios from 'axios';
import fs from 'fs';

import 'dotenv/config';

const address = process.env.ADDRESS!;

const url = new URL('https://testnets-api.opensea.io/api/v1/assets');
url.searchParams.append('owner', address);

axios
  .get(url.href)
  .then(({ data }) => {
    const imageUrl = data.assets[0].image_url;
    console.log(imageUrl);
    return axios({ url: imageUrl, responseType: 'stream' });
  })
  .then(({ data }) => {
    data.pipe(fs.createWriteStream('./images/image.png'));
  })
  .catch(console.error);
