import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';
import { TypeCompte } from '../graphql/types';

const CreateCompte: React.FC = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState(TypeCompte.COURANT);

  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            type,
          },
        },
      });
      setSolde('');
      setType(TypeCompte.COURANT);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="p-6 card mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Créer un Compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Solde Initial
            <input
              type="number"
              value={solde}
              onChange={(e) => setSolde(e.target.value)}
              className="input-field mt-1"
              required
              step="0.01"
              min="0"
              placeholder="Entrez le solde initial"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type de Compte
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TypeCompte)}
              className="input-field mt-1 bg-white"
            >
              <option value={TypeCompte.COURANT}>Courant</option>
              <option value={TypeCompte.EPARGNE}>Épargne</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="btn-primary w-full mt-4"
        >
          Créer le Compte
        </button>
      </form>
    </div>
  );
};

export default CreateCompte;
