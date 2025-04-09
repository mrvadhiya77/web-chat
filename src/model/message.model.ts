export interface Message {
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: any; // Use firebase.firestore.Timestamp for Firestore
  }