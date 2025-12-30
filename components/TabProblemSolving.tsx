import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Server, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

const TabProblemSolving: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<'none' | 'rest' | 'gql'>('none');

  const startRest = () => setActiveSimulation('rest');
  const startGql = () => setActiveSimulation('gql');

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-dev-sidebar p-4 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-white">Scenario: Mobile App Profile</h3>
        <p className="text-gray-400">
          Your app needs to display the <span className="text-white font-bold">User Name</span> and their <span className="text-white font-bold">Post Titles</span>.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center relative bg-gray-900/50 p-6 rounded-lg border border-gray-800">
        
        {/* APP SIDE */}
        <div className="flex flex-col items-center z-10">
           <div className="w-48 h-80 bg-black border-4 border-gray-700 rounded-3xl relative overflow-hidden flex flex-col items-center pt-8 p-2 shadow-2xl">
             <div className="absolute top-2 w-16 h-4 bg-gray-800 rounded-full"></div>
             <div className="w-full text-center text-gray-500 text-xs mb-4 border-b border-gray-800 pb-2">My Social App</div>
             
             {/* Content loaded simulation */}
             <div className="w-full px-2 space-y-2">
                <div className={`h-6 rounded w-3/4 bg-gray-800 transition-colors duration-500 ${activeSimulation !== 'none' ? 'bg-blue-900/50' : ''} flex items-center px-2`}>
                   {activeSimulation === 'rest' && <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}} className="text-xs text-blue-200">Alice Dev</motion.span>}
                   {activeSimulation === 'gql' && <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}} className="text-xs text-blue-200">Alice Dev</motion.span>}
                </div>
                
                <div className="h-20 rounded w-full bg-gray-800 mt-4 p-2 space-y-1">
                   {activeSimulation === 'rest' && (
                     <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 3.5}} className="space-y-1">
                        <div className="h-2 bg-gray-700 rounded w-full"></div>
                        <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-700 rounded w-4/6"></div>
                     </motion.div>
                   )}
                   {activeSimulation === 'gql' && (
                     <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}} className="space-y-1">
                        <div className="h-2 bg-gray-700 rounded w-full"></div>
                        <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-700 rounded w-4/6"></div>
                     </motion.div>
                   )}
                </div>
             </div>
           </div>
           <div className="mt-4 flex gap-4">
             <button 
               onClick={startRest}
               disabled={activeSimulation !== 'none'}
               className="bg-pink-600 hover:bg-pink-500 disabled:opacity-30 px-4 py-2 rounded text-white text-sm font-mono"
             >
               Simulate REST
             </button>
             <button 
                onClick={startGql}
                disabled={activeSimulation !== 'none'}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-30 px-4 py-2 rounded text-white text-sm font-mono"
             >
               Simulate GraphQL
             </button>
           </div>
           {activeSimulation !== 'none' && (
             <button onClick={() => setActiveSimulation('none')} className="mt-2 text-xs text-gray-500 underline">Reset</button>
           )}
        </div>

        {/* SERVER SIDE */}
        <div className="flex flex-col items-center z-10">
           <div className="w-32 h-40 bg-gray-800 border-b-8 border-gray-900 rounded-lg flex flex-col items-center justify-center shadow-xl relative">
              <Server size={48} className="text-gray-500" />
              <div className="mt-2 text-xs font-mono text-gray-400">API Server</div>
              <div className="absolute -right-12 top-10 flex flex-col gap-2">
                 <Database size={24} className="text-gray-600" />
                 <Database size={24} className="text-gray-600" />
              </div>
           </div>
        </div>

        {/* ANIMATIONS */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            
            {/* REST ANIMATION */}
            {activeSimulation === 'rest' && (
              <>
                {/* Request 1: Get User */}
                <motion.div 
                  className="absolute top-1/3 w-4 h-4 rounded-full bg-pink-500"
                  initial={{ left: '30%', opacity: 1 }}
                  animate={{ left: '70%', opacity: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/3 w-8 h-8 rounded bg-gray-700 border border-pink-500 flex items-center justify-center text-[8px] text-white"
                  initial={{ left: '70%', opacity: 0 }}
                  animate={{ left: '30%', opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 1, duration: 1, ease: "linear" }}
                >
                  User JSON (Huge)
                </motion.div>

                 {/* Request 2: Get Posts */}
                <motion.div 
                  className="absolute top-1/2 w-4 h-4 rounded-full bg-pink-500"
                  initial={{ left: '30%', opacity: 0 }}
                  animate={{ left: '70%', opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 2, duration: 1, ease: "linear" }}
                />
                <motion.div 
                   className="absolute top-1/2 w-8 h-8 rounded bg-gray-700 border border-pink-500 flex items-center justify-center text-[8px] text-white"
                   initial={{ left: '70%', opacity: 0 }}
                   animate={{ left: '30%', opacity: [0, 1, 1, 0] }}
                   transition={{ delay: 3, duration: 1, ease: "linear" }}
                 >
                   Posts JSON
                 </motion.div>
              </>
            )}

            {/* GQL ANIMATION */}
            {activeSimulation === 'gql' && (
              <>
                 {/* Single Request */}
                 <motion.div 
                  className="absolute top-1/3 w-4 h-4 rounded-full bg-purple-500"
                  initial={{ left: '30%', opacity: 1 }}
                  animate={{ left: '70%', opacity: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                />
                 <motion.div 
                  className="absolute top-1/3 w-8 h-8 rounded bg-gray-700 border border-purple-500 flex items-center justify-center text-[8px] text-white"
                  initial={{ left: '70%', opacity: 0 }}
                  animate={{ left: '30%', opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 1, duration: 1, ease: "linear" }}
                >
                  Exact Data
                </motion.div>
              </>
            )}

        </div>
        
        {/* Results Panel */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
           {activeSimulation === 'rest' && (
             <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 4}} className="bg-pink-900/20 border border-pink-600 p-4 rounded text-center">
               <h4 className="font-bold text-pink-400">REST Result</h4>
               <p className="text-sm">Requests: 2</p>
               <p className="text-sm">Payload: ~5KB (Over-fetched User data)</p>
               <p className="text-xs text-gray-400 mt-2">The "N+1" Problem simulated.</p>
             </motion.div>
           )}
           {activeSimulation === 'gql' && (
             <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 2}} className="bg-purple-900/20 border border-purple-600 p-4 rounded text-center">
               <h4 className="font-bold text-purple-400">GraphQL Result</h4>
               <p className="text-sm">Requests: 1</p>
               <p className="text-sm">Payload: ~0.5KB</p>
               <p className="text-xs text-gray-400 mt-2">Efficient & Precise.</p>
             </motion.div>
           )}
        </div>

      </div>
    </div>
  );
};

export default TabProblemSolving;
