import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { TypeTransaction } from '../graphql/types';

const TransactionForm: React.FC = () => {
  const [montant, setMontant] = useState('');
  const [type, setType] = useState(TypeTransaction.DEPOT);
  const [compteId, setCompteId] = useState('');

  const { data: comptesData } = useQuery(GET_ALL_COMPTES);

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: GET_ALL_TRANSACTIONS },
      { query: GET_ALL_COMPTES },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transactionRequest: {
            montant: parseFloat(montant),
            type,
            compteId,
          },
        },
      });
      setMontant('');
      setType(TypeTransaction.DEPOT);
      setCompteId('');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="p-6 card mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nouvelle Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Compte
            <select
              value={compteId}
              onChange={(e) => setCompteId(e.target.value)}
              className="input-field mt-1 bg-white"
              required
            >
              <option value="">Sélectionnez un compte</option>
              {comptesData?.allComptes.map((compte: any) => (
                <option key={compte.id} value={compte.id}>
                  Compte {compte.id} ({compte.type}) - Solde: {compte.solde.toFixed(2)}€
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type de Transaction
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TypeTransaction)}
              className="input-field mt-1 bg-white"
            >
              <option value={TypeTransaction.DEPOT}>Dépôt</option>
              <option value={TypeTransaction.RETRAIT}>Retrait</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Montant
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="input-field mt-1"
              required
              step="0.01"
              min="0"
              placeholder="Entrez le montant"
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn-primary w-full mt-4"
        >
          Effectuer la Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
