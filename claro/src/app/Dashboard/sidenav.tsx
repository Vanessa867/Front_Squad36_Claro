'use client';

import { useState } from "react";
import { FaHome, FaUser, FaCogs } from "react-icons/fa";

const SideNav = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <div className="bg-white text-gray-900 w-64 h-full p-4 shadow-md">
      <div className="text-xl font-bold mb-6">Ustore</div>

      <ul className="space-y-4">
        <li>
          <a
            href="#"
            onClick={() => setActive("Dashboard")}
            className={`flex items-center p-2 rounded-md ${
              active === "Dashboard" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setActive("ListarPedidos")}
            className={`flex items-center p-2 rounded-md ${
              active === "ListarPedidos" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <FaUser className="mr-3" />
            Listar Pedidos
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setActive("CadastrarUsuarios")}
            className={`flex items-center p-2 rounded-md ${
              active === "CadastrarUsuarios" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <FaCogs className="mr-3" />
            Cadastrar Usuários
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setActive("CadastrarProdutos")}
            className={`flex items-center p-2 rounded-md ${
              active === "CadastrarProdutos" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <FaUser className="mr-3" />
            Cadastrar Produtos
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setActive("ListarProdutos")}
            className={`flex items-center p-2 rounded-md ${
              active === "ListarProdutos" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <FaUser className="mr-3" />
            Listar Produtos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
