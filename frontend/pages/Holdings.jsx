import React from 'react';
import { FileText, PieChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Holdings = () => {
  const holdings = [
    { id: 1, symbol: 'TFC', quantity: 500, avgPrice: 240.50, currentPrice: 245.67, value: 122835, profit: 2585 },
    { id: 2, symbol: 'GEL', quantity: 200, avgPrice: 85.00, currentPrice: 89.23, value: 17846, profit: 846 },
  ];

  const allocation = [
    { name: 'Tech', value: 45, color: '#60A5FA' },
    { name: 'Finance', value: 25, color: '#34D399' },
    { name: 'Healthcare', value: 15, color: '#FBBF24' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light">Holdings</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <PieChart className="w-4 h-4 mr-2" />
            View Allocation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {holdings.map((holding) => (
                  <tr key={holding.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{holding.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{holding.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{holding.avgPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{holding.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{holding.value.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${holding.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ₹{holding.profit.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-gray-700 p-6">
          <h2 className="text-xl font-light mb-4">Portfolio Allocation</h2>
          <div className="space-y-4">
            {allocation.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings; 