export interface BPEntry {
  uid?: string;
  type: 'morning' | 'evening';
  time: number;
  systolic: number;
  diastolic: number;
  pulse: number;
}
