
// Colocar todo o texto necesário para os modulos aqui, incluindo a introdução e as atividades de cada módulo
// Para utilizar as imagens deste ficheiro temos de colocar em public/imgs/ e depois colocar o caminho como "../imgs/module1.jpg"

const modulos = [
    {
      id: "1",
      imagem: "../imgs/module1.jpg",
      titulo: "Módulo 1",
      subtitulo: "Ansiedade NÃO é bicho-papão!",
      atividades: [
        {
          url: "banda-desenhada",
          titulo: "Ansiedade: Aliada ou Empecilho?",
          tipo: "texto",
          descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
          imagem: "../imgs/act1mod1.jpg",
          quadros: [
            {
              imagem: "/imgs/modulo1/bd/bd_1.png",
            },
            {
              imagem: "/imgs/modulo1/bd/bd_2.png",
            },
            {
              imagem: "/imgs/modulo1/bd/bd_3.png",
            },
            {
              imagem: "/imgs/modulo1/bd/bd_4.png",
            },
            {
              imagem: "/imgs/modulo1/bd/bd_5.png",
            },
            {
              imagem: "/imgs/modulo1/bd/bd_6.png",
            }
          ],
        },
        {
          url: "linha-ansiedade",
          titulo: "Linha da Ansiedade",
          tipo: "popup",
          descricao: "Explora ansiedade normativa vs. patológica numa situação.",
          imagem: "../imgs/act2mod1.jpg"
        },
        {
          url: "unindo-experiencias",
          titulo: "Unindo Experiências",
          tipo: "video",
          descricao: "Vídeo com relatos reais sobre ansiedade.",
          imagem: "../imgs/act3mod1.jpg"
        },
        {
          url: "ansiedade-sem-filtros",
          titulo: "Ansiedade Sem Filtros",
          tipo: "imagem",
          descricao: "Imagens estilo Instagram sobre ansiedade na adolescência.",
          imagem: "../imgs/act4mod1.jpg"
        },
        {
          url: "atividade-resumo",
          titulo: "Atividade Resumo",
          tipo: "quiz",
          descricao: "Cenários interativos sobre lidar com ansiedade.",
          imagem: "../imgs/act5mod1.jpg"
        }
      ],
    },
    {
        id: "2",
        imagem: "../imgs/module2.jpg",
        titulo: "Módulo 2",
        subtitulo: "Desmitificar a Ansiedade ",
        atividades: [
          {
            url: "podcast",
            titulo: "Podcast: “Touchminds” ",
            tipo: "texto",
            descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
            imagem: "../imgs/act1mod2.png"
          },
          {
            url: "verdade-ou-mito",
            titulo: "Verdade Ou Mito? ",
            tipo: "popup",
            descricao: "Explora ansiedade normativa vs. patológica numa situação.",
            imagem: "../imgs/act2mod2.png"
          },
          {
            url: "atividade-resumo2",
            titulo: "Atividade Resumo",
            tipo: "video",
            descricao: "Vídeo com relatos reais sobre ansiedade.",
            imagem: "../imgs/act3mod2.png"
          },
        ],
    },
    {
        id: "3",
        imagem: "../imgs/module3.jpg",
        titulo: "Módulo 3",
        subtitulo: "Sê amigo de ti mesmo! ",
        atividades: [
          {
            url: "voz-critica-compassiva",
            titulo: "A Voz Crítica E A Voz Compassiva",
            tipo: "texto",
            descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
            imagem: "../imgs/act1mod3.png"
          },
          {
            url: "nosso-maior-inimigo",
            titulo: "O Nosso Maior Inimigo",
            tipo: "popup",
            descricao: "Explora ansiedade normativa vs. patológica numa situação.",
            imagem: "../imgs/act2mod3.png"
          },
          {
            url: "abracar-me-a-mim-mesmo",
            titulo: "Abraçar-Me A Mim Mesmo/a",
            tipo: "video",
            descricao: "Vídeo com relatos reais sobre ansiedade.",
            imagem: "../imgs/act3mod3.png"
          },
          {
            url: "atividade-resumo3",
            titulo: "Atividade Resumo",
            tipo: "imagem",
            descricao: "Imagens estilo Instagram sobre ansiedade na adolescência.",
            imagem: "../imgs/act4mod3.png"
          },
        ],
    },
    {
        id: "4",
        imagem: "../imgs/module4.jpg",
        titulo: "Módulo 4",
        subtitulo: "O Poder da Mudança!",
        atividades: [
          {
            url: "ferramentas-mudanca",
            titulo: "Ferramentas De Mudança",
            descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
            imagem: "../imgs/act1mod4.png"
          },
          {
            url: "balanca-virtual",
            titulo: "Balança Virtual",
            descricao: "Explora ansiedade normativa vs. patológica numa situação.",
            imagem: "../imgs/act2mod4.png"
          },
          {
            url: "ja-foste-capaz",
            titulo: "Já Foste Capaz!",
            descricao: "Vídeo com relatos reais sobre ansiedade.",
            imagem: "../imgs/act3mod4.png"
          },
          {
            url: "atividade-resumo4",
            titulo: "Atividade Resumo",
            descricao: "Imagens estilo Instagram sobre ansiedade na adolescência.",
            imagem: "../imgs/act4mod4.png"
          },
        ],
    }, 
    {
        id: "5",
        imagem: "../imgs/module5.jpg",
        titulo: "Módulo 5",
        subtitulo: "Reviravolta em Rede!",
        atividades: [
          {
            url: "podcast2",
            titulo: "Ansiedade SOS: Quando o Corpo Fala Mais Alto",
            descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
            imagem: "../imgs/act1mod5.png"
          },
          {
            url: "escolha-certa",
            titulo: "Escolha Certa",
            descricao: "Explora ansiedade normativa vs. patológica numa situação.",
            imagem: "../imgs/act2mod5.png"
          },
          {
            url: "atividade-resumo5",
            titulo: "Atividade Resumo",
            descricao: "Vídeo com relatos reais sobre ansiedade.",
            imagem: "../imgs/act3mod5.png"
          },
        ],
    }, 
    {
        id: "6",
        imagem: "../imgs/module6.jpg",
        titulo: "Módulo 6",
        subtitulo: "Um novo Começo!",
        atividades: [
          {
            url: "codigo-psicologo",
            titulo: "Código do Psicólogo",
            descricao: "Banda desenhada que explica ansiedade comum vs. SOS.",
            imagem: "../imgs/act1mod6.png"
          },
          {
            url: "viagem-bemestar",
            titulo: "Viagem ao Bem-Estar",
            descricao: "Explora ansiedade normativa vs. patológica numa situação.",
            imagem: "../imgs/act2mod6.png"
          },
          {
            url: "nao-estas-sozinho",
            titulo: "Não Estás Sozinho/a",
            descricao: "Vídeo com relatos reais sobre ansiedade.",
            imagem: "../imgs/act3mod6.png"
          },
          {
            url: "atividade-resumo6",
            titulo: "Atividade Resumo",
            descricao: "Imagens estilo Instagram sobre ansiedade na adolescência.",
            imagem: "../imgs/act4mod6.png"
          },
        ],
    },


  ];
  
  export default modulos;
  