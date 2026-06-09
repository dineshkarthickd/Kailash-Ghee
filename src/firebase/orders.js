import { collection, doc, getDocs, getDoc, setDoc, updateDoc, serverTimestamp, query, orderBy, where } from 'firebase/firestore';
import { db, auth } from './config';

const collectionName = 'orders';

export const createOrder = async (orderData) => {
  try {
    // We use the custom generated orderId as the document ID
    const docRef = doc(db, collectionName, orderData.orderId);
    await setDoc(docRef, {
      ...orderData,
      paymentMethod: 'COD',
      transactionId: null,
      createdAt: serverTimestamp()
    });
    return orderData.orderId;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const docRef = doc(db, collectionName, orderId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching order", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(db, collectionName), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, updateData) => {
  try {
    const docRef = doc(db, collectionName, orderId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating order status", error);
    throw error;
  }
};
