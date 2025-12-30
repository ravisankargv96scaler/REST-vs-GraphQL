import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';
import { Play, RotateCw } from 'lucide-react';

const TabRestClient: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'DELETE'>('GET');
  const [url, setUrl] = useState<string>('/users/1');
  const [response, setResponse] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [localUsers, setLocalUsers] = useState<User[]>([...MOCK_USERS]);

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    setStatusCode(null);

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      
      // Basic Routing Logic
      if (url.startsWith('/users')) {
        const parts = url.split('/').filter(Boolean); // ['users', '1']
        const id = parts[1] ? parseInt(parts[1]) : null;

        if (method === 'GET') {
          if (id) {
            const user = localUsers.find(u => u.id === id);
            if (user) {
              setStatusCode(200);
              setResponse(user);
            } else {
              setStatusCode(404);
              setResponse({ error: "User not found" });
            }
          } else {
             // List all users
             setStatusCode(200);
             setResponse(localUsers.map(u => ({ id: u.id, name: u.name, url: `/users/${u.id}` })));
          }
        } 
        else if (method === 'POST') {
          if (id) {
            setStatusCode(405); // Method Not Allowed on specific ID for creation
            setResponse({ error: "Method not allowed. Post to /users to create."});
          } else {
            const newUser: User = {
              id: Math.floor(Math.random() * 1000) + 100,
              name: "New User",
              email: "new@demo.com",
              role: "Guest",
              posts: []
            };
            setLocalUsers([...localUsers, newUser]);
            setStatusCode(201);
            setResponse(newUser);
          }
        }
        else if (method === 'DELETE') {
           if (id) {
             const exists = localUsers.find(u => u.id === id);
             if (exists) {
               setLocalUsers(localUsers.filter(u => u.id !== id));
               setStatusCode(204);
               setResponse(null); // 204 No Content
             } else {
               setStatusCode(404);
               setResponse({ error: "User not found to delete" });
             }
           } else {
             setStatusCode(400);
             setResponse({ error: "Missing ID for delete" });
           }
        }
      } else {
        setStatusCode(404);
        setResponse({ error: "Endpoint not found" });
      }

    }, 600);
  };

  const getStatusColor = (code: number | null) => {
    if (!code) return 'text-gray-500';
    if (code >= 200 && code < 300) return 'text-green-400';
    if (code >= 400 && code < 500) return 'text-yellow-400';
    if (code >= 500) return 'text-red-400';
    return 'text-gray-500';
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-dev-sidebar p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
           REST Client Simulator
        </h3>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-2">
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-dev-keyword focus:outline-none focus:border-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="DELETE">DELETE</option>
          </select>
          
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-dev-string focus:outline-none focus:border-blue-500"
            placeholder="/users/1"
          />
          
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-colors min-w-[100px]"
          >
            {loading ? <RotateCw className="animate-spin" size={18} /> : <Play size={18} />}
            <span>Send</span>
          </button>
        </div>

        {/* Cheat Sheet */}
        <div className="mt-4 text-xs text-gray-500 flex gap-4">
          <span>Try: <code className="bg-gray-800 px-1 rounded">GET /users/1</code></span>
          <span>Try: <code className="bg-gray-800 px-1 rounded">GET /users/99</code></span>
          <span>Try: <code className="bg-gray-800 px-1 rounded">POST /users</code></span>
          <span>Try: <code className="bg-gray-800 px-1 rounded">DELETE /users/1</code></span>
        </div>
      </div>

      {/* Response Area */}
      <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-gray-400 text-sm">Response</span>
          <div className="flex gap-4 text-sm">
             <span>Status: <span className={`font-bold ${getStatusColor(statusCode)}`}>{statusCode || '---'}</span></span>
             <span>Time: <span className="text-dev-accent">{loading ? '...' : response ? '45ms' : '0ms'}</span></span>
          </div>
        </div>

        <div className="mt-10 overflow-auto h-full pb-10">
           {loading ? (
             <div className="flex items-center justify-center h-32 text-gray-500">Processing Request...</div>
           ) : response || statusCode === 204 ? (
              <pre className="text-sm">
                <code className="language-json">
                  {statusCode === 204 ? '// No Content' : JSON.stringify(response, null, 2)}
                </code>
              </pre>
           ) : (
             <div className="text-gray-600 italic mt-4">Make a request to see the response...</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TabRestClient;
