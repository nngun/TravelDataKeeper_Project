import * as functions from 'firebase-functions';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

async function setMongo(): Promise<any> {
  mongoose
    .connect(functions.config().mongo.url, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      socketTimeoutMS: 360000,
      connectTimeoutMS: 360000,
      // bufferMaxEntries: 0,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      retryWrites: true,
    })
    .then(
      () => {
        // LOG.INF('Database sucessfully connected');
        functions.logger.info('Database sucessfully connected');
      },
      (error: any) => {
        // LOG.ERR('Database could not connected: ', error);
        functions.logger.error('Database could not connected', error);
      }
    );
}

export default setMongo;
