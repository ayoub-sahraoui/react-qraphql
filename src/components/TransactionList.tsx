import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { Transaction } from '../graphql/types';

const TransactionList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p className="text-gray-600">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur: {error.message}</p>;

  return (
    <div className="p-6 card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Historique des Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Montant</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Compte</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.allTransactions.map((transaction: Transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-700">{transaction.id}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.type === 'DEPOT'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {transaction.montant.toFixed(2)}€
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(transaction.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Compte {transaction.compte.id} ({transaction.compte.type})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
