import React from 'react';
import { TabConfig, TabId } from '../types';
import { clsx } from 'clsx';

interface NavbarProps {
  tabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="bg-[#252526] border-b border-gray-700 overflow-x-auto">
      <div className="flex px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive 
                  ? "border-blue-500 text-white bg-[#1e1e1e]" 
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2d2d2d]"
              )}
            >
              <Icon size={16} className={isActive ? "text-blue-400" : "text-gray-500"} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
