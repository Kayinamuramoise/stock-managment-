import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';
import ItemModal from '../components/ItemModal';
import StockMovementModal from '../components/StockMovementModal';

const COMBO_COLORS = {
    indigo: 'from-indigo-400 to-cyan-400',
    emerald: 'from-emerald-400 to-teal-400',
    rose: 'from-rose-400 to-pink-400',
    amber: 'from-amber-400 to-orange-400',
    violet: 'from-violet-400 to-purple-400',
    cyan: 'from-cyan-400 to-blue-400',
};

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        setCurrentItem(null);
        setIsItemModalOpen(true);
    };

    const handleEditItem = (item) => {
        setCurrentItem(item);
        setIsItemModalOpen(true);
    };

    const handleManageStock = (item) => {
        setCurrentItem(item);
        setIsStockModalOpen(true);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Inventory Management</h1>
                    <p className="text-gray-600 mt-2">Track and manage school supplies efficiently.</p>
                </div>
                <button
                    onClick={handleAddItem}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl flex items-center shadow-lg transition-all transform hover:scale-105 font-semibold"
                >
                    <Plus className="mr-2 h-5 w-5" /> Add New Item
                </button>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden shadow-lg rounded-2xl border border-blue-100 hover:shadow-xl transition-all">
                    <div className="px-6 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <dt className="text-sm font-semibold text-blue-600 truncate uppercase tracking-wide">Total Items</dt>
                                <dd className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{items.length}</dd>
                            </div>
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><span className="text-2xl">📦</span></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden shadow-lg rounded-2xl border border-rose-100 hover:shadow-xl transition-all">
                    <div className="px-6 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <dt className="text-sm font-semibold text-rose-600 truncate uppercase tracking-wide">Low Stock Alerts</dt>
                                <dd className="mt-2 text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    {items.filter(i => i.quantity <= i.minQuantity).length}
                                </dd>
                            </div>
                            <div className="h-12 w-12 bg-rose-600 rounded-lg flex items-center justify-center shadow-lg"><span className="text-2xl"></span></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden shadow-lg rounded-2xl border border-emerald-100 hover:shadow-xl transition-all">
                    <div className="px-6 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <dt className="text-sm font-semibold text-emerald-600 truncate uppercase tracking-wide">Total Quantity</dt>
                                <dd className="mt-2 text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    {items.reduce((acc, curr) => acc + curr.quantity, 0)}
                                </dd>
                            </div>
                            <div className="h-12 w-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg"><span className="text-2xl">📊</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-indigo-100">
                <div className="relative max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-indigo-400 text-lg h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder=" Search items by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Inventory List */}
            <div className="bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden sm:rounded-2xl border border-indigo-100">
                <ul className="divide-y divide-indigo-100">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-500">Loading inventory...</li>
                    ) : filteredItems.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No items found.</li>
                    ) : (
                        filteredItems.map((item) => (
                            <li key={item.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-200">
                                <div className="px-6 py-5 flex items-center justify-between">
                                    <div className="flex items-center cursor-pointer" onClick={() => handleEditItem(item)}>
                                         <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${COMBO_COLORS[item.color] || COMBO_COLORS.indigo} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                                             {item.name.charAt(0).toUpperCase()}
                                         </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-gray-900">{item.name}</div>
                                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.category}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full transition-all ${
                                            item.quantity <= item.minQuantity 
                                            ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md' 
                                            : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 shadow-md'
                                            }`}>
                                            {item.quantity} in stock
                                        </span>
                                        <button
                                            onClick={() => handleManageStock(item)}
                                            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <ItemModal
                isOpen={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
                onItemSaved={fetchItems}
                itemToEdit={currentItem}
            />

            <StockMovementModal
                isOpen={isStockModalOpen}
                onClose={() => setIsStockModalOpen(false)}
                item={currentItem}
                onItemUpdated={fetchItems}
            />
        </div>
    );
};

export default Inventory;
