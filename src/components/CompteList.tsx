import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";
import { Compte } from "../graphql/types";

const CompteList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p className="text-gray-600">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur: {error.message}</p>;

  return (
    <div className="p-6 card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Liste des Comptes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.allComptes.map((compte: Compte) => (
          <div key={compte.id} className="p-4 card">
            <h3 className="text-lg font-semibold text-gray-800">
              Compte {compte.id}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-gray-700">
                <span className="font-medium">Type:</span> {compte.type}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Solde:</span>{" "}
                {compte.solde.toFixed(2)}€
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date de création:</span>{" "}
                {new Date(compte.dateCreation).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;
