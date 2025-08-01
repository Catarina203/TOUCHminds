import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3zTp5CC9lIvNwt1XN1l69lMobSfOgMyg",
  authDomain: "touchminds.firebaseapp.com",
  projectId: "touchminds",
  storageBucket: "touchminds.firebasestorage.app",
  messagingSenderId: "836514843503",
  appId: "1:836514843503:web:d8f0bfc8ea8ac53514769a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function registerAluno(codigoParticipante, password) {
  try {
    if (!codigoParticipante) {
      throw new Error('Por favor, preencha o código de participante.');
    }
    
    if (password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres.');
    }
    
    // Verificar se o código de participante já existe
    const alunosRef = collection(db, "alunos");
    const q = query(alunosRef, where("codigoParticipante", "==", codigoParticipante));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('Este código de participante já está em uso.');
    }

    // Verificar se o código está presente na lista autorizada em "codigos"
    const docRef = doc(db, "codigos", "wLKyBPDvr1keyJ8q1sCE"); 
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Lista de códigos não encontrada.");
    }

    const codigosArray = docSnap.data().codigo; // Array de códigos autorizados
    if (!codigosArray.includes(codigoParticipante)) {
      throw new Error("Este código de participante não é válido.");
    }
    
    // Criar um user com email baseado no código do participante (para Firebase Auth)
    const email = `${codigoParticipante}@touchminds.virtual`;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const dataAtual = new Date();
    const formatoData = dataAtual.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    await setDoc(doc(db, "alunos", user.uid), {
      codigoParticipante,
      modulosConcluidos: 0,
      periodicidade: {
        // guarda a data do registo e quando faz login
        registo: `Registo realizado em ${formatoData}`,
        logins: [],
        logouts: [],
      },
      modulos: {
        // ter em conta o numero de atividades de cada modulo
        modulo1: { status: "desbloqueado", desafioSemanal: [], mensagemdefim: "naomostrada",
          atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false }
        ]},
        modulo2: { status: "bloqueado", desafioSemanal: [], mensagemdefim: "naomostrada", atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false }
        ]},
        modulo3: { status: "bloqueado", desafioSemanal: [], mensagemdefim: "naomostrada", atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false }
        ]},
        modulo4: { status: "bloqueado", desafioSemanal: [], mensagemdefim: "naomostrada", atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false }
        ]},
        modulo5: { status: "bloqueado", desafioSemanal: [], mensagemdefim: "naomostrada", atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
        ]},
        modulo6: { status: "bloqueado", desafioSemanal: [], mensagemdefim: "naomostrada", atividades: [
          { status: "desbloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false },
          { status: "bloqueado", concluido: false }
        ]},
      }
    });

    
    console.log("Aluno registrado com sucesso!");
    return user;
  } catch (error) {
    console.error("Erro no registro:", error.message);
    throw error;
  }
}

export async function loginAluno(codigoParticipante, password) {
  try {
    const email = `${codigoParticipante}@touchminds.virtual`;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, 'alunos', user.uid);
    const docSnap = await getDoc(userRef);

    const userData = docSnap.data();
    const dataAtual = new Date();
    const formatoData = dataAtual.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const logins = userData.periodicidade.logins || [];
    logins.push(`Login realizado em ${formatoData}`);

    await updateDoc(userRef, {
      "periodicidade.logins": logins
    });

    console.log("Login realizado com sucesso:", codigoParticipante);
    return user;
  } catch (error) {
    console.error("Erro no login:", error.message);
    throw error;
  }
}

export async function logoutAluno() {
  try {
    const userRef = doc(db, "alunos", auth.currentUser.uid);
          const docSnap = await getDoc(userRef);
          const userData = docSnap.data();
    
          const logouts = userData?.periodicidade?.logouts || [];
    
          const dataAtual = new Date();
          const formatoData = dataAtual.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
    
          logouts.push(`Logout realizado em ${formatoData}`);
    
          await updateDoc(userRef, {
            "periodicidade.logouts": logouts
          });

    await signOut(auth);
    console.log("Logout realizado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
}

// Tira os dados do aluno logado
export async function dadosAlunos(uid) {
  const userRef = doc(db, 'alunos', uid);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Aluno não encontrado");
  }
}

export {db};



{/*  Informações a guardar na base de dados:   

  Quantos módulos foram concluídos. 

  Tempo gasto para completar as atividades e os módulos. 

  Periodicidade da realização dos módulos (se foram feitos todos no mesmo dia ou distribuídos ao longo da semana). 

  O modulo tem de ficar bloqueado de inicio , quando o modulo é concluido , alterar o estado do modulo na base de dados para desbloqueado.


  Para cada aluno, guardar os seguintes dados:

  Nome , email, palavra passe, escola, código do participante, 
  utilizar autenticathion do firebase para login e registo.

*/}