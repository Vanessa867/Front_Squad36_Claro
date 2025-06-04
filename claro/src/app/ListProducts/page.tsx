'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../Dashboard/sidenav';

interface CreatedBy {
    id: string;
    name: string;
    email: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    stock: number;
    category: string;
    price: number;
    imgUrl: string;
    createdAt: string;
    createdBy: CreatedBy;
}

export default function ListarProdutos() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);

    const limit = 7;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const fetchProducts = async (page: number) => {
        try {
            const res = await axios.get(`${apiUrl}/products?page=${page}&size=${limit}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setProducts(res.data);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    return (
        <div className="flex min-h-screen">

            <div><SideNav /></div>

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Listar Produtos</h1>
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Todos os Produtos</h1>

                {products.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Imagem</th>
                                    <th className="px-4 py-3 font-semibold">Produto</th>
                                    <th className="px-4 py-3 font-semibold">Descrição</th>
                                    <th className="px-4 py-3 font-semibold">Estoque</th>
                                    <th className="px-4 py-3 font-semibold">Preço</th>
                                    <th className="px-4 py-3 font-semibold">Categoria</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <img
                                                src={product.imgUrl}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(error) => {
                                                    error.currentTarget.onerror = null
                                                    error.currentTarget.src = "/sem-imagem.jpg"
                                                }}
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">{product.description}</td>
                                        <td className="px-4 py-3 text-gray-700">{product.stock}</td>
                                        <td className="px-4 py-3 text-gray-700">R$ {product.price.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-gray-700">{product.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Nenhum produto encontrado.</p>
                )}

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-800 rounded "
                    >
                        ⬅ Anterior
                    </button>
                    <span className="text-gray-900">Página {page + 1}</span>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-800 rounded"
                    >
                        Próxima ➡
                    </button>
                </div>
            </div>
        </div>
    );
}
