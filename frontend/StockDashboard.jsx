import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Heart, ShoppingCart,
  Plus, Minus, Star, Wallet, PieChart, Bell,
  Settings, Home, FileText, Briefcase, DollarSign,
  CreditCard, History, BarChart2, Search
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Orders from './pages/Orders';
import Holdings from './pages/Holdings';
import PortfolioGraph from './components/PortfolioGraph';

const StockDashboard = () => {
  const [hoveredStock, setHoveredStock] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notifications] = useState([
    { id: 1, message: 'Your order for TFC was executed', time: '2 mins ago', read: false },
    { id: 2, message: 'Market update: Index up by 1.2%', time: '15 mins ago', read: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock stock data
  const [stocks] = useState([
    { id: 1, name: '180dc', symbol: 'TFC', price: 245.67, change: 12.34, changePercent: 5.27, volume: '1.2M' },
    { id: 2, name: 'LDC', symbol: 'GEL', price: 89.23, change: -3.45, changePercent: -3.72, volume: '890K' },
    { id: 3, name: 'Uniq', symbol: 'DSI', price: 156.78, change: 8.91, changePercent: 6.03, volume: '2.1M' },
    { id: 4, name: 'D&D', symbol: 'CVS', price: 324.12, change: -15.67, changePercent: -4.61, volume: '750K' },
    { id: 5, name: 'TechCorp', symbol: 'TCH', price: 112.45, change: 3.21, changePercent: 2.93, volume: '1.5M' },
    { id: 6, name: 'FinServe', symbol: 'FSV', price: 78.90, change: -1.23, changePercent: -1.53, volume: '650K' },
  ]);

  // Filter stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Portfolio data
  const portfolioData = {
    totalValue: 125486.73,
    dayChange: 2456.89,
    dayChangePercent: 2.01,
    totalInvested: 120000,
    totalProfit: 5486.73,
    allocation: [
      { name: 'Tech', value: 45, color: '#60A5FA' },
      { name: 'Finance', value: 25, color: '#34D399' },
      { name: 'Healthcare', value: 15, color: '#FBBF24' },
    ]
  };

  const toggleFavorite = (stockId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(stockId)) {
      newFavorites.delete(stockId);
    } else {
      newFavorites.add(stockId);
    }
    setFavorites(newFavorites);
  };

  const handleStockAction = (action, stock) => {
    console.log(`${action} action for ${stock.symbol}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-light">Portfolio Overview</h1>
                <div className="text-sm bg-blue-900 bg-opacity-50 px-3 py-1 rounded-full flex items-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Account: ₹{portfolioData.totalValue.toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">Total Portfolio Value</div>
                  <div className="text-2xl font-semibold">₹{portfolioData.totalValue.toLocaleString()}</div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">Today's Change</div>
                  <div className={`text-2xl font-semibold flex items-center ${portfolioData.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {portfolioData.dayChange >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                    ₹{Math.abs(portfolioData.dayChange).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">Total Invested</div>
                  <div className="text-2xl font-semibold">₹{portfolioData.totalInvested.toLocaleString()}</div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">Total P&L</div>
                  <div className={`text-2xl font-semibold ${portfolioData.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{portfolioData.totalProfit.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Graph */}
            <PortfolioGraph />

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-light mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  className="flex flex-col items-center h-24"
                  onClick={() => handleStockAction('quick_buy', { symbol: 'QUICK' })}
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span>Buy Stocks</span>
                </Button>
                
                <Button 
                  variant="destructive"
                  className="flex flex-col items-center h-24"
                  onClick={() => handleStockAction('quick_sell', { symbol: 'QUICK' })}
                >
                  <Minus className="w-5 h-5 mb-1" />
                  <span>Sell Stocks</span>
                </Button>
                
                <Button 
                  variant="secondary"
                  className="flex flex-col items-center h-24"
                  onClick={() => handleStockAction('view_reports', { symbol: 'QUICK' })}
                >
                  <PieChart className="w-5 h-5 mb-1" />
                  <span>View Reports</span>
                </Button>
              </div>
            </div>
          </div>
        );
      case 'Orders':
        return <Orders />;
      case 'Holdings':
        return <Holdings />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl text-gray-400">Coming Soon</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white font-sans flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-16 md:w-56 bg-gray-900/80 backdrop-blur-md border-r border-gray-800 flex-shrink-0">
        <div className="p-4 flex justify-center md:justify-start">
          <div className="text-xl font-bold text-blue-400 flex items-center">
            <Star className="w-5 h-5 mr-2" fill="#60A5FA" />
            <span className="hidden md:inline">WarangalStocks</span>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col space-y-1 p-2">
            {[
              { name: 'Dashboard', icon: Home },
              { name: 'Orders', icon: FileText },
              { name: 'Holdings', icon: Briefcase },
              { name: 'Positions', icon: DollarSign },
              { name: 'Bids', icon: CreditCard },
              { name: 'Funds', icon: History },
              { name: 'Reports', icon: BarChart2 },
              { name: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                  activeTab === item.name 
                    ? 'bg-blue-900/50 text-blue-400' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <nav className="bg-gray-900/80 backdrop-blur-md text-white p-4 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <Settings className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </nav>

        {/* Scrollable Main Content */}
        <ScrollArea className="flex-1">
          <main className="container mx-auto px-4 py-8">
            {renderContent()}
          </main>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Market Data */}
      <div className="hidden lg:block w-80 bg-gray-900/80 backdrop-blur-md border-l border-gray-800 flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Live Market Data</h2>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="pl-10 bg-gray-800 border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-4">
            {filteredStocks.map((stock) => (
              <div
                key={stock.id}
                className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700"
                onMouseEnter={() => setHoveredStock(stock.id)}
                onMouseLeave={() => setHoveredStock(null)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="font-semibold text-white mr-2">{stock.symbol}</div>
                      {favorites.has(stock.id) && (
                        <Heart className="w-3 h-3 text-pink-500" fill="#EC4899" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Vol: {stock.volume}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-white">₹{stock.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center justify-end ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>

                {/* Hover Actions */}
                {hoveredStock === stock.id && (
                  <div className="mt-3 flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleStockAction('buy', stock)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleStockAction('sell', stock)}
                    >
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Sell
                    </Button>
                    <Button 
                      variant={favorites.has(stock.id) ? "default" : "ghost"}
                      size="sm" 
                      onClick={() => toggleFavorite(stock.id)}
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default StockDashboard;