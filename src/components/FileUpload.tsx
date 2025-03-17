import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';
import type { ProcessedData, TrialBalanceEntry } from '../types';

interface FileUploadProps {
  onDataProcessed: (data: ProcessedData) => void;
}

export function FileUpload({ onDataProcessed }: FileUploadProps) {
  const processExcelFile = useCallback(async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      // Basic processing - this would need to be enhanced based on specific file formats
      const entries: TrialBalanceEntry[] = jsonData.map((row: any) => ({
        accountName: row['Account Name'] || row['Account'],
        accountNumber: row['Account Number'] || row['Code'],
        debit: parseFloat(row['Debit'] || '0'),
        credit: parseFloat(row['Credit'] || '0'),
        balance: parseFloat(row['Balance'] || '0'),
      }));

      const processedData: ProcessedData = {
        entries,
        metadata: {
          source: file.name.toLowerCase().includes('xero') ? 'Xero' : 'QuickBooks',
          dateProcessed: new Date().toISOString(),
          fileName: file.name,
        },
      };

      onDataProcessed(processedData);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please ensure it\'s a valid Excel file.');
    }
  }, [onDataProcessed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processExcelFile(file);
  }, [processExcelFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processExcelFile(file);
  }, [processExcelFile]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold mb-2">Upload Trial Balance Report</h3>
      <p className="text-gray-500 mb-4">Drag and drop your QuickBooks or Xero Excel file here</p>
      <label className="inline-block">
        <input
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />
        <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">
          Select File
        </span>
      </label>
    </div>
  );
}