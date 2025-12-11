import React from 'react';

interface EchoCardProps {
  id: string;
  content: string;
  tag?: string;
}

export function EchoCard({ id, content, tag }: EchoCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500 transition-colors duration-300 shadow-sm">
      <p className="text-slate-100 text-lg mb-4 whitespace-pre-wrap leading-relaxed">{content}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500 font-mono">Echo #{id}</span>
        {tag && (
          <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}
