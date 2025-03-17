export interface TrialBalanceEntry {
  accountName: string;
  accountNumber: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface ProcessedData {
  entries: TrialBalanceEntry[];
  metadata: {
    source: 'QuickBooks' | 'Xero';
    dateProcessed: string;
    fileName: string;
  };
}