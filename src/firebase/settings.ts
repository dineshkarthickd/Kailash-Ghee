// @ts-nocheck
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const SETTINGS_DOC = 'settings/store';

export const getSettings = async () => {
  try {
    const docRef = doc(db, SETTINGS_DOC);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching settings", error);
    throw error;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const docRef = doc(db, SETTINGS_DOC);
    await setDoc(docRef, settingsData, { merge: true });
  } catch (error) {
    console.error("Error updating settings", error);
    throw error;
  }
};
