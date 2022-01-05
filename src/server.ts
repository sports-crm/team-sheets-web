import config from 'config';
import express from 'express';
import * as path from 'path';

const app = express();
const port = config.get<number>('port');

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './assets/index.html'));
});

app.use('/logos', express.static(path.resolve(__dirname, './assets/logos')));

app.use('/css', express.static(path.resolve(require.resolve('bulma'), '../css')));
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
