import { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const AtividadeProgressao = ({ moduloId, atividadeIndex, updateUserData }) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const moduloKey = `modulo${moduloId}`;

    console.log("ID do módulo (numérico):", moduloId);
    console.log("Chave do módulo:", moduloKey);

    if (!userData) {
        alert("Erro: Dados do utilizador não disponíveis");
        console.error("Dados do utilizador não disponíveis:", userData);
        return null;
    }

    const concluirAtividade = () => {
        const moduloData = userData.modulos?.[moduloKey];
        if (!moduloData || !moduloData.atividades) {
            alert("Erro: Módulo ou atividades não encontradas.");
            console.error(`Módulo '${moduloKey}' não encontrado nos dados do utilizador.`);
            return;
        }

        const dadosAtualizados = {
            ...userData,
            modulos: {
                ...userData.modulos,
                [moduloKey]: {
                    ...moduloData,
                    atividades: [...moduloData.atividades],
                },
            },
        };

        dadosAtualizados.modulos[moduloKey].atividades[atividadeIndex] = {
            ...moduloData.atividades[atividadeIndex],
            concluido: true,
        };

        // Verifica se é a última atividade do módulo
        const UltimaAtividade = atividadeIndex === moduloData.atividades.length - 1;

        if (UltimaAtividade) {
            // Se for a última atividade, define a data de fim do módulo como a data atual
            dadosAtualizados.modulos[moduloKey].dataFim = new Date();
            // 
            dadosAtualizados.modulosConcluidos = moduloId;
            console.log("Módulo concluído em:", dadosAtualizados.modulos[moduloKey].dataFim);
        } else {
            // Se não for a última, desbloqueia a próxima atividade
            dadosAtualizados.modulos[moduloKey].atividades[atividadeIndex + 1] = {
                ...moduloData.atividades[atividadeIndex + 1],
                status: 'desbloqueado',
            };
        }

        updateUserData(dadosAtualizados);

        // Redireciona para a página do módulo com o número apenas
        navigate(`/modulos/${moduloId}`);
    };

    return (
        <button onClick={concluirAtividade} className="custom-btn-complete">
            Concluir Atividade
        </button>
    );
};

export default AtividadeProgressao;