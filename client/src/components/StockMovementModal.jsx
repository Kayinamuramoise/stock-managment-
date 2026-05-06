import { useState } from 'react';
import axios from 'axios';
import { X, ArrowDown, ArrowUp } from 'lucide-react';

const StockMovementModal = ({ isOpen, onClose, item, onItemUpdated }) => {
    const [type, setType] = useState('IN');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`http://localhost:5000/api/inventory/${item.id}/movement`, {
                type,
                quantity: parseInt(quantity),
            });
            onItemUpdated();
            onClose();
        } catch (error) {
            console.error('Error processing movement:', error);
            alert(error.response?.data?.error || 'Failed to process stock movement');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl">
                <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white"> Manage Stock: {item.name}</h3>
                    <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                        <X className="text-lg h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            onClick={() => setType('IN')}
                            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md ${
                                type === 'IN' 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ArrowDown className="mr-2 h-5 w-5" /> Stock In
                        </button>
                        <button
                            onClick={() => setType('OUT')}
                            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md ${
                                type === 'OUT' 
                                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ArrowUp className="mr-2 h-5 w-5" /> Stock Out
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-indigo-700 text-sm font-bold mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg font-semibold"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <p className="text-sm text-gray-600 mt-3 bg-indigo-50 p-3 rounded-lg">
                                 Current Stock: <span className="font-bold text-indigo-700">{item.quantity}</span> units
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 text-white shadow-lg ${
                                    loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : type === 'IN' 
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
                                    : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700'
                                }`}
                            >
                                {loading ? 'Processing...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StockMovementModal;
