// Lote de novembro/dezembro 2026: 18 posts (5 mitos, 9 blog, 4 produto).
// Fonte unica de texto dos slides + legenda. Gerado/renderizado por build-lote.mjs.
// Ordem dentro de cada tipo = ordem de publicacao (o publicador pega o primeiro nao publicado do tipo do dia).
// Calendario previsto: Seg produto, Qua/Sex blog, Qui mitos (inicio 05/11/2026).
// Fontes: artigos de vitaegold.com.br/blog (blog) e alegacoes de knowledge/claims_autorizadas.json + paginas de produto (produto).

const AVISO_POLYVIT = 'Suplemento alimentar. Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem. Manter fora do alcance de crianças. Indicado para maiores de 19 anos. Não substitui uma alimentação equilibrada e hábitos de vida saudáveis.';
const AVISO_COLAGENO = 'Suplemento alimentar em cápsulas. Este produto não é um medicamento. Não substitui uma alimentação equilibrada. Não exceder a recomendação diária de consumo indicada na embalagem. Manter fora do alcance de crianças. Indicado para maiores de 19 anos. Gestantes, lactantes e pessoas com condições de saúde devem consultar um médico.';
const AVISO_FLORA = 'Suplemento alimentar líquido. Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem. Manter fora do alcance de crianças. Não deve ser consumido por gestantes, lactantes e crianças menores de 12 anos. Pessoas com homocistinúria, cirrose ou doenças cardiovasculares devem consultar um médico.';
const AVISO_Q10 = 'Suplemento alimentar em cápsulas. Fonte de coenzima Q10. Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem. Manter fora do alcance de crianças. Indicado para maiores de 19 anos. Gestantes, lactantes e pessoas que utilizam medicamentos devem consultar um profissional de saúde.';

const CTA_PRODUTO = 'Quer conhecer? Fale com a gente no WhatsApp (link na bio) ou ligue 0800 888 0032. Temos condições especiais em kits.';

