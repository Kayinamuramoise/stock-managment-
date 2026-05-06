import { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarDays, Calendar, Printer } from 'lucide-react';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState('ALL');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReport(activeTab);
    }, [activeTab]);

    const fetchReport = async (type) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/reports/${type}`);
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const filteredData = reportData.filter(transaction => {
        if (filterType !== 'ALL' && transaction.type !== filterType) return false;
        if (filterCategory !== 'ALL' && transaction.Item?.category !== filterCategory) return false;
        return true;
    });

    const uniqueCategories = ['ALL', ...new Set(reportData.map(t => t.Item?.category).filter(Boolean))];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-500 print:hidden">View daily and monthly stock movement summaries.</p>
                </div>
                <h2 className="hidden print:block text-xl font-bold text-gray-900">
                    {activeTab === 'daily' ? 'Daily Report' : 'Monthly Report'} - {new Date().toLocaleDateString()}
                </h2>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden print:shadow-none print:bg-transparent">
                <div className="border-b border-gray-200 print:hidden">
                    <nav className="-mb-px flex">
                        <button
                            onClick={() => setActiveTab('daily')}
                            className={`${
                                activeTab === 'daily'
                                    ? 'border-indigo-600 text-indigo-600 bg-white/50'
                                    : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-white/30'
                            } w-1/2 py-4 px-1 text-center border-b-3 font-bold text-sm flex justify-center items-center transition-all`}
                        >
                            <CalendarDays className="mr-2 h-4 w-4" /> Daily Report
                        </button>
                        <button
                            onClick={() => setActiveTab('monthly')}
                            className={`${
                                activeTab === 'monthly'
                                    ? 'border-indigo-600 text-indigo-600 bg-white/50'
                                    : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-white/30'
                            } w-1/2 py-4 px-1 text-center border-b-3 font-bold text-sm flex justify-center items-center transition-all`}
                        >
                            <Calendar className="mr-2 h-4 w-4" /> Monthly Report
                        </button>
                    </nav>
                </div>

                <div className="p-6 print:p-0">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select 
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="ALL">All Types</option>
                                    <option value="IN">In (Stock Additions)</option>
                                    <option value="OUT">Out (Stock Removals)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select 
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={handlePrint}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Printer className="mr-2 h-4 w-4" /> Print Report
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading data...</p>
                    ) : filteredData.length === 0 ? (
                        <p className="text-center text-gray-500">No transactions found for this period and filters.</p>
                    ) : (
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-indigo-100">
                                            <thead className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 print:bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-700 print:text-gray-900 uppercase tracking-widest">
                                                        📅 Date/Time
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-700 print:text-gray-900 uppercase tracking-widest">
                                                        📦 Item
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-700 print:text-gray-900 uppercase tracking-widest">
                                                        🔄 Type
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-700 print:text-gray-900 uppercase tracking-widest">
                                                        📊 Quantity
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-indigo-100 print:divide-gray-200">
                                                {filteredData.map((transaction) => (
                                                    <tr key={transaction.id} className="hover:bg-indigo-50/50 transition-colors print:hover:bg-transparent">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                                            {new Date(transaction.createdAt).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                            {transaction.Item?.name} <span className="text-gray-400 font-normal text-xs">({transaction.Item?.category})</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${
                                                                transaction.type === 'IN' 
                                                                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700' 
                                                                : 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700'
                                                            }`}>
                                                                {transaction.type === 'IN' ? '↓ In' : '↑ Out'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                                                            {transaction.quantity}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
