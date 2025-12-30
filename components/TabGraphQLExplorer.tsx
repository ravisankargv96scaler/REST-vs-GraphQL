import React, { useState, useEffect } from 'react';
import { MOCK_USERS } from '../constants';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const TabGraphQLExplorer: React.FC = () => {
  // Configurable fields for the query
  const [fields, setFields] = useState({
    name: true,
    email: false,
    role: false,
    posts: true
  });

  const [result, setResult] = useState<any>(null);
  const [payloadSize, setPayloadSize] = useState(0);

  // Recalculate result whenever fields change
  useEffect(() => {
    const user = MOCK_USERS[0]; // Using Alice for demo
    
    // Build response object dynamically based on fields
    const dynamicResponse: any = {};
    
    if (fields.name) dynamicResponse.name = user.name;
    if (fields.email) dynamicResponse.email = user.email;
    if (fields.role) dynamicResponse.role = user.role;
    
    if (fields.posts) {
      dynamicResponse.posts = user.posts.map(p => ({ title: p.title }));
    }

    const wrappedResponse = { data: { user: dynamicResponse } };
    setResult(wrappedResponse);
    
    // Estimate size (rough char count of stringified JSON)
    setPayloadSize(JSON.stringify(wrappedResponse).length);
  }, [fields]);

  const toggleField = (field: keyof typeof fields) => {
    setFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-700 rounded-lg overflow-hidden h-full">
      
      {/* LEFT: Query Editor */}
      <div className="bg-[#1e1e1e] border-r border-gray-700 flex flex-col">
        <div className="bg-[#252526] px-4 py-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-purple-400">Query Editor</span>
          <span className="text-xs text-gray-500">graphiql.ts</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed flex-1 overflow-auto">
          <div className="text-dev-keyword">query <span className="text-dev-function">GetUser</span> {'{'}</div>
          <div className="pl-4 text-dev-function">user<span className="text-dev-text">(</span><span className="text-dev-string">id: 1</span><span className="text-dev-text">)</span> {'{'}</div>
          
          {/* Interactive Lines */}
          <div 
            onClick={() => toggleField('name')}
            className="pl-8 cursor-pointer hover:bg-gray-800 flex items-center group select-none"
          >
             <span className={`${fields.name ? 'text-dev-text' : 'text-gray-600 line-through'}`}>name</span>
             <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-gray-500 mr-2">Toggle</span>
          </div>

          <div 
            onClick={() => toggleField('email')}
            className="pl-8 cursor-pointer hover:bg-gray-800 flex items-center group select-none"
          >
             <span className={`${fields.email ? 'text-dev-text' : 'text-gray-600'}`}>email</span>
             {!fields.email && <span className="text-dev-comment ml-2"># Click to include</span>}
          </div>

          <div 
            onClick={() => toggleField('role')}
            className="pl-8 cursor-pointer hover:bg-gray-800 flex items-center group select-none"
          >
             <span className={`${fields.role ? 'text-dev-text' : 'text-gray-600'}`}>role</span>
             {!fields.role && <span className="text-dev-comment ml-2"># Click to include</span>}
          </div>

          <div className="pl-8">
            <span className={`${fields.posts ? 'text-dev-function' : 'text-gray-600'}`}>posts {'{'}</span>
            <div className="pl-4">
              <span className={`${fields.posts ? 'text-dev-text' : 'text-gray-600'}`}>title</span>
            </div>
            <span className={`${fields.posts ? 'text-dev-text' : 'text-gray-600'}`}>{'}'}</span>
            <button 
                onClick={() => toggleField('posts')}
                className="ml-2 text-xs bg-gray-700 px-1 rounded text-gray-300 hover:bg-gray-600"
            >
                {fields.posts ? 'Remove' : 'Add'}
            </button>
          </div>

          <div className="pl-4 text-dev-text">{'}'}</div>
          <div className="text-dev-text">{'}'}</div>
        </div>
        <div className="p-2 bg-[#2d2d2d] text-xs text-gray-400 border-t border-gray-700">
           Tip: Click lines to toggle fields
        </div>
      </div>

      {/* RIGHT: Response Viewer */}
      <div className="bg-[#1e1e1e] flex flex-col">
        <div className="bg-[#252526] px-4 py-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-green-400">JSON Response</span>
          <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-gray-300">
             Size: {payloadSize} bytes
          </span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed flex-1 overflow-auto text-gray-300">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      </div>

    </div>
  );
};

export default TabGraphQLExplorer;
