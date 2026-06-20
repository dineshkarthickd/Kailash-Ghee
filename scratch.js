import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

// Read firebase config from src/firebase/config.js to know how to connect
// Actually we can just read the file directly
const configContent = fs.readFileSync('./src/firebase/config.js', 'utf8');
console.log(configContent);
