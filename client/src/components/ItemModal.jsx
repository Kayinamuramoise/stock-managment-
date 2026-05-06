import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const COMBO_COLORS = [
    { id: 'indigo', name: 'Indigo Dream', classes: 'from-indigo-500 to-blue-500' },
    { id: 'emerald', name: 'Emerald Forest', classes: 'from-emerald-500 to-teal-500' },
    { id: 'rose', name: 'Rose Sunset', classes: 'from-rose-500 to-pink-500' },
    { id: 'amber', name: 'Amber Glow', classes: 'from-amber-500 to-orange-500' },
    { id: 'violet', name: 'Violet Night', classes: 'from-violet-500 to-purple-500' },
    { id: 'cyan', name: 'Ocean Breeze', classes: 'from-cyan-500 to-blue-500' },
];

const ItemModal = ({ isOpen, onClose, onItemSaved, itemToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: 0,
        minQuantity: 5,
        color: 'indigo',
    });

    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                name: itemToEdit.name,
                category: itemToEdit.category,
                quantity: itemToEdit.quantity,
                minQuantity: itemToEdit.minQuantity,
                color: itemToEdit.color || 'indigo',
            });
        } else {
            setFormData({
                name: '',
                category: '',
                quantity: 0,
                minQuantity: 5,
                color: 'indigo',
            });
        }
    }, [itemToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (itemToEdit) {
                await axios.put(`http://localhost:5000/api/inventory/${itemToEdit.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/inventory', formData);
            }
            onItemSaved();
            onClose();
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl">
                <div className={`bg-gradient-to-r ${COMBO_COLORS.find(c => c.id === formData.color)?.classes || 'from-indigo-500 to-blue-500'} px-6 py-4 flex justify-between items-center rounded-t-2xl transition-all duration-500`}>
                    <h3 className="text-xl font-bold text-white">{itemToEdit ? '✏️ Edit Item' : '➕ Add New Item'}</h3>
                    <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                        <X className="text-lg h-5 w-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-indigo-700 text-sm font-bold mb-2"> Item Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter item name"
                        />
                    </div>
                    <div>
                        <label className="block text-indigo-700 text-sm font-bold mb-2"> Category</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Enter category"
                        />
                    </div>
                    {!itemToEdit && (
                        <div>
                            <label className="block text-indigo-700 text-sm font-bold mb-2"> Initial Quantity</label>
                            <input
                                type="number"
                                min="0"
                                required
                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-indigo-700 text-sm font-bold mb-2">⚠️ Min Quantity (Low Stock Alert)</label>
                        <input
                            type="number"
                            min="0"
                            required
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                            value={formData.minQuantity}
                            onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                            placeholder="5"
                        />
                    </div>
                    <div>
                        <label className="block text-indigo-700 text-sm font-bold mb-3">🎨 Item Theme Color</label>
                        <div className="grid grid-cols-6 gap-2">
                            {COMBO_COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color: color.id })}
                                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color.classes} cursor-pointer transition-all transform hover:scale-110 shadow-sm ${formData.color === color.id ? 'ring-4 ring-indigo-200 scale-110 border-2 border-white' : 'opacity-70 hover:opacity-100'}`}
                                    title={color.name}
                                />
                            ))}
                        </div>
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
                            className={`flex-1 bg-gradient-to-r ${COMBO_COLORS.find(c => c.id === formData.color)?.classes || 'from-indigo-600 to-blue-600'} hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg`}
                        >
                            Save Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemModal;
