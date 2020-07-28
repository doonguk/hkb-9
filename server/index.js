require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { urlencoded, json } = require('express');
const apiRoutes = require('./routes');
const { SERVER_PORT } = require('./utils/constants');
const { errorHandler } = require('./middlewares/error');

const app = express();

app.use(urlencoded({ extended: true }), json());
// urlencoeded 함수를 사용하면 자동으로 req 객체에 body property를 넣어줌 -> 그걸 json화
// https://sjh836.tistory.com/154 참고 했음
// 주석은 다음 PR에서 제거할 계획

app.use(morgan('dev'));

app.use('/api', apiRoutes);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`server is listening on port ${SERVER_PORT}`);
});
