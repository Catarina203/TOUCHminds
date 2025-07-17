import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 

import LandingPage from './components/landing';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import Progresso from './components/progresso';
import Conquistas from './components/conquistas';
import Contactos from './components/contactos';
import Definições from './components/def';
import Homepage from './components/homepage';
import Modulos from './components/modulo';

import BandaDesenhada from './components/atividades/modulo1/bandaDesenhada';
import LinhaAnsiedade from './components/atividades/modulo1/linhaAnsiedade';
import AnsiedadeSemFiltros from './components/atividades/modulo1/ansiedadeSemFiltros';
import AtividadeResumo from './components/atividades/modulo1/atividadeResumo';
import UnindoExperiencias from './components/atividades/modulo1/unindoExperiencias';

import PodcastTouchminds from './components/atividades/modulo2/podcast';
import VerdadeOuMito from './components/atividades/modulo2/verdadeOuMito';
import AtividadeResumoModulo2 from './components/atividades/modulo2/atividadeResumo';

import VozCriticaVozCompassiva from './components/atividades/modulo3/vozes';
import MaiorInimigo from './components/atividades/modulo3/maiorInimigo';
import AbracarMe from './components/atividades/modulo3/abracar';
import AtividadeResumoCarta from './components/atividades/modulo3/atividadeResumo';

import FerramentaMudanca from './components/atividades/modulo4/ferramentaMudanca';
import BalancaVirtual from './components/atividades/modulo4/balancaVirtual';
import JaFosteCapaz from './components/atividades/modulo4/jaFosteCapaz';
import AtividadeResumoMudanca from './components/atividades/modulo4/atividadeResumo';

import AnsiedadeSOSPOD from './components/atividades/modulo5/podcast2';
import AtividadeResumoRede from './components/atividades/modulo5/atividadeResumo';
import EscolhaCerta from './components/atividades/modulo5/escolhaCerta';

import CodigoDoPsicologo from './components/atividades/modulo6/codigoPsicologo';
import ViagemBemEstar from './components/atividades/modulo6/viagemBemEstar';  
import NaoEstasSozinho from './components/atividades/modulo6/naoSozinho';
import AtividadeResumo6 from './components/atividades/modulo6/atividadeResumo';

import useDesbloquearModulos from './components/desbloquearModulos';


import { dadosAlunos } from './database/database';


export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Utiliza o hook para verificar e desbloquear módulos a cada 7 dias
  useDesbloquearModulos(userData);

  // Atualiza dados localmente e na Firestore
  const updateUserData = async (updatedData) => {
    if (!updatedData?.uid) {
      console.error("UID ausente em updateUserData");
      return;
    }

    setUserData(updatedData);

    try {
      const db = getFirestore();
      const userRef = doc(db, 'alunos', updatedData.uid); 
      await setDoc(userRef, updatedData, { merge: true }); 
      console.log('Dados atualizados na Firebase.');
    } catch (error) {
      console.error('Erro ao atualizar dados na Firebase:', error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          const data = await dadosAlunos(user.uid);
          setUserData({
            ...data,
            uid: user.uid,
          });
        } catch (error) {
          console.error('Erro ao carregar dados do user:', error.message);
          setUserData({ uid: user.uid });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/plataforma" element={<Homepage />} />
          <Route path="/progresso" element={<Progresso />} />
          <Route path="/conquistas" element={<Conquistas />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/definicoes" element={<Definições />} />

          {/* Página principal de cada módulo */}
          <Route path="/modulos/:id" element={<Modulos />} />

          {/* Atividades módulo 1*/}
          <Route path="/modulos/:id/atividade/banda-desenhada" element={<BandaDesenhada />} />
          <Route path="/modulos/:id/atividade/linha-ansiedade" element={<LinhaAnsiedade />} />
          <Route path="/modulos/:id/atividade/ansiedade-sem-filtros" element={<AnsiedadeSemFiltros />} />
          <Route path="/modulos/:id/atividade/unindo-experiencias" element={<UnindoExperiencias />} />
          <Route path="/modulos/:id/atividade/atividade-resumo" element={<AtividadeResumo />} />

          {/* Atividade módulo 2 */}
          <Route path="/modulos/:id/atividade/podcast" element={<PodcastTouchminds />} />
          <Route path="/modulos/:id/atividade/verdade-ou-mito" element={<VerdadeOuMito />} />
          {/* Alterar element para o correto */}
          <Route path="/modulos/:id/atividade/atividade-resumo2" element={<AtividadeResumoModulo2 />} />


          {/* Atividade módulo 3 */}
          <Route path="/modulos/:id/atividade/voz-critica-compassiva" element={<VozCriticaVozCompassiva />} />
          <Route path="/modulos/:id/atividade/nosso-maior-inimigo" element={<MaiorInimigo />} />
          <Route path="/modulos/:id/atividade/abracar-me-a-mim-mesmo" element={<AbracarMe />} />
          <Route path="/modulos/:id/atividade/atividade-resumo3" element={<AtividadeResumoCarta />} />


          {/* Atividade módulo 4 */}
          <Route path="/modulos/:id/atividade/ferramentas-mudanca" element={<FerramentaMudanca />} />
          <Route path="/modulos/:id/atividade/balanca-virtual" element={<BalancaVirtual />} />
          <Route path="/modulos/:id/atividade/ja-foste-capaz" element={<JaFosteCapaz />} />
          <Route path="/modulos/:id/atividade/atividade-resumo4" element={<AtividadeResumoMudanca />} />


          {/* Atividade módulo 5 */}
          <Route path="/modulos/:id/atividade/podcast2" element={<AnsiedadeSOSPOD/>} />
          <Route path="/modulos/:id/atividade/atividade-resumo5" element={<AtividadeResumoRede/>} />
          <Route path="/modulos/:id/atividade/escolha-certa" element={<EscolhaCerta/>} />

          {/* Atividade módulo 6 */}
          <Route path='/modulos/:id/atividade/codigo-psicologo' element={<CodigoDoPsicologo />} />
          <Route path="/modulos/:id/atividade/viagem-bemestar" element={<ViagemBemEstar/>} />
          <Route path="/modulos/:id/atividade/nao-estas-sozinho" element={<NaoEstasSozinho />} /> 
          <Route path="/modulos/:id/atividade/atividade-resumo6" element={<AtividadeResumo6 />} /> 

        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
