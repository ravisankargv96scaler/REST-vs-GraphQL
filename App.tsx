import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TabPhilosophy from './components/TabPhilosophy';
import TabRestClient from './components/TabRestClient';
import TabGraphQLExplorer from './components/TabGraphQLExplorer';
import TabProblemSolving from './components/TabProblemSolving';
import TabComparison from './components/TabComparison';
import TabQuiz from './components/TabQuiz';
import { TabConfig, TabId } from './types';
import { 
  BookOpen, 
  Terminal, 
  Network, 
  Smartphone, 
  Scale, 
  HelpCircle 
} from 'lucide-react';

const TABS: TabConfig[] = [
  { id: 'philosophy', label: '1. Philosophy', icon: BookOpen },
  { id: 'rest-client', label: '2. REST Client', icon: Terminal },
  { id: 'graphql-explorer', label: '3. GQL Explorer', icon: Network },
  { id: 'problem-solving', label: '4. Over/Under Fetch', icon: Smartphone },
  { id: 'comparison', label: '5. Comparison', icon: Scale },
  { id: 'quiz', label: '6. Quiz', icon: HelpCircle },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('philosophy');

  const renderContent = () => {
    switch (activeTab) {
      case 'philosophy': return <TabPhilosophy />;
      case 'rest-client': return <TabRestClient />;
      case 'graphql-explorer': return <TabGraphQLExplorer />;
      case 'problem-solving': return <TabProblemSolving />;
      case 'comparison': return <TabComparison />;
      case 'quiz': return <TabQuiz />;
      default: return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-gray-300 font-sans selection:bg-blue-900 selection:text-white">
      {/* Header */}
      <header className="bg-[#333333] px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm font-mono text-gray-300 opacity-70">api-paradigm-interactive</span>
        </div>
        <div className="text-xs text-gray-500">v1.0.0</div>
      </header>

      {/* Navigation */}
      <Navbar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto h-full bg-[#1e1e1e]">
           {renderContent()}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#007acc] text-white px-4 py-1 text-xs flex justify-between items-center">
        <span>TypeScript React Mode</span>
        <span>Space: 2  UTF-8</span>
      </footer>
    </div>
  );
};

export default App;
