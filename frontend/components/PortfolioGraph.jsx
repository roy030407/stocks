import React, { useState } from 'react';
import { Plus, Minus, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PortfolioGraph = () => {
  const [graphData, setGraphData] = useState([
    { value: 100, label: 'Jan' },
    { value: 120, label: 'Feb' },
    { value: 115, label: 'Mar' },
    { value: 130, label: 'Apr' },
    { value: 140, label: 'May' },
  ]);

  const updateGraphValue = (index, newValue) => {
    const newData = [...graphData];
    newData[index].value = Number(newValue) || 0;
    setGraphData(newData);
  };

  const addGraphPoint = () => {
    const lastPoint = graphData[graphData.length - 1];
    const newLabel = String.fromCharCode(lastPoint.label.charCodeAt(0) + 1);
    setGraphData([...graphData, { value: lastPoint.value, label: newLabel }]);
  };

  const removeGraphPoint = () => {
    if (graphData.length > 1) {
      setGraphData(graphData.slice(0, -1));
    }
  };

  // Calculate graph dimensions and scaling
  const maxValue = Math.max(...graphData.map(point => point.value));
  const minValue = Math.min(...graphData.map(point => point.value));
  const range = maxValue - minValue;
  const padding = range * 0.1; // 10% padding
  const graphHeight = 300;
  const graphWidth = 800;
  const pointSpacing = graphWidth / (graphData.length - 1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Portfolio Performance
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={addGraphPoint}>
            <Plus className="w-4 h-4 mr-1" /> Add Point
          </Button>
          <Button variant="outline" size="sm" onClick={removeGraphPoint}>
            <Minus className="w-4 h-4 mr-1" /> Remove Point
          </Button>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
        <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-64">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={graphWidth} height={graphHeight} fill="url(#grid)" />
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((_, index) => {
            const value = minValue - padding + (range + 2 * padding) * (1 - index / 4);
            const y = (index / 4) * graphHeight;
            return (
              <g key={value}>
                <line 
                  x1="60" 
                  y1={y} 
                  x2={graphWidth - 20} 
                  y2={y} 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1" 
                  strokeDasharray="5,5"
                />
                <text 
                  x="50" 
                  y={y + 5} 
                  fill="rgba(255,255,255,0.7)" 
                  fontSize="12" 
                  textAnchor="end"
                >
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}
          
          {/* Line chart */}
          <polyline
            fill="none"
            stroke="#60A5FA"
            strokeWidth="3"
            points={graphData.map((point, index) => {
              const x = 80 + (index * pointSpacing);
              const y = graphHeight - ((point.value - (minValue - padding)) / (range + 2 * padding)) * graphHeight;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {graphData.map((point, index) => {
            const x = 80 + (index * pointSpacing);
            const y = graphHeight - ((point.value - (minValue - padding)) / (range + 2 * padding)) * graphHeight;
            return (
              <g key={index}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="#60A5FA" 
                  stroke="white" 
                  strokeWidth="2"
                />
                <text 
                  x={x} 
                  y={graphHeight + 20} 
                  fill="rgba(255,255,255,0.7)" 
                  fontSize="12" 
                  textAnchor="middle"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
          
          {/* Area fill under the line */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <polygon
            fill="url(#areaGradient)"
            points={`80,${graphHeight} ${graphData.map((point, index) => {
              const x = 80 + (index * pointSpacing);
              const y = graphHeight - ((point.value - (minValue - padding)) / (range + 2 * padding)) * graphHeight;
              return `${x},${y}`;
            }).join(' ')} ${80 + (graphData.length - 1) * pointSpacing},${graphHeight}`}
          />
        </svg>
      </div>

      {/* Data point controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {graphData.map((point, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`point-${index}`}>{point.label}</Label>
            <Input
              id={`point-${index}`}
              type="number"
              value={point.value}
              onChange={(e) => updateGraphValue(index, e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGraph; 