'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const handleSearch = (searchQuery: string, selectedCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 items-center mt-24 border-2 inset-shadow-2xs inset-shadow-zinc-800 border-zinc-800 p-3 w-full max-w-2xl mx-auto rounded-md bg-black">
      <div className="flex items-center w-full sm:w-auto flex-1 px-2">
        <input
          type="text"
          placeholder="Search Template"
          className="w-full sm:w-80 outline-0 bg-transparent text-white text-sm sm:text-base"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value, category);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query, category)}
        />
      </div>
      
      <div className="hidden sm:block h-6 w-[1px] bg-zinc-800 mx-2" />
      <div className="block sm:hidden w-full h-[1px] bg-zinc-800 my-1" />

      <div className="flex items-center justify-between w-full sm:w-auto gap-4 px-2">
        <select 
          className="bg-transparent outline-0 text-zinc-400 text-sm cursor-pointer appearance-none flex-1"
          value={category}
          onChange={(e) => {
            const val = e.target.value;
            setCategory(val);
            handleSearch(query, val);
          }}
        >
          <option value="" className="bg-zinc-950 text-white">All Category</option>
          <option value="dashboard" className="bg-zinc-950 text-white">Dashboard</option>
          <option value="blog" className="bg-zinc-950 text-white">Blog</option>
          <option value="landing-page" className="bg-zinc-950 text-white">Landing Page</option>
          <option value="portfolio" className="bg-zinc-950 text-white">Portfolio</option>
        </select>

        <button onClick={() => handleSearch(query, category)} className="shrink-0">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search cursor-pointer text-zinc-500 hover:text-white transition-colors">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}