import { create } from 'dva-core';
import global from '@models/global';

const models = [global];
const app = create();
models.forEach((item) => app.model(item));
app.start();

const store = app._store;
export default store;
