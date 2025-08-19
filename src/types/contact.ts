export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    photoUrl?: string; // Optional field
    createdAt: Date;
    userId?: string; // Optional, depending on API response
  }