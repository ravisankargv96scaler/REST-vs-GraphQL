import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Trophy, ThumbsDown } from 'lucide-react';

interface ComparisonRow {
  category: string;
  rest: string;
  restWin: boolean;
  gql: string;
  gqlWin: boolean;
  desc: string;
}

const ROWS: ComparisonRow[] = [
  {
    category: "Endpoints",
    rest: "Multiple (/users, /posts)",
    restWin: false,
    gql: "Single (/graphql)",
    gqlWin: true,
    desc: "GraphQL simplifies API management by funneling everything through one door."
  },
  {
    category: "Data Fetching",
    rest: "Fixed (Over/Under fetching)",
    restWin: false,
    gql: "Flexible (Client defined)",
    gqlWin: true,
    desc: "GraphQL puts the client in the driver's seat for data requirements."
  },
  {
    category: "Caching",
    rest: "Standard HTTP Caching (Easy)",
    restWin: true,
    gql: "Client-side / Custom (Harder)",
    gqlWin: false,
    desc: "REST wins here because it uses URL-based caching natively in browsers/CDNs."
  },
  {
    category: "Versioning",
    rest: "v1, v2 (Path based)",
    restWin: false,
    gql: "Evolution (Deprecation)",
    gqlWin: true,
    desc: "GraphQL allows fields to be deprecated gracefully without breaking changes."
  },
  {
    category: "Error Handling",
    rest: "HTTP Status Codes (404, 500)",
    restWin: true,
    gql: "200 OK with 'errors' array",
    gqlWin: false,
    desc: "REST semantics align with the HTTP protocol, making monitoring easier."
  }
];

const TabComparison: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Technical Showdown
      </h3>
      
      <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-4 font-semibold w-1/4">Feature</th>
              <th className="p-4 font-semibold w-1/4 text-blue-400">REST</th>
              <th className="p-4 font-semibold w-1/4 text-purple-400">GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, idx) => (
              <tr 
                key={row.category}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={clsx(
                  "border-b border-gray-700 transition-colors duration-200 cursor-default",
                  hoveredRow === idx ? "bg-gray-800" : "bg-[#1e1e1e]",
                  hoveredRow !== null && hoveredRow !== idx && "opacity-50"
                )}
              >
                <td className="p-4 font-mono text-sm text-gray-400">
                  {row.category}
                  {hoveredRow === idx && (
                    <div className="text-xs text-gray-500 mt-1 font-sans">{row.desc}</div>
                  )}
                </td>
                
                <td className={clsx("p-4 relative", row.restWin ? "text-green-400" : "text-gray-400")}>
                  <div className="flex items-center gap-2">
                    {row.rest}
                    {hoveredRow === idx && row.restWin && <Trophy size={14} />}
                    {hoveredRow === idx && !row.restWin && <ThumbsDown size={14} className="text-red-900/50" />}
                  </div>
                </td>
                
                <td className={clsx("p-4 relative", row.gqlWin ? "text-green-400" : "text-gray-400")}>
                  <div className="flex items-center gap-2">
                    {row.gql}
                    {hoveredRow === idx && row.gqlWin && <Trophy size={14} />}
                    {hoveredRow === idx && !row.gqlWin && <ThumbsDown size={14} className="text-red-900/50" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        Hover over a row to see the winner and explanation.
      </div>
    </div>
  );
};

export default TabComparison;
