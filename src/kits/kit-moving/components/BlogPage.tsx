import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, Tag, X, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../../../data/mockData';
import { BlogPost } from '../../../types';
import { GEO, LEGAL } from '../../../config';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Packing', 'Planning', 'Local', 'Long-Distance'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gradient-to-b from-white via-primary-50/20 to-white py-14 px-4 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-400 text-black text-xs font-bold uppercase tracking-widest mb-3">
            {GEO.regionName} RELOCATION KNOWLEDGE HUB
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-['Montserrat',sans-serif]">
            {GEO.regionName} MOVING GUIDES & <span className="text-primary-600">EXPERT INSIGHTS</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
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
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white inline-flex items-center justify-center ${
                selectedCategory === cat
                  ? 'bg-black text-primary-400 font-extrabold shadow-md shadow-black/20'
                  : 'bg-zinc-900/60 text-zinc-400 border border-neutral-300 hover:text-black hover:border-primary-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="flex flex-col gap-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary-500 before:to-neutral-300 w-full max-w-4xl mx-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900/60 border border-zinc-800/80 hover:border-primary-400 rounded-3xl overflow-hidden flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-lg shadow-primary-900/5 hover:shadow-2xl group text-white"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none motion-reduce:transform-none"
                  />
                  <span className="absolute top-3 left-3 bg-primary-100 text-primary-900 text-xs font-bold px-3 py-1 rounded-full uppercase border border-primary-300">
                    {post.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] opacity-75 mb-2 font-semibold">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary-500" aria-hidden="true" /> {post.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary-500" aria-hidden="true" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-black text-current mb-2 leading-snug font-['Montserrat',sans-serif] group-hover:text-primary-500 transition-colors motion-reduce:transition-none">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[inherit] opacity-85 leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Author & Action */}
              <div className="px-6 pb-6 pt-3 border-t border-neutral-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-zinc-800/40"
                  />
                  <span className="text-[11px] font-bold opacity-85">{post.author.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="btn-atomic-primary !py-2.5 !px-5 shadow-md inline-flex items-center gap-2 min-h-[44px] transition-all motion-reduce:transition-none"
                >
                  <span className="text-xs font-bold">Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Full View Modal */}
        {selectedPost && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
          >
            <div className="bg-zinc-900/60 text-white border border-primary-300 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-black hover:bg-primary-100 border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors motion-reduce:transition-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <span className="bg-primary-100 text-primary-900 text-xs font-bold px-3 py-1 rounded-full border border-primary-300 inline-block">
                {selectedPost.category} Guide
              </span>

              <h2 id="blog-modal-title" className="text-2xl sm:text-3xl font-black text-black font-['Montserrat',sans-serif]">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-neutral-500 border-y border-zinc-800 py-3">
                <div className="flex items-center gap-2">
                  <img src={selectedPost.author.avatar} className="w-7 h-7 rounded-full object-cover border border-zinc-800" alt="" />
                  <span className="font-bold text-black">{selectedPost.author.name}</span> ({selectedPost.author.role})
                </div>
                <span>•</span>
                <span>{selectedPost.publishedDate}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="bg-black text-primary-400 hover:bg-neutral-900 shadow-md min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-xs uppercase inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all motion-reduce:transition-none"
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
