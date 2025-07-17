import React from "react";
import { AlertTriangle } from "lucide-react";

const AtividadesEmDesenvolvimento = () => {
  return (
    <div className="alert alert-warning d-flex align-items-start gap-3 p-4 rounded shadow-sm">
      <AlertTriangle size={24} className="text-warning mt-1" />
      <div>
        <h5 className="alert-heading mb-2">Atenção: Atividade em desenvolvimento</h5>
        <p className="mb-1">
          Esta atividade ainda está a ser construída e pode não estar completa ou funcional.
        </p>
        <p className="mb-0">
          Para continuar no módulo, clique em <strong>"Concluir atividade"</strong>.
        </p>
      </div>
    </div>
  );
};

export default AtividadesEmDesenvolvimento;