export default [
  // ===================== MITOS (quintas) =====================
  {
    id: 'mitos-protecao-solar', type: 'mitos', title: 'Mitos proteção solar no verão',
    slides: [
      { img: 's1.jpg', pos: 'center 50%', tag: 'Mitos e Verdades',
        headline: 'Mitos e verdades sobre o sol no verão.',
        body: 'Protetor, chapéu, horário: o que vale de verdade pra curtir os dias de sol com cuidado? Vamos aos fatos.' },
      { img: 's2.jpg', pos: 'center 30%', badge: 'mito',
        headline: 'Protetor solar é só pra praia.',
        body: 'O sol bate na caminhada, no quintal e até pela janela do carro. No dia a dia, proteger rosto, pescoço e mãos também é cuidado.' },
      { img: 's3.jpg', pos: 'center 45%', badge: 'verdade',
        headline: 'O horário faz diferença.',
        body: 'Entre 10h e 16h o sol é mais forte. Prefira a sombra nesse período e deixe os passeios pro começo da manhã ou fim da tarde.' },
      { img: 's4.jpg', pos: 'center 55%', badge: 'mito',
        headline: 'Em dia nublado não precisa se proteger.',
        body: 'Parte da radiação atravessa as nuvens. Chapéu, óculos escuros e protetor continuam valendo com o céu cinzento.' },
      { img: 's5.jpg', pos: 'center 30%',
        headline: 'Sol com cuidado, verão com alegria.',
        body: 'Água por perto, roupa leve e sombra nos horários de pico. E mostre ao dermatologista qualquer mancha diferente na pele.' },
    ],
    caption: `O verão está chegando e, com ele, os dias de sol que a gente tanto gosta. Mas proteção solar ainda vem cercada de mitos. Bora esclarecer? ☀️

❌ MITO: protetor solar é só pra praia ou piscina.
O sol bate na caminhada, no quintal, na feira e até pela janela do carro. No dia a dia, proteger rosto, pescoço e mãos também faz parte do cuidado.

✅ VERDADE: o horário faz diferença.
Entre 10h e 16h o sol é mais forte. Nesse período, prefira a sombra e deixe os passeios pro começo da manhã ou pro fim da tarde.

❌ MITO: em dia nublado não precisa se proteger.
Parte da radiação atravessa as nuvens. Chapéu, óculos escuros e protetor continuam valendo mesmo com o céu cinzento.

E deixe a água sempre por perto: no calor, a sede nem sempre avisa a tempo. Qualquer mancha ou pinta diferente na pele merece uma visita ao dermatologista. 💛

Salve este post e compartilhe com quem vai curtir o verão com você.

#protecaosolar #verao #cuidadoscomapele #mitoseverdades #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #vidaativa #habitossaudaveis`,
  },
  {
    id: 'mitos-proteina', type: 'mitos', title: 'Mitos proteína depois dos 60',
    slides: [
      { img: 's1.jpg', pos: 'center 45%', tag: 'Mitos e Verdades',
        headline: 'Mitos e verdades sobre proteína depois dos 60.',
        body: 'Ovo, feijão, peixe, iogurte: de onde vem, quanto importa e quando comer? Vamos separar o fato do boato.' },
      { img: 's2.jpg', pos: 'center 30%', badge: 'mito',
        headline: 'Com a idade, o corpo precisa de menos proteína.',
        body: 'A proteína continua importante com o passar dos anos. Ela ajuda a manter os músculos e a força pras atividades do dia a dia.' },
      { img: 's3.jpg', pos: 'center 50%', badge: 'mito',
        headline: 'Proteína só vem da carne.',
        body: 'Ovos, feijão, lentilha, grão-de-bico, leite, iogurte e queijos também são boas fontes. Dá pra variar e combinar no prato.' },
      { img: 's4.jpg', pos: 'center 40%', badge: 'verdade',
        headline: 'Vale distribuir ao longo do dia.',
        body: 'Em vez de concentrar tudo no almoço, incluir uma fonte de proteína no café da manhã e no jantar costuma ser uma boa estratégia.' },
      { img: 's5.jpg', pos: 'center 40%',
        headline: 'Cada refeição com a sua proteína.',
        body: 'As quantidades ideais variam de pessoa pra pessoa. Converse com seu médico ou nutricionista e monte o prato com quem você ama.' },
    ],
    caption: `Feijão com arroz, ovo mexido, um peixinho no almoço de domingo. A proteína está em muitos pratos da nossa mesa, mas ainda vem cercada de dúvidas. Bora esclarecer? 💛

❌ MITO: com a idade, o corpo precisa de menos proteína.
A proteína continua importante com o passar dos anos. Ela ajuda a manter os músculos e a força pras atividades do dia a dia: levantar da cadeira, carregar as compras, brincar com os netos.

❌ MITO: proteína só vem da carne.
Ovos, feijão, lentilha, grão-de-bico, leite, iogurte e queijos também são boas fontes. Dá pra variar e combinar.

✅ VERDADE: vale distribuir ao longo do dia.
Em vez de concentrar tudo no almoço, incluir uma fonte de proteína também no café da manhã e no jantar costuma ser uma boa estratégia.

As quantidades ideais variam de pessoa pra pessoa. Na dúvida, converse com seu médico ou nutricionista. 🌿

Salve este post e compartilhe com a família.

#proteina #alimentacaosaudavel #mitoseverdades #saudeapos60 #bemestar #terceiraidade #qualidadedevida #nutricao #vitaegold #cuidese #vidaativa #habitossaudaveis`,
  },
  {
    id: 'mitos-saude-bucal', type: 'mitos', title: 'Mitos saúde bucal',
    slides: [
      { img: 's1.jpg', pos: 'center 55%', tag: 'Mitos e Verdades',
        headline: 'Mitos e verdades sobre a saúde da boca.',
        body: 'Dentes, gengiva, prótese: cuidar do sorriso é cuidar da saúde inteira. Vamos separar o que é fato do que é mito.' },
      { img: 's2.jpg', pos: 'center 35%', badge: 'mito',
        headline: 'Perder os dentes é normal da idade.',
        body: 'Com escovação, fio dental e visitas ao dentista, dá pra manter os dentes naturais por muitos anos. Idade não é sentença.' },
      { img: 's3.jpg', pos: 'center 40%', badge: 'mito',
        headline: 'Gengiva que sangra um pouco é normal.',
        body: 'Sangramento ao escovar é um sinal que merece atenção. Conte ao dentista na próxima consulta, sem esperar doer.' },
      { img: 's4.jpg', pos: 'center 40%', badge: 'verdade',
        headline: 'Quem usa prótese também precisa ir ao dentista.',
        body: 'A prótese pede limpeza diária e ajustes com o tempo. E a consulta cuida também da gengiva e da boca inteira.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Um sorriso bem cuidado à mesa da família.',
        body: 'Escova macia, fio dental e consulta em dia. Seu sorriso merece estar em cada foto com quem você ama.' },
    ],
    caption: `Sorrir na foto com os netos, saborear o almoço de domingo, conversar sem preocupação. Tudo isso passa pela saúde da boca. E nesse assunto também tem muito mito por aí. Bora esclarecer? 😁

❌ MITO: perder os dentes é normal da idade.
Com escovação, fio dental e visitas regulares ao dentista, dá pra manter os dentes naturais por muitos anos.

❌ MITO: gengiva que sangra um pouco é normal.
Sangramento ao escovar é um sinal que merece atenção. Conte ao dentista na próxima consulta, sem esperar doer.

✅ VERDADE: quem usa prótese também precisa ir ao dentista.
A prótese pede limpeza diária e ajustes com o tempo. E a consulta cuida também da gengiva e da boca inteira.

Escova de cerdas macias, fio dental todos os dias e consulta em dia: hábitos simples que fazem diferença. 💛

Salve este post e marque alguém que está devendo uma visita ao dentista.

#saudebucal #sorriso #dentista #mitoseverdades #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #autocuidado #habitossaudaveis`,
  },
  {
    id: 'mitos-aprender', type: 'mitos', title: 'Mitos aprender depois dos 60',
    slides: [
      { img: 's1.jpg', pos: 'center 40%', tag: 'Mitos e Verdades',
        headline: 'Mitos e verdades sobre aprender depois dos 60.',
        body: 'Celular novo, uma receita diferente, um instrumento, um idioma. Existe idade certa pra aprender? Vamos aos fatos.' },
      { img: 's2.jpg', pos: 'center 35%', badge: 'mito',
        headline: 'Depois de certa idade, o cérebro não aprende mais.',
        body: 'O cérebro segue criando novas conexões ao longo da vida quando é estimulado. Pode levar um pouco mais de tempo, e tudo bem.' },
      { img: 's3.jpg', pos: 'center 40%', badge: 'verdade',
        headline: 'Aprender algo novo estimula a mente.',
        body: 'Novidades tiram a cabeça do piloto automático. Um curso, um hobby, uma conversa diferente: tudo isso é exercício pra mente.' },
      { img: 's4.jpg', pos: 'center 35%', badge: 'mito',
        headline: 'Tecnologia não é pra mim.',
        body: 'Videochamada com os netos, fotos da família, mensagens: com paciência e alguém pra ensinar, todo mundo aprende.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Nunca é tarde pra começar.',
        body: 'Escolha algo que sempre teve vontade de aprender e dê o primeiro passo esta semana. Curiosidade não tem idade.' },
    ],
    caption: `"Já passei da idade pra isso." Quantas vezes essa frase impediu alguém de começar algo novo? A vida real mostra outra coisa. Bora esclarecer? 💛

❌ MITO: depois de certa idade, o cérebro não aprende mais.
O cérebro segue criando novas conexões ao longo da vida quando é estimulado. Pode levar um pouco mais de tempo, e tudo bem.

✅ VERDADE: aprender algo novo estimula a mente.
Novidades tiram a cabeça do piloto automático. Um curso, um hobby, uma leitura, uma conversa diferente.

❌ MITO: tecnologia não é pra mim.
Videochamada com os netos, fotos da família, mensagens no celular: com paciência e alguém pra ensinar, todo mundo aprende.

Pintura, violão, crochê, um idioma, aquele aplicativo que os netos usam. O que você sempre quis aprender? Conta pra gente nos comentários. 🌿

Salve este post e compartilhe com quem precisa desse empurrãozinho.

#aprendersempre #nuncaetarde #mitoseverdades #saudeapos60 #bemestar #terceiraidade #qualidadedevida #mentesaudavel #vitaegold #cuidese #vidaativa #envelhecerbem`,
  },
  {
    id: 'mitos-intestino', type: 'mitos', title: 'Mitos intestino',
    slides: [
      { img: 's1.jpg', pos: 'center 45%', tag: 'Mitos e Verdades',
        headline: 'Mitos e verdades sobre o intestino.',
        body: 'Fibras, água, movimento, rotina: o que realmente ajuda o intestino a funcionar bem no dia a dia? Vamos aos fatos.' },
      { img: 's2.jpg', pos: 'center 50%', badge: 'mito',
        headline: 'Intestino preso é normal com a idade.',
        body: 'Pode ser comum, mas não precisa ser aceito como normal. Mudanças que persistem merecem uma conversa com o médico.' },
      { img: 's3.jpg', pos: 'center 35%', badge: 'verdade',
        headline: 'Fibra e água trabalham juntas.',
        body: 'Ao aumentar frutas, verduras e grãos integrais no prato, aumente também a água ao longo do dia. Uma ajuda a outra.' },
      { img: 's4.jpg', pos: 'center 40%', badge: 'mito',
        headline: 'Movimento não tem nada a ver com o intestino.',
        body: 'Caminhar e se movimentar no dia a dia também ajuda o intestino a manter o seu ritmo.' },
      { img: 's5.jpg', pos: 'center 50%',
        headline: 'Rotina gentil, intestino em dia.',
        body: 'Prato colorido, água por perto, corpo em movimento e um horário tranquilo pro banheiro. Pequenos hábitos somam.' },
    ],
    caption: `Intestino é um daqueles assuntos que a gente comenta pouco, mas que faz toda a diferença no bem-estar do dia. E justamente por ser pouco falado, acumula muito mito. Bora esclarecer? 💛

❌ MITO: intestino preso é normal com a idade.
Pode ser comum, mas não precisa ser aceito como normal. Mudanças no funcionamento que persistem merecem uma conversa com o médico.

✅ VERDADE: fibra e água trabalham juntas.
Ao aumentar frutas, verduras, legumes e grãos integrais no prato, aumente também a água ao longo do dia. Uma ajuda a outra.

❌ MITO: movimento não tem nada a ver com o intestino.
Caminhar e se movimentar no dia a dia também ajuda o intestino a manter o seu ritmo.

E tem mais um aliado simples: a rotina. Reservar um horário tranquilo, sem pressa, ajuda o corpo a criar o hábito. 🌿

Salve este post e compartilhe com quem você cuida.

#intestino #saudeintestinal #fibras #mitoseverdades #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #alimentacaosaudavel #habitossaudaveis`,
  },

  // ===================== BLOG (quartas e sextas) =====================
  {
    id: 'blog-equilibrio', type: 'blog', title: 'Equilíbrio corporal',
    source: 'https://vitaegold.com.br/blog/equilibrio-corporal-por-que-treina-lo-importa-e-como-estimular-no-dia-a-dia/',
    slides: [
      { img: 's1.jpg', pos: 'center 35%',
        headline: 'Equilíbrio não é dom: é treino.',
        body: 'Não é algo com que a gente nasce pronto. É uma habilidade que o corpo aprende, aprimora e mantém com o uso.' },
      { img: 's2.jpg', pos: 'center 40%', pill: 'Como funciona',
        headline: 'Olhos, ouvido e corpo trabalhando juntos.',
        body: 'Os três conversam o tempo todo pra você caminhar, se abaixar e subir uma escada sem nem pensar no esforço.' },
      { img: 's3.jpg', pos: 'center 35%', pill: 'Por que cuidar',
        headline: 'Mais confiança em cada passo.',
        body: 'Quem se sente firme se movimenta mais. E quem se movimenta mais segue presente nos passeios, nas viagens, na vida.' },
      { img: 's4.jpg', pos: 'center 35%', pill: 'No dia a dia',
        headline: 'Escove os dentes em um pé só.',
        body: 'Alterne as pernas, sempre com a pia ao alcance da mão. Um momento que já existe no seu dia vira treino.' },
      { img: 's5.jpg', pos: 'center 45%',
        headline: 'Pequenos desafios, sempre com apoio por perto.',
        body: 'Levantar da cadeira sem as mãos, ficar num pé só enquanto o café passa. Sem pressa e sem comparação: no seu ritmo.' },
    ],
    caption: `Você tem equilíbrio ou não tem? Essa pergunta parte de uma ideia errada: equilíbrio não é dom, é uma habilidade que o corpo treina e mantém com o uso. 💛

Por trás de cada passo existe um trabalho em equipe: os olhos, o ouvido interno e a percepção que músculos e articulações têm do próprio corpo. Quando eles conversam bem, você caminha, se abaixa e sobe escadas com segurança.

Ideias simples pra estimular no dia a dia:
✅ Escovar os dentes apoiado em um pé só, alternando as pernas
✅ Levantar da cadeira sem usar as mãos, de vez em quando
✅ Caminhar no corredor colocando um pé quase à frente do outro
✅ Ficar em um pé só enquanto o café passa

Sempre com um apoio por perto: a pia, o balcão, o encosto da cadeira. A ideia é provocar o corpo com carinho, nunca colocá-lo em risco. Se notar uma insegurança que persiste, converse com seu médico.

Constância vale mais que perfeição. 🌿

Leia o artigo completo no blog (link na bio). Salve e comece hoje, na hora de escovar os dentes.

#equilibrio #vidaativa #bemestar #saudeapos60 #terceiraidade #qualidadedevida #movimento #autonomia #vitaegold #cuidese #habitossaudaveis #envelhecerbem`,
  },
  {
    id: 'blog-temperos', type: 'blog', title: 'Temperos naturais e menos sal',
    source: 'https://vitaegold.com.br/blog/temperos-e-ervas-naturais-um-jeito-simples-de-reduzir-o-sal-sem-perder-o-sabor/',
    slides: [
      { img: 's1.jpg', pos: 'center 45%',
        headline: 'Menos sal não precisa ser menos sabor.',
        body: 'Ervas, especiarias e um toque de limão deixam a comida tão gostosa que o saleiro quase não faz falta.' },
      { img: 's2.jpg', pos: 'center 30%', pill: 'O paladar se educa',
        headline: 'Seu paladar se acostuma com menos sal.',
        body: 'Reduzindo uma pitada por vez, em algumas semanas a comida muito salgada começa a parecer exagerada.' },
      { img: 's3.jpg', pos: 'center 50%', pill: 'Ervas que transformam',
        headline: 'Salsinha, alecrim, manjericão, orégano.',
        body: 'Cheiro-verde no arroz e no feijão, alecrim no frango, manjericão com tomate. Experimente sem medo.' },
      { img: 's4.jpg', pos: 'center 88%', pill: 'O truque da acidez',
        headline: 'Um fio de limão no final.',
        body: 'A acidez realça o sabor e engana o paladar, que sente mais tempero mesmo com menos sal. Vinagre também ajuda.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Prove antes de salgar.',
        body: 'Deixe os temperos naturais à vista e cuidado com caldos prontos, que concentram sódio. Uma refeição de cada vez.' },
    ],
    caption: `Comida com menos sal é comida sem graça? Que nada! Ervas, especiarias e um toque de limão deixam o prato tão saboroso que o saleiro quase não faz falta. 🌿

O sal realça o sabor, mas está longe de ser o único jeito de fazer isso. E tem uma boa notícia: o paladar se educa. Reduzindo aos poucos, em algumas semanas a comida muito salgada começa a parecer exagerada.

Algumas combinações pra experimentar:
✅ Cheiro-verde no arroz, no feijão e nos ovos
✅ Alecrim e tomilho no frango e nas batatas
✅ Manjericão com tomate e legumes assados
✅ Alho e cebola refogados como base de tudo
✅ Um fio de limão no final, que realça o sabor

E atenção aos caldos em cubo e temperos prontos: eles costumam concentrar bastante sódio.

O primeiro passo de hoje? Prove antes de salgar. Muita gente coloca sal por hábito, antes mesmo de experimentar. 💛

Leia o artigo completo no blog (link na bio). Salve e teste na próxima refeição.

#menossal #temperosnaturais #ervasfrescas #alimentacaosaudavel #saudeapos60 #bemestar #terceiraidade #qualidadedevida #cozinhacaseira #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-ar-livre', type: 'blog', title: 'Tempo ao ar livre',
    source: 'https://vitaegold.com.br/blog/tempo-ao-ar-livre-por-que-o-contato-com-a-natureza-faz-tao-bem/',
    slides: [
      { img: 's1.jpg', pos: 'center 40%',
        headline: 'A natureza está mais perto do que parece.',
        body: 'Não precisa de trilha nem de viagem. Um banco na praça, a varanda ou uma volta no quarteirão já fazem diferença.' },
      { img: 's2.jpg', pos: 'center 30%', pill: 'Luz da manhã',
        headline: 'O sol da manhã organiza o seu relógio.',
        body: 'A luz natural logo cedo ajuda o corpo a entender a hora de ter disposição e a hora de descansar.' },
      { img: 's3.jpg', pos: 'center 45%', pill: 'Descanso pra mente',
        headline: 'Paisagem verde acalma o olhar.',
        body: 'Árvores, céu e pássaros pedem uma atenção mais relaxada, bem diferente da tensão das telas.' },
      { img: 's4.jpg', pos: 'center 45%', pill: 'Frequência conta',
        headline: 'Pouco e todo dia vale mais.',
        body: 'Café da manhã na varanda, descer um ponto antes, uma ligação caminhando. Pequenos encontros diários somam.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Cinco minutos ao ar livre, sem tela.',
        body: 'Saia, respire com calma e repare em três coisas: um som, uma cor, uma sensação na pele. Amanhã, repita.' },
    ],
    caption: `Pra se reconectar com a natureza, não precisa de trilha, viagem nem mochilão. Um banco na praça, a varanda ou uma volta no quarteirão já fazem diferença. 🌳

O corpo e a mente costumam responder muito bem a doses simples e frequentes de ar livre:
☀️ A luz da manhã ajuda a organizar o relógio interno, que regula o sono e a disposição
🚶 Estar lá fora convida a caminhar mais
🍃 Árvores, céu e pássaros pedem uma atenção mais relaxada, diferente da tensão das telas
🌬️ Ambientes tranquilos convidam a respirar mais devagar

E o melhor: mais vale pouco e todo dia do que muito de vez em quando. Algumas ideias:
✅ Tomar o café da manhã perto de uma janela aberta ou na varanda
✅ Descer um ponto antes e caminhar o trecho final
✅ Fazer uma ligação andando ao ar livre
✅ Parar alguns minutos pra observar o céu

O menor passo de hoje: cinco minutos lá fora, sem tela. Repare em três coisas ao seu redor: um som, uma cor, uma sensação na pele. 💛

Leia o artigo completo no blog (link na bio). Salve e reserve seus cinco minutos de hoje.

#arlivre #natureza #bemestar #saudeapos60 #terceiraidade #qualidadedevida #vidaativa #caminhada #saudemental #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-ritual-noturno', type: 'blog', title: 'Ritual noturno para desacelerar',
    source: 'https://vitaegold.com.br/blog/ritual-noturno-para-desacelerar-como-preparar-o-corpo-e-a-mente-antes-de-deitar/',
    slides: [
      { img: 's1.jpg', pos: 'center 45%',
        headline: 'Dormir bem começa antes de deitar.',
        body: 'O corpo não desliga apertando um botão. Ele precisa de sinais suaves de que o dia está terminando.' },
      { img: 's2.jpg', pos: 'center 45%', pill: 'Luz mais baixa',
        headline: 'Diminua as luzes na última hora.',
        body: 'Troque a luz forte do teto por uma luminária mais suave. A luz é um dos recados mais fortes pro corpo.' },
      { img: 's3.jpg', pos: 'center 50%', pill: 'Telas com gentileza',
        headline: 'Celular longe da mão.',
        body: 'Deixe o aparelho carregando fora do alcance da cama. Não precisa ser radical: alguns minutos a menos já ajudam.' },
      { img: 's4.jpg', pos: 'center 45%', pill: 'Corpo e mente',
        headline: 'Banho morno, chá sem cafeína, papel e caneta.',
        body: 'Escolha um ou dois gestos que combinem com você. Anotar as preocupações tira o peso da cabeça antes de deitar.' },
      { img: 's5.jpg', pos: 'center 40%',
        headline: 'Um ritual seu, noite após noite.',
        body: 'Não existe fórmula perfeita. O que funciona é a repetição gentil de pequenos gestos que avisam: pode descansar.' },
    ],
    caption: `Dormir bem raramente começa na cama. Começa nos pequenos gestos da hora que antecede o deitar. 🌙

O corpo não sai do ritmo do dia pro sono profundo apertando um botão. Ele precisa de sinais suaves e repetidos de que o dia está terminando. É isso que um ritual noturno faz.

Alguns gestos pra montar o seu:
✅ Diminuir as luzes na última hora da noite
✅ Deixar o celular carregando longe da cama
✅ Um banho morno pra marcar a pausa entre o dia e a noite
✅ Um chá de ervas sem cafeína, pelo aconchego do ritual
✅ Anotar num papel o que precisa lembrar amanhã, pra não levar a preocupação pro travesseiro

Escolha um ou dois que combinem com você. Ritual demais vira lista de tarefas, e a ideia é justamente o contrário: aliviar.

Não existe fórmula perfeita, e uma noite fora do plano não estraga nada. O que constrói noites mais tranquilas é a repetição gentil. 💛

Leia o artigo completo no blog (link na bio). Salve e comece hoje, só baixando as luzes.

#ritualnoturno #dormirbem #sono #descanso #saudeapos60 #bemestar #terceiraidade #qualidadedevida #autocuidado #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-postura', type: 'blog', title: 'Postura no dia a dia',
    source: 'https://vitaegold.com.br/blog/postura-no-dia-a-dia-como-cuidar-da-coluna-em-pe-sentado-e-ao-carregar-peso/',
    slides: [
      { img: 's1.jpg', pos: 'center 40%',
        headline: 'A melhor postura é a próxima.',
        body: 'O corpo não foi feito pra ficar parado numa pose perfeita. Ele gosta de variar, se mexer e se ajustar ao longo do dia.' },
      { img: 's2.jpg', pos: 'center 35%', pill: 'Sentado',
        headline: 'Pés no chão, quadril no fundo da cadeira.',
        body: 'E traga o livro ou a tela até os olhos, em vez de esticar o pescoço. Levante-se de vez em quando.' },
      { img: 's3.jpg', pos: 'center 30%', pill: 'Em pé',
        headline: 'Peso nos dois pés, joelhos soltos.',
        body: 'Alterne o apoio de uma perna pra outra. A vontade de mudar de posição é um recado do corpo: escute.' },
      { img: 's4.jpg', pos: 'center 45%', pill: 'Carregando peso',
        headline: 'Dobre os joelhos e traga o peso perto do corpo.',
        body: 'As pernas são mais fortes que a lombar. Divida as sacolas dos dois lados e peça ajuda quando for pesado demais.' },
      { img: 's5.jpg', pos: 'center 40%',
        headline: 'Uma pausa a cada hora.',
        body: 'Levante, dê alguns passos, gire os ombros e respire fundo. Simples assim, e fácil de repetir todo dia.' },
    ],
    caption: `Ombros pra trás, coluna reta feito régua, o tempo inteiro? Não precisa. O corpo não foi feito pra ficar parado numa pose perfeita: ele gosta de variar e se mexer. 🧘

O desconforto costuma vir da repetição: muito tempo na mesma posição, sem pausa. E o mesmo princípio funciona ao contrário: pequenos ajustes ao longo do dia aliviam o esforço.

Sentado:
✅ Pés apoiados no chão e quadril no fundo da cadeira
✅ Traga o livro ou a tela até os olhos, em vez de esticar o pescoço

Em pé:
✅ Peso distribuído nos dois pés e joelhos soltos
✅ Alterne o apoio de uma perna pra outra

Carregando peso:
✅ Chegue perto do objeto, dobre os joelhos e use a força das pernas
✅ Mantenha o peso perto do corpo e divida as sacolas dos dois lados
✅ Pesado demais? Peça ajuda ou faça duas viagens, sem culpa

O menor passo de hoje: uma pausa a cada hora. Levante, dê alguns passos, gire os ombros e respire fundo. Se o desconforto persistir, converse com seu médico. 💛

Leia o artigo completo no blog (link na bio). Salve pra lembrar na próxima ida ao mercado.

#postura #coluna #bemestar #saudeapos60 #terceiraidade #qualidadedevida #vidaativa #movimento #autocuidado #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-refeicoes', type: 'blog', title: 'Refeições que saciam',
    source: 'https://vitaegold.com.br/blog/refeicoes-que-saciam-de-verdade-como-montar-pratos-que-sustentam-sua-energia/',
    slides: [
      { img: 's1.jpg', pos: 'center 40%',
        headline: 'Comer menos nem sempre sacia mais.',
        body: 'Prato leve demais costuma trazer fome logo depois. O segredo está em como você combina os alimentos.' },
      { img: 's2.jpg', pos: 'center 50%', pill: 'Proteína primeiro',
        headline: 'Comece pela proteína.',
        body: 'Ovo, feijão, peixe, frango ou iogurte. Ela ajuda o corpo a perceber que já é o suficiente.' },
      { img: 's3.jpg', pos: 'center 50%', pill: 'Cor e fibra',
        headline: 'Metade do prato colorida.',
        body: 'Verduras e legumes pedem mais mastigação e fazem a digestão acontecer com calma.' },
      { img: 's4.jpg', pos: 'center 50%', pill: 'Sem medo',
        headline: 'Carboidrato e gordura boa também entram.',
        body: 'Arroz, batata, mandioca, um fio de azeite, castanhas. Nada é proibido: a questão é como combinar.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Coma com calma.',
        body: 'A saciedade leva um tempinho pra chegar. Mastigue devagar e repare em como você se sente nas horas seguintes.' },
    ],
    caption: `Comeu pouco e uma hora depois já estava com fome de novo? Saciedade não é sobre comer menos: é sobre combinar melhor o que vai no prato. 🍽️

Refeições muito doces ou refinadas, sozinhas, viram energia rápido demais e logo vem a vontade de beliscar. Quando você combina diferentes tipos de alimento, a digestão acontece com mais calma e a disposição fica mais estável.

Os pilares de um prato que sustenta:
✅ Uma fonte de proteína: ovo, feijão, peixe, frango ou iogurte
✅ Verduras e legumes em bom volume, quanto mais colorido melhor
✅ Um carboidrato de qualidade: arroz, batata, mandioca, de preferência integral
✅ Um toque de gordura boa: azeite, castanhas, abacate

Nada é proibido. A questão é como combinar.

O menor passo de hoje: garanta uma proteína na próxima refeição, coma com calma e repare em como você se sente nas horas seguintes. Cada corpo é único, e ninguém conhece as suas pistas melhor do que você. 💛

Leia o artigo completo no blog (link na bio). Salve e monte seu próximo prato assim.

#alimentacaosaudavel #pratosaudavel #saciedade #comidadeverdade #saudeapos60 #bemestar #terceiraidade #qualidadedevida #nutricao #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-escrever', type: 'blog', title: 'Escrever para organizar a mente',
    source: 'https://vitaegold.com.br/blog/escrever-para-organizar-a-mente-como-anotar-pensamentos-ajuda-no-bem-estar/',
    slides: [
      { img: 's1.jpg', pos: 'center 40%',
        headline: 'Escrever ajuda a organizar a cabeça.',
        body: 'Não precisa de talento nem de caderno bonito. É só um jeito de tirar os pensamentos de dentro e olhar pra eles com calma.' },
      { img: 's2.jpg', pos: 'center 40%', pill: 'Por que funciona',
        headline: 'No papel, o pensamento ganha forma.',
        body: 'O que estava solto e confuso ganha começo, meio e fim. E às vezes o problema fica menor do que parecia.' },
      { img: 's3.jpg', pos: 'center 50%', pill: 'Do seu jeito',
        headline: 'Não existe forma certa.',
        body: 'Diário livre, lista de gratidão, lembretes do dia seguinte. À mão ou no celular, ninguém precisa ler além de você.' },
      { img: 's4.jpg', pos: 'center 45%', pill: 'Na rotina',
        headline: 'Junto do café ou antes de dormir.',
        body: 'Pendure o hábito em algo que você já faz e deixe o caderno à vista. O que fica no fundo da gaveta é esquecido.' },
      { img: 's5.jpg', pos: 'center 40%',
        headline: 'Hoje, uma frase só.',
        body: 'Antes de dormir, escreva uma frase sobre o seu dia. Estou cansado, deu tudo certo, a cabeça está a mil. Já vale.' },
    ],
    caption: `"Não sei escrever." "Não tenho o que dizer." Se você já pensou isso, temos uma boa notícia: anotar pensamentos não tem nada a ver com fazer bonito. É só um jeito de esvaziar um pouco a cabeça. ✍️

A mente é ótima pra gerar ideias, mas nem tanto pra guardá-las em ordem. Quando você escreve, aquilo que estava solto e confuso ganha forma. E muitas vezes o problema fica menor do que parecia.

Não existe forma certa. Algumas ideias:
✅ Diário livre, sem tema nem ordem
✅ Lista de gratidão com as coisas boas do dia
✅ Lembretes do que não quer esquecer amanhã
✅ Uma frase só, quando o tempo for curto

À mão ou no celular, ninguém precisa ler além de você. Pendure o hábito em algo que já faz parte do seu dia: o café da manhã ou a hora de dormir.

E lembre: escrever é um apoio de bem-estar. Não substitui a conversa com pessoas de confiança nem com um profissional quando algo pesa demais. 💛

Leia o artigo completo no blog (link na bio). Salve e escreva hoje uma frase só.

#escrita #diario #gratidao #bemestar #saudemental #saudeapos60 #terceiraidade #qualidadedevida #autocuidado #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-cafeina', type: 'blog', title: 'Cafeína e sono',
    source: 'https://vitaegold.com.br/blog/cafeina-e-sono-ate-que-horario-faz-sentido-evitar-o-cafe/',
    slides: [
      { img: 's1.jpg', pos: 'center 35%',
        headline: 'Café depois das 18h atrapalha o sono?',
        body: 'Depende de você. A relação entre cafeína e sono é bem mais pessoal do que um horário fixo no relógio.' },
      { img: 's2.jpg', pos: 'center 55%', pill: 'Como age',
        headline: 'A cafeína esconde o cansaço.',
        body: 'Ela ocupa o lugar da substância que dá sono ao longo do dia. Você não fica menos cansado: só deixa de perceber por um tempo.' },
      { img: 's3.jpg', pos: 'center 50%', pill: 'Atenção',
        headline: 'Não é só o café.',
        body: 'Chá preto, chá verde, chocolate e alguns refrigerantes também têm cafeína. Às vezes a soma do dia surpreende.' },
      { img: 's4.jpg', pos: 'center 40%', pill: 'Fique de olho',
        headline: 'Pegar no sono não é dormir bem.',
        body: 'Tem gente que adormece depois do café, mas tem um descanso mais leve durante a noite, sem perceber.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Adiante o último cafezinho.',
        body: 'Experimente tomar o café da tarde uma ou duas horas mais cedo e repare na sua noite. Sem abrir mão do prazer.' },
    ],
    caption: `Café depois das 18h tira o sono de todo mundo? Não necessariamente. A relação entre cafeína e sono é bem mais pessoal do que um horário fixo no relógio. ☕

Como funciona: ao longo do dia, o corpo acumula uma substância que dá aquela sensação natural de cansaço. A cafeína ocupa o lugar dela. Você não fica menos cansado: só deixa de perceber por algumas horas.

Alguns pontos que pouca gente sabe:
✅ Cada corpo elimina a cafeína num ritmo diferente
✅ Chá preto, chá verde, chocolate e alguns refrigerantes também têm cafeína
✅ Pegar no sono não é o mesmo que dormir bem: o descanso pode ficar mais leve sem a gente perceber
✅ Descafeinado tem bem pouca cafeína, mas raramente zero

A ideia não é abrir mão do cafezinho, que é um prazer de verdade. É descobrir o seu limite. 💛

O menor passo de hoje: tome o café da tarde uma ou duas horas mais cedo e repare em como foi a sua noite.

Leia o artigo completo no blog (link na bio). Salve e faça o teste esta semana.

#cafe #cafeina #dormirbem #sono #saudeapos60 #bemestar #terceiraidade #qualidadedevida #rotina #vitaegold #cuidese #habitossaudaveis`,
  },
  {
    id: 'blog-rotulos', type: 'blog', title: 'Como ler rótulos',
    source: 'https://vitaegold.com.br/blog/como-ler-rotulos-de-alimentos-um-guia-simples-para-a-hora-da-compra/',
    slides: [
      { img: 's1.jpg', pos: 'center 35%',
        headline: 'Vire a embalagem antes de pôr no carrinho.',
        body: 'Ler rótulo não é coisa de nutricionista. Com poucas dicas, a ida ao mercado fica mais tranquila e consciente.' },
      { img: 's2.jpg', pos: 'center 35%', pill: 'Ingredientes',
        headline: 'A ordem da lista conta uma história.',
        body: 'O primeiro ingrediente é o que tem em maior quantidade. Açúcar logo no começo? Ele está presente em boa proporção.' },
      { img: 's3.jpg', pos: 'center 35%', pill: 'Tabela nutricional',
        headline: 'Compare sempre por 100 gramas.',
        body: 'As porções mudam de marca pra marca. Por 100g, dá pra comparar dois produtos parecidos de forma justa.' },
      { img: 's4.jpg', pos: 'center 35%', pill: 'Frente do pacote',
        headline: 'Confie mais no verso do que na frente.',
        body: 'Natural, light, zero, integral: frases bonitas nem sempre contam tudo. A lista e a tabela contam o resto.' },
      { img: 's5.jpg', pos: 'center 35%',
        headline: 'Comece por um produto só.',
        body: 'Na próxima compra, leia os ingredientes de algo que você sempre leva. Sem julgamento: só o hábito de olhar.' },
    ],
    caption: `Ler rótulo não é coisa de nutricionista. Com poucas dicas, a ida ao mercado fica mais tranquila e consciente. 🛒

Comece pela lista de ingredientes:
✅ A ordem importa: o primeiro ingrediente é o que tem em maior quantidade
✅ O açúcar tem vários nomes: xarope de glicose, dextrose, maltodextrina
✅ Listas curtas, com nomes que você reconhece, costumam indicar produtos mais simples

Depois, a tabela nutricional:
✅ Olhe a porção de referência, que pode ser menor do que você costuma comer
✅ Pra comparar dois produtos parecidos, use os valores por 100 gramas
✅ Repare no sódio e no açúcar adicionado, e valorize fibras e proteínas

E desconfie das frases da frente do pacote. Natural, light, zero, integral: elas chamam a atenção, mas o verso é que conta a história completa.

O menor passo de hoje: na próxima compra, vire a embalagem de um produto que você sempre leva e leia os primeiros ingredientes. Sem julgamento, só o hábito de olhar. 💛

Leia o artigo completo no blog (link na bio). Salve pra consultar no mercado.

#rotulos #alimentacaosaudavel #mercado #comprasconscientes #saudeapos60 #bemestar #terceiraidade #qualidadedevida #nutricao #vitaegold #cuidese #habitossaudaveis`,
  },

  // ===================== PRODUTO (segundas) =====================
  {
    id: 'produto-polyvit', type: 'produto', title: 'PolyVit A-Z',
    product: {
      prodImage: 'produto.png',
      hero: { tag: 'Vitaminas e minerais', title: 'PolyVit A-Z', sub: 'Multivitamínico e multimineral completo' },
      slides: [
        { type: 'hero' },
        { type: 'photo', img: 'life2.jpg', pos: 'center 35%', pill: 'O que é',
          headline: 'De A a Z em uma cápsula por dia.',
          body: 'Vitaminas A, C, D, complexo B, zinco, selênio, cobre, cálcio e magnésio reunidos pra complementar a alimentação.' },
        { type: 'photo', img: 'life1.jpg', pos: 'center 40%', pill: 'Funções',
          headline: 'Cada nutriente com o seu papel.',
          body: 'Vitaminas A, C, D, zinco, selênio e cobre auxiliam no funcionamento do sistema imune. O complexo B, no metabolismo energético. Cálcio, vitamina D e magnésio, na formação e manutenção de ossos e dentes.' },
        { type: 'quote',
          quote: '"Gostei de ter vitaminas e minerais num produto só. Prático para o dia a dia."',
          from: 'Relato de quem usa o PolyVit A-Z' },
        { type: 'cta',
          headline: 'Vitaminas e minerais\nde A a Z, todo dia.',
          body: 'Fale com a gente no WhatsApp e conheça o PolyVit A-Z, com condições especiais em kits.',
          aviso: AVISO_POLYVIT },
      ],
    },
    caption: `Vitaminas e minerais de A a Z, reunidos em uma cápsula só. Prático pra quem quer complementar a alimentação sem complicar a rotina. 💛

O PolyVit A-Z combina vitaminas A, C, D, complexo B, zinco, selênio, cobre, cálcio e magnésio. Cada nutriente com o seu papel:
✅ As vitaminas A, C, D, o zinco, o selênio e o cobre auxiliam no funcionamento do sistema imune
✅ As vitaminas do complexo B auxiliam no metabolismo energético
✅ O cálcio, a vitamina D e o magnésio auxiliam na formação e manutenção de ossos e dentes

Como usar: uma cápsula por dia, conforme indicado na embalagem. Muita gente encaixa no café da manhã ou depois do almoço.

E lembre: suplemento complementa, não substitui. Prato colorido, água, movimento e boas noites de sono continuam sendo a base. 🌿

${CTA_PRODUTO}

${AVISO_POLYVIT}

#polyvit #multivitaminico #vitaminas #minerais #suplementos #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #rotinasaudavel`,
  },
  {
    id: 'produto-colageno-hidrolisado', type: 'produto', title: 'Colágeno Hidrolisado Premium',
    product: {
      prodImage: 'produto.png',
      hero: { tag: 'Cuidado de dentro pra fora', title: 'Colágeno Hidrolisado', sub: 'Premium, com vitamina C, zinco e vitamina E' },
      slides: [
        { type: 'hero' },
        { type: 'photo', img: 'life2.jpg', pos: 'center 30%', pill: 'O que é',
          headline: 'Colágeno com três aliados.',
          body: 'Peptídeos de colágeno hidrolisado com vitamina C, zinco e vitamina E, em cápsulas, pra complementar a alimentação no dia a dia.' },
        { type: 'photo', img: 'life1.jpg', pos: 'center 35%', pill: 'Funções',
          headline: 'Cada ativo com o seu papel.',
          body: 'O zinco auxilia na manutenção da pele e no funcionamento do sistema imune. A vitamina C auxilia na formação do colágeno do próprio corpo. As vitaminas C e E auxiliam na proteção contra os danos dos radicais livres.' },
        { type: 'quote',
          quote: '"Tomo com um copo de água de manhã. Não tem gosto, passa fácil."',
          from: 'Relato de quem usa o Colágeno Hidrolisado' },
        { type: 'cta',
          headline: 'Cuidar de você também\né um gesto de carinho.',
          body: 'Fale com a gente no WhatsApp e conheça o Colágeno Hidrolisado Premium, com condições especiais em kits.',
          aviso: AVISO_COLAGENO },
      ],
    },
    caption: `Cuidar da pele vai além do que a gente passa por fora: também começa no prato e nos hábitos do dia a dia. 💛

O Colágeno Hidrolisado Premium reúne peptídeos de colágeno com três aliados, em cápsulas práticas pra complementar a alimentação:
✅ O zinco auxilia na manutenção da pele e no funcionamento do sistema imune
✅ A vitamina C auxilia na formação do colágeno do próprio corpo
✅ As vitaminas C e E auxiliam na proteção contra os danos causados pelos radicais livres

Combine com o que a pele agradece: água ao longo do dia, prato colorido, proteção solar e uma boa noite de sono. 🌿

${CTA_PRODUTO}

${AVISO_COLAGENO}

#colageno #colagenohidrolisado #pele #autocuidado #suplementos #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #cuidadoscomapele`,
  },
  {
    id: 'produto-vitae-flora', type: 'produto', title: 'Vitae Flora',
    product: {
      prodImage: 'produto.png',
      hero: { tag: 'Complexo B líquido', title: 'Vitae Flora', sub: 'Vitaminas B1, B6 e colina' },
      slides: [
        { type: 'hero' },
        { type: 'photo', img: 'life1.jpg', pos: 'center 35%', pill: 'O que é',
          headline: 'Prático como um copinho.',
          body: 'Suplemento líquido com vitaminas B1, B6 e colina. Vem com copo dosador e é fácil de incluir na rotina da manhã.' },
        { type: 'photo', img: 'life2.jpg', pos: 'center 55%', pill: 'Funções',
          headline: 'O papel das vitaminas do complexo B.',
          body: 'A vitamina B1 auxilia no metabolismo energético e no funcionamento do sistema nervoso. A B6 auxilia no metabolismo energético e no metabolismo de proteínas.' },
        { type: 'quote',
          quote: '"Prático de usar, o formato líquido facilita bastante. Já faz parte da minha rotina matinal."',
          from: 'Relato de quem usa o Vitae Flora' },
        { type: 'cta',
          headline: 'Um gole de praticidade\nna sua manhã.',
          body: 'Fale com a gente no WhatsApp e conheça o Vitae Flora, com condições especiais em kits.',
          aviso: AVISO_FLORA },
      ],
    },
    caption: `Pra quem não gosta de engolir cápsula, uma boa notícia: o Vitae Flora é líquido e vem com copinho dosador. Simples assim. 💛

A fórmula combina vitaminas do complexo B e colina:
✅ A vitamina B1 auxilia no metabolismo energético e no funcionamento do sistema nervoso
✅ A vitamina B6 auxilia no metabolismo energético e no metabolismo de proteínas

Como usar: conforme a recomendação diária indicada na embalagem, com o copo dosador. Muita gente encaixa logo pela manhã, antes do café.

E lembre: suplemento complementa, não substitui. Alimentação variada, água e boas noites de sono continuam sendo a base. 🌿

${CTA_PRODUTO}

${AVISO_FLORA}

#vitaeflora #complexob #vitaminab1 #vitaminab6 #suplementos #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #rotinasaudavel`,
  },
  {
    id: 'produto-q10', type: 'produto', title: 'Coenzima Q10',
    product: {
      prodImage: 'produto.png',
      hero: { tag: 'Fonte de coenzima Q10', title: 'Coenzima Q10', sub: '60 cápsulas · ubiquinona' },
      slides: [
        { type: 'hero' },
        { type: 'photo', img: 'life2.jpg', pos: 'center 35%', pill: 'O que é',
          headline: 'Uma substância que o corpo já conhece.',
          body: 'A coenzima Q10 (ubiquinona) está naturalmente presente no organismo e em alguns alimentos.' },
        { type: 'photo', img: 'life1.jpg', pos: 'center 40%', pill: 'Como usar',
          headline: 'Uma cápsula por dia, junto a uma refeição.',
          body: 'Prática pra complementar a alimentação no dia a dia, sem complicação. Muita gente toma com o café da manhã.' },
        { type: 'quote',
          quote: '"Tomo diariamente junto com o café da manhã. Produto de boa qualidade, embalagem bem fechada."',
          from: 'Relato de quem usa a Coenzima Q10' },
        { type: 'cta',
          headline: 'Simples de incluir,\nfácil de manter.',
          body: 'Fale com a gente no WhatsApp e conheça a Coenzima Q10 da Vitae Gold, com condições especiais em kits.',
          aviso: AVISO_Q10 },
      ],
    },
    caption: `Você sabia que a coenzima Q10 é uma substância que o seu corpo já conhece? Ela está naturalmente presente no organismo e também em alguns alimentos. 💛

A Coenzima Q10 da Vitae Gold é um suplemento fonte de coenzima Q10 (ubiquinona), em cápsulas, pra complementar a alimentação no dia a dia.

Como usar:
✅ 1 cápsula ao dia
✅ De preferência junto a uma refeição
✅ Muita gente encaixa no café da manhã, junto com a rotina que já existe

Usa algum medicamento? Converse com um profissional de saúde antes de começar, combinado? 🌿

${CTA_PRODUTO}

${AVISO_Q10}

#coenzimaq10 #q10 #ubiquinona #suplementos #saudeapos60 #bemestar #terceiraidade #qualidadedevida #vitaegold #cuidese #rotinasaudavel #autocuidado`,
  },
];
