import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DataPreview } from './components/DataPreview';
import type { ProcessedData } from './types';

function App() {
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Financial Data Processor
          </h1>
          <p className="text-gray-600">
            Upload your QuickBooks or Xero trial balance report to begin processing
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <FileUpload onDataProcessed={setProcessedData} />
          {processedData && <DataPreview data={processedData} />}
        </div>
      </div>
    </div>
  );
}

export default App;