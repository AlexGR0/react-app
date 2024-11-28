import { create } from 'dva-core';
import createLoading from 'dva-loading';
import global from '@models/global';

const models = [global];
const app = create();
app.use(createLoading());
models.forEach((item) => app.model(item));
app.start();

const store = app._store;
export default store;
