import React, { useState } from 'react';
import { Utensils, CheckSquare, Square, ShoppingBag, Coffee, Sandwich, Salad, Drumstick } from 'lucide-react';

const TabPhilosophy: React.FC = () => {
  const [restServed, setRestServed] = useState<boolean>(false);
  const [gqlSelection, setGqlSelection] = useState({
    burger: false,
    fries: false,
    drink: false,
    salad: false
  });
  const [gqlServed, setGqlServed] = useState<string[] | null>(null);

  const toggleGql = (item: keyof typeof gqlSelection) => {
    setGqlSelection(prev => ({ ...prev, [item]: !prev[item] }));
    setGqlServed(null); // Reset served state on change
  };

  const handleRestOrder = () => {
    setRestServed(true);
  };

  const handleGqlOrder = () => {
    const served = Object.entries(gqlSelection)
      .filter(([_, selected]) => selected)
      .map(([key]) => key);
    setGqlServed(served);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      {/* REST SIDE */}
      <div className="bg-dev-sidebar p-6 rounded-lg border border-gray-700 flex flex-col">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
          <Utensils className="text-pink-400" />
          <h2 className="text-xl font-semibold text-pink-400">REST: The Fixed Menu</h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          You order a specific "Combo Meal" (Endpoint). You get everything in that combo, 
          whether you want it or not. Want a salad? That's a different order.
        </p>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <button 
            onClick={handleRestOrder}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-mono shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>GET /combo/1</span>
          </button>

          <div className={`p-6 bg-gray-900 rounded-xl border border-dashed border-gray-600 min-h-[160px] w-full flex items-center justify-center transition-all duration-500 ${restServed ? 'opacity-100' : 'opacity-50'}`}>
            {restServed ? (
              <div className="flex gap-4 animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center text-yellow-500">
                  <Sandwich size={40} />
                  <span className="text-xs mt-1">Burger</span>
                </div>
                <div className="flex flex-col items-center text-yellow-300">
                  <Drumstick size={40} />
                  <span className="text-xs mt-1">Fries</span>
                </div>
                <div className="flex flex-col items-center text-blue-300">
                  <Coffee size={40} />
                  <span className="text-xs mt-1">Drink</span>
                </div>
              </div>
            ) : (
              <span className="text-gray-600 font-mono">Waiting for order...</span>
            )}
          </div>
          {restServed && (
            <p className="text-xs text-red-400">Warning: You received Fries even if you didn't want them.</p>
          )}
        </div>
      </div>

      {/* GRAPHQL SIDE */}
      <div className="bg-dev-sidebar p-6 rounded-lg border border-gray-700 flex flex-col">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
          <ShoppingBag className="text-purple-400" />
          <h2 className="text-xl font-semibold text-purple-400">GraphQL: The Buffet</h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          You specify exactly what you want. The server puts exactly that on your plate. 
          No waste, no extra trips.
        </p>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {Object.keys(gqlSelection).map((key) => (
              <button
                key={key}
                onClick={() => toggleGql(key as keyof typeof gqlSelection)}
                className={`p-3 rounded border flex items-center gap-2 transition-colors ${
                  gqlSelection[key as keyof typeof gqlSelection] 
                  ? 'bg-purple-900/30 border-purple-500 text-purple-200' 
                  : 'bg-gray-800 border-gray-600 text-gray-500'
                }`}
              >
                {gqlSelection[key as keyof typeof gqlSelection] ? <CheckSquare size={16} /> : <Square size={16} />}
                <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={handleGqlOrder}
            disabled={!Object.values(gqlSelection).some(Boolean)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded font-mono shadow-lg transition-transform active:scale-95"
          >
            QUERY
          </button>

          <div className={`p-6 bg-gray-900 rounded-xl border border-dashed border-gray-600 min-h-[160px] w-full flex items-center justify-center`}>
             {gqlServed ? (
              <div className="flex gap-4 animate-in fade-in zoom-in duration-300 flex-wrap justify-center">
                {gqlServed.length === 0 && <span className="text-gray-500">Empty Plate</span>}
                {gqlServed.includes('burger') && (
                   <div className="flex flex-col items-center text-yellow-500"><Sandwich size={40} /><span className="text-xs mt-1">Burger</span></div>
                )}
                {gqlServed.includes('fries') && (
                   <div className="flex flex-col items-center text-yellow-300"><Drumstick size={40} /><span className="text-xs mt-1">Fries</span></div>
                )}
                {gqlServed.includes('drink') && (
                   <div className="flex flex-col items-center text-blue-300"><Coffee size={40} /><span className="text-xs mt-1">Drink</span></div>
                )}
                {gqlServed.includes('salad') && (
                   <div className="flex flex-col items-center text-green-400"><Salad size={40} /><span className="text-xs mt-1">Salad</span></div>
                )}
              </div>
            ) : (
              <span className="text-gray-600 font-mono">Build your query...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPhilosophy;
