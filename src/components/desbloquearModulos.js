import { useEffect, useRef } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../database/database";

const toDateSafe = (val) => (val?.toDate ? val.toDate() : new Date(val));
const startOfLocalDay = (d) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
const addDaysLocal = (val, days) => {
  const d = toDateSafe(val);
  if (!d || isNaN(d)) return null;
  const base = startOfLocalDay(d);
  base.setDate(base.getDate() + days);
  return base; // 00:00 local do dia alvo
};

// Define quantos dias de intervalo são necessários entre cada módulo
const calcularIntervaloDias = (moduloIndex) => {
  // Módulos 1→2, 3→4, 5→6 => 7 dias
  // Módulos 2→3, 4→5 => 14 dias (pausa)
  if (moduloIndex === 1 || moduloIndex === 3 || moduloIndex === 5) return 7;
  if (moduloIndex === 2 || moduloIndex === 4) return 14;
  return 7; // Default para qualquer outro caso
};

const useDesbloquearModulos = (userData) => {
  const modulosRef = useRef(userData?.modulos);

  useEffect(() => {
    modulosRef.current = userData?.modulos;
  }, [userData]);

  useEffect(() => {
    if (!userData?.uid || !userData?.modulos) {
      console.log("Dados incompletos no hook: userId ou modulos ausentes");
      return;
    }

    const checkAndUpdate = async () => {
      const modulosAtual = modulosRef.current;
      if (!modulosAtual) {
        console.log("Nenhum módulo disponível para verificação");
        return;
      }

      const nomesModulos = Object.keys(modulosAtual).sort((a, b) => {
        const numA = parseInt(a.replace("modulo", ""), 10);
        const numB = parseInt(b.replace("modulo", ""), 10);
        return numA - numB;
      });

      console.log("Verificando desbloqueio de módulos na ordem:", nomesModulos);

      for (let i = 0; i < nomesModulos.length - 1; i++) {
        const nomeAtual = nomesModulos[i];
        const nomeSeguinte = nomesModulos[i + 1];
        const moduloAtual = modulosAtual[nomeAtual];
        const moduloSeguinte = modulosAtual[nomeSeguinte];

        if (!moduloAtual?.dataFim) {
          console.log(`Módulo ${nomeAtual} ainda não foi concluído`);
          continue;
        }

        if (moduloSeguinte?.status !== "bloqueado") {
          console.log(`Módulo ${nomeSeguinte} já está desbloqueado ou em progresso`);
          continue;
        }

          const moduloIndex = i + 1;
          const intervaloNecessario = calcularIntervaloDias(moduloIndex);

          const hoje = startOfLocalDay(new Date());
          const dataAlvo = addDaysLocal(moduloAtual.dataFim, intervaloNecessario);

          console.log(`Módulo ${nomeAtual} finalizado em ${moduloAtual?.dataFim}`);
          console.log(`Data alvo para desbloquear ${nomeSeguinte}: ${dataAlvo?.toString()}`);
          if (dataAlvo && hoje.getTime() >= dataAlvo.getTime()) {
            try {
              await updateDoc(doc(db, "alunos", userData.uid), {
                [`modulos.${nomeSeguinte}.status`]: "desbloqueado",
                [`modulos.${nomeSeguinte}.dataInicio`]: serverTimestamp(),
              });
              console.log(`Módulo ${nomeSeguinte} foi desbloqueado (dia de calendário).`);
              break; // 1 por verificação
            } catch (error) {
              console.error("Erro ao desbloquear módulo:", error);
            }
          } else if (dataAlvo) {
            const faltamDias = Math.ceil((dataAlvo - hoje) / (1000 * 60 * 60 * 24));
            console.log(`Ainda faltam ${faltamDias} dia(s) para desbloquear ${nomeSeguinte}`);
          }
        }
      }; 

          console.log("Executando verificação inicial de desbloqueio");
    checkAndUpdate();

    // Verificação periódica (a cada 10 minutos)
    const intervalId = setInterval(() => {
      console.log("Executa verificação periódica de desbloqueio");
      checkAndUpdate();
    }, 600000); // 10 minutos

    return () => {
      clearInterval(intervalId);
    };
  }, [userData]);
};

export default useDesbloquearModulos;
