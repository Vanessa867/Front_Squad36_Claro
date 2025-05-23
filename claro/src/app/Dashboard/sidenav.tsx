'use client';

import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaUserPlus,
  FaBoxOpen,
  FaPlusSquare,
  FaBars
} from "react-icons/fa";

const SideNav = () => {
  const [active, setActive] = useState<string>("home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white h-full shadow-md p-4 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      {/* Top Section */}
      <div className={`flex items-center ${collapsed ? "justify-center mb-6" : "justify-between mb-6"}`}>
        {!collapsed && (
          <span className="text-lg font-bold text-gray-800 transition-all duration-200">
            Ustore
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 p-2 hover:bg-gray-200 rounded transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-3 text-sm text-gray-700">
        <li>
          <a
            href="#"
            onClick={() => setActive("Dashboard")}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              active === "Dashboard"
                ? "bg-red-100 text-red-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <FaHome />
            {!collapsed && "Dashboard"}
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => setActive("ListarPedidos")}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              active === "ListarPedidos"
                ? "bg-red-100 text-red-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <FaClipboardList />
            {!collapsed && "Listar Pedidos"}
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => setActive("CadastrarUsuarios")}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              active === "CadastrarUsuarios"
                ? "bg-red-100 text-red-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <FaUserPlus />
            {!collapsed && "Cadastrar Usuários"}
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => setActive("CadastrarProdutos")}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              active === "CadastrarProdutos"
                ? "bg-red-100 text-red-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <FaPlusSquare />
            {!collapsed && "Cadastrar Produtos"}
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => setActive("ListarProdutos")}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              active === "ListarProdutos"
                ? "bg-red-100 text-red-600 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <FaBoxOpen />
            {!collapsed && "Listar Produtos"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;