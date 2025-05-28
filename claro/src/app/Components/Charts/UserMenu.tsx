'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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
        className="text-sm text-gray-700 font-medium hover:underline"
      >
        João Silva
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <Link
            href="/perfil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Meu Perfil
          </Link>
          <Link
            href="/configuracoes"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Configurações
          </Link>
          <button
            onClick={() => alert('Sair')}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
