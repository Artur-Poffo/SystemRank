'use client'

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchFunc: (query: string) => void
}

export function SearchBar({ searchFunc }: SearchBarProps) {
    const [query, setQuery] = useState('')
    
    return (
        <div className="w-full flex items-center justify-center gap-5 bg-brand-gray-200 p-2 rounded-full" >
            <input
                type="text"
                placeholder="Pesquise por empresas ou sistemas"
                className="flex-1 bg-transparent text-brand-gray-600 outline-none placeholder:text-brand-gray-600 text-ellipsis"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="p-3 rounded-full bg-brand-blue-800" onClick={() => searchFunc(query)}>
                <FaSearch size={20} color={'#FFF'} />
            </button>
        </div>
    )
}