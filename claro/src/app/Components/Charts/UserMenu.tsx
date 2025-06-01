'use client';

import React, { useState, useRef, useEffect } from 'react';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-gray-700 hover:underline"
      >
        Minha Conta
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50">
          <button
            onClick={() => alert('Sair')}
            className="
              w-full
              px-4 py-2
              text-sm font-semibold
              text-white
              bg-red-600
              rounded-lg
              hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-red-500
              transition duration-150 ease-in-out
            "
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
