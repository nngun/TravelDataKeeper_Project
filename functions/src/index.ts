import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import setMongo from './config/mongo';
import setRoutesAndCors from './config/routers';

//hosting configuration for deployment of backend
admin.initializeApp(functions.config().firebase);
const app = express();
app.use(express.urlencoded({ extended: true }));

async function main(): Promise<any> {
  try {
    //database config and start (config/mongo.ts)
    await setMongo();
    //security layer and API end-points (config/routers.ts and routes/apiroutes.routes.ts)
    setRoutesAndCors(app);
  //wildcard - in case endpoints could return nothing to incoming requests 
    app.all('/*', function (req, res) {
      res.status(404).send({ error: 'Api returned nothing XD' });
    });
  } catch (err) {
    console.error(err);
  }
}

// starts backend of application
main();

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '2GB' as '2GB',
};

export const ctmaps = functions.runWith(runtimeOpts).region('europe-west3').https.onRequest(app);
