import Datastore from 'nedb';
import config from '../config';

const db = new Datastore({ filename: config.dataPath, autoload: true });

export default db;