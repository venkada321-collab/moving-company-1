import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, Tag, X, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { GEO, LEGAL } from '../config';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Packing', 'Planning', 'Local', 'Long-Distance'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="py-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            {GEO.regionName} RELOCATION KNOWLEDGE HUB
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            {GEO.regionName} MOVING GUIDES & <span className="text-amber-400">EXPERT INSIGHTS</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Everything you need to know about high-rise elevator reservations, {LEGAL.coiAmountShort} COI requirements, winter road survival, and interprovincial transit.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 inline-flex items-center justify-center ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'bg-[#131927] text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#131927] border border-slate-800 hover:border-amber-400/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-xl group"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none motion-reduce:transform-none"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-amber-400/30">
                    {post.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-300 mb-2 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400" aria-hidden="true" /> {post.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400" aria-hidden="true" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 leading-snug font-['Outfit'] group-hover:text-amber-400 transition-colors motion-reduce:transition-none">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Author & Action */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-400"
                  />
                  <span className="text-[11px] font-bold text-slate-300">{post.author.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="min-h-[44px] px-2 text-amber-400 hover:text-amber-300 font-extrabold text-xs inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg transition-colors motion-reduce:transition-none"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Full View Modal */}
        {selectedPost && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
          >
            <div className="bg-[#131927] border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors motion-reduce:transition-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <span className="bg-amber-400/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                {selectedPost.category} Guide
              </span>

              <h2 id="blog-modal-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-300 border-y border-slate-800 py-3">
                <div className="flex items-center gap-2">
                  <img src={selectedPost.author.avatar} className="w-7 h-7 rounded-full object-cover" alt="" />
                  <span className="font-bold text-white">{selectedPost.author.name}</span> ({selectedPost.author.role})
                </div>
                <span>•</span>
                <span>{selectedPost.publishedDate}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="bg-amber-400 text-slate-950 min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs uppercase inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all motion-reduce:transition-none"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
