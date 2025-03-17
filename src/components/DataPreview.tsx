import React from 'react';
import type { ProcessedData } from '../types';

interface DataPreviewProps {
  data: ProcessedData;
}

export function DataPreview({ data }: DataPreviewProps) {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Processed Data Preview</h3>
          <p className="text-sm text-gray-500">
            Source: {data.metadata.source} | File: {data.metadata.fileName}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.entries.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.accountName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {entry.debit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {entry.credit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {entry.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}