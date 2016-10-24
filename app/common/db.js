import Datastore from 'nedb';
import config from '../config';

console.log(config);

const db = new Datastore({ filename: config.dataPath, autoload: true });

export default db;