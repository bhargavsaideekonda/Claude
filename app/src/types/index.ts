/** Domain types used across the app. */

export interface Member {
  id: string;
  name: string;
  phone: string;
  village?: string;
  joinedAt: string; // ISO date
  balance: number; // current savings balance in INR
}

export interface Collection {
  id: string;
  memberId: string;
  amount: number;
  collectedAt: string; // ISO date-time
  collectedBy: string; // soldier id
  note?: string;
}

export interface Loan {
  id: string;
  memberId: string;
  principal: number;
  outstanding: number;
  status: 'pending' | 'approved' | 'active' | 'closed' | 'rejected';
  createdAt: string;
  emiAmount?: number;
  nextEmiDate?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  postedAt: string;
  postedBy: string;
}

export interface AttendanceEntry {
  id: string;
  date: string; // YYYY-MM-DD
  checkIn?: string; // ISO date-time
  checkOut?: string;
}
