
export interface ProductVariant {
  /** value of the option, e.g. "Branco", "11L", "Preto / 110V" */
  label: string;
  price: number;
  originalPrice?: number;
  /** index in product.images to show when this variant is selected */
  imageIndex?: number;
}

export interface ProductOption {
  /** e.g. "Cor", "Tamanho", "Quantidade" */
  name: string;
  variants: ProductVariant[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
  options?: ProductOption[];
  /** ZuckPay product hash/ID — used as `hash` field when generating PIX */
  zuckHash?: string;
}

export const products: Product[] = [
  {
    id: "13",
    name: "Kit Caixa do Mês Bambu Mesa Posta com Potes",
    price: 169.90,
    originalPrice: 326.90,
    image: "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/c7b00c1b62819f76db58fc17890902d3.webp?v=1773580328",
    images: [
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/c7b00c1b62819f76db58fc17890902d3.webp?v=1773580328",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/b4b78d0097dd812f25562e56785d6025.webp?v=1773580187",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/e99675b7e0402b90e661870df615da9d.webp?v=1773580187",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/05bb8f9c7aa408a9939935dfcf7f3223.webp?v=1773580188",
    ],
    category: "Cozinha",
    rating: 4.9,
    reviews: 587,
    description: "## Elegância, organização e sofisticação para transformar sua mesa todos os dias\n\nSe você quer uma mesa bonita, organizada e com aparência de casa de revista, esse kit é simplesmente indispensável.\n\nO Kit Caixa do Mês Bambu reúne peças funcionais e sofisticadas que elevam sua cozinha instantaneamente — perfeito para o dia a dia ou para impressionar visitas.\n\n## ESCOLHA SUA VERSÃO\n• **Kit Completo (10 peças)** → Com garrafa térmica\n• **Kit Essencial (9 peças)** → Sem garrafa térmica\n\n## O QUE VOCÊ RECEBE:\n• 2 Potes Aurora – 400ml\n• 1 Pote Lady – 700ml\n• 1 Boleira giratória – 27 cm\n• 1 Porta frios (tampa acrílica + base de bambu) – 24 x 19 x 8 cm\n• 1 Manteigueira – 19,6 x 13,4 x 6,5 cm\n• 1 Bandeja redonda com pé – 30 x 30 x 6 cm\n• 2 Canecas 300ml com alça de bambu\n• 1 Garrafa térmica 1L (apenas na versão completa – cor pode variar)\n\n## POR QUE ESSE KIT É DIFERENTE?\n✓ Deixa sua mesa mais elegante e organizada\n✓ Material premium com acabamento sofisticado\n✓ Bambu natural com ação antibacteriana\n✓ Combina com qualquer estilo de cozinha\n✓ Ideal para servir, decorar ou presentear\n\n## SENSAÇÃO DE CASA ORGANIZADA (SEM ESFORÇO)\nCom um único kit, você transforma completamente o visual da sua cozinha — tudo mais bonito, harmonioso e pronto para receber.\n\n## PERFEITO PARA PRESENTE\nUm kit completo, útil e sofisticado — agrada qualquer pessoa.\n(Ótima opção para casa nova, casamento ou datas especiais)\n\n## CUIDADOS SIMPLES\n• Lavar com sabão neutro e esponja macia\n• Evitar produtos abrasivos\n• Hidratar o bambu a cada 60 dias com óleo mineral\n• Fácil de limpar e manter\n\n## PERSONALIZAÇÃO\nPrecisa alterar cor ou algum detalhe?\nFale com a gente pelo chat antes da compra.\n\n## GARANTIA\n30 dias contra defeitos de fabricação. Não cobre mau uso, quedas ou conservação inadequada.",
    features: ["Bambu natural premium", "Mesa posta sofisticada", "Ação antibacteriana", "Ideal para presente"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592219",
    options: [
      {
        name: "Opção",
        variants: [
          { label: "Personalizado Com Garrafa", price: 169.90, originalPrice: 326.90, imageIndex: 0 },
          { label: "Personalizado Sem Garrafa", price: 149.90, originalPrice: 241.90, imageIndex: 1 },
          { label: "Sem Personalizar Com Garrafa", price: 159.90, originalPrice: 313.90, imageIndex: 2 },
          { label: "Sem Personalizar Sem Garrafa", price: 139.90, originalPrice: 240.90, imageIndex: 3 },
        ],
      },
    ],
  },
  {
    id: "14",
    name: "Sapateira Organizadora Compacta",
    price: 127.80,
    originalPrice: 187.90,
    image: "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/Armario_de_Sapatos.jpg?v=1769911628",
    images: [
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/Armario_de_Sapatos.jpg?v=1769911628",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/Organiza_o_estilo_em_um_so_lugar.jpg?v=1769911628",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG3.png?v=1769911628",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG2.png?v=1769911628",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG1.png?v=1769911628",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 1730,
    description: "Armário Organizador de Sapatos\n\nMantenha seus calçados sempre organizados e seu ambiente muito mais funcional. Este armário organizador de sapatos é a solução ideal para quem busca praticidade, organização e um visual moderno em qualquer espaço da casa.\n\nCom um design clean e versátil, ele se adapta facilmente a quartos, closets, corredores ou halls de entrada, ajudando a otimizar o espaço e manter tudo sempre no lugar.\n\nDestaques do Produto:\n• Design moderno e minimalista, combina com diversos estilos de decoração\n• Excelente capacidade para armazenar vários pares de sapatos\n• Estrutura resistente e durável para uso diário\n• Fácil de montar e utilizar\n• Ideal para quartos, closets, corredores e entradas\n\nConteúdo da Embalagem: 1 Armário organizador de sapatos.\n\nPor que escolher este armário? Além de organizar seus calçados, ele contribui para um ambiente mais limpo, prático e visualmente agradável, facilitando sua rotina no dia a dia.",
    features: ["Design moderno", "Alta capacidade", "Estrutura resistente", "Fácil montagem"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592217",
    options: [
      {
        name: "Cor",
        variants: [
          { label: "Marrom", price: 127.80, originalPrice: 187.90, imageIndex: 0 },
          { label: "Branco", price: 127.80, originalPrice: 187.90, imageIndex: 2 },
        ],
      },
    ],
  },
  {
    id: "15",
    name: "Panela de Pressão de Pedra Sabão 11L + Brinde Especial",
    price: 129.90,
    originalPrice: 219.90,
    image: "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/WhatsApp-Image-2026-03-06-at-13.27.49.jpg?v=1773571400",
    images: [
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/WhatsApp-Image-2026-03-06-at-13.27.49.jpg?v=1773571400",
      "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/1764601913692db0398f578-921ae76ad1613b240217647699703426-1024-1024.webp?v=1773571466",
    ],
    category: "Cozinha",
    rating: 4.9,
    reviews: 1790,
    description: "Panela de Pressão de Pedra Sabão Natural - Comida Sempre Quentinha e Saudável\n\nNossa panela de pressão de pedra sabão é a escolha perfeita para quem busca uma alimentação saudável e quer manter os alimentos sempre quentinhos! Feita 100% com pedra sabão natural, sem metais pesados, essa panela preserva o sabor dos alimentos e libera minerais essenciais para o corpo.\n\nEspecificações:\n• Matéria Prima: Pedra Sabão (Esteatita)\n• Alças e contorno de cobre fixos na panela\n• Tampa de pedra sabão\n\nO que pode ser feito: feijão, carnes, sopas e caldos, legumes, arroz de carreteiro, risotos — use como uma panela de pressão convencional.\n\nBenefícios:\n• ZERO risco de explosão — 100% segura\n• Libera Ferro, Cálcio, Magnésio e Manganês durante o cozimento\n• Realça o sabor dos alimentos\n• Antiaderente natural (sem teflon ou produtos químicos)\n• Não libera toxinas — segurança total para a saúde\n\nCompatível com: fogões convencionais, cooktops, fogões a lenha, elétricos, fornos (exceto micro-ondas), banho-maria. Não funciona em fogão de indução.\n\nLimpeza simples com água, sabão ou detergente e esponja. Acompanha manual de cura impresso.",
    features: ["100% pedra sabão natural", "Antiaderente natural", "Sem toxinas", "Libera minerais essenciais"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592218",
    options: [
      {
        name: "Tamanho",
        variants: [
          { label: "4L", price: 129.90, originalPrice: 219.90, imageIndex: 0 },
          { label: "6L", price: 149.90, originalPrice: 249.90, imageIndex: 0 },
          { label: "8L", price: 179.90, originalPrice: 352.90, imageIndex: 1 },
          { label: "11L", price: 229.90, originalPrice: 376.90, imageIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "16",
    name: "Globo Terrestre Luminoso 34,5 cm",
    price: 87.90,
    originalPrice: 168.90,
    image: "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_172_Globo-Terrestre-Luminoso-345-CM-3.png?v=1776054334",
    images: [
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_172_Globo-Terrestre-Luminoso-345-CM-3.png?v=1776054334",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_119_Globo-Terrestre-Luminoso-345-CM-1.png?v=1776054334",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_109_Globo-Terrestre-Luminoso-345-CM-2.png?v=1776054335",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_152_Globo-Terrestre-Luminoso-345-CM-5.png?v=1776054334",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_160_Globo-Terrestre-Luminoso-345-CM-4.png?v=1776054334",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_180_Globo-Terrestre-Luminoso-345-CM-2.png?v=1776054335",
    ],
    category: "Decoração",
    rating: 4.8,
    reviews: 1310,
    description: "Globo Terrestre Luminoso: Explore o mundo com estilo e modernidade\n\nDecore sua casa com um toque de conhecimento e elegância. Este globo terrestre único e versátil é muito mais do que apenas um item decorativo. Com suas luzes internas em LED, ele transforma seu ambiente em um espaço inspirador e cheio de estilo.\n\nExplore as possibilidades:\n• Iluminação personalizada — diferentes tons de luz para criar a atmosfera perfeita\n• Design elegante, moderno e minimalista\n• Presente perfeito — original e educativo para crianças, adultos e apaixonados por geografia\n\nDestaques:\n• Globo terrestre decorativo com iluminação interna em LED\n• Estrutura em acrílico e aço com visual sofisticado\n• Disponível nas cores branco, prata e dourado\n• Bateria recarregável com cabo USB incluso\n• Ideal para salas, escritórios, quartos e home office\n\nEspecificações:\n• Material: Acrílico e aço\n• Idiomas do globo: Inglês e Chinês\n• Luzes: LED internas\n• Alimentação: Bateria recarregável por cabo USB (inclusa)\n• Dimensões: 34,5 cm × 27 cm × 25 cm\n• Observação: Não acompanha controle remoto\n\nGarantia: 30 dias direto da loja + 1 ano contra defeitos de fabricação.",
    features: ["LED interno recarregável", "Acrílico e aço", "USB incluso", "Decorativo e educativo"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592220",
  },
  {
    id: "17",
    name: "Guarda Roupa Dobrável Inteligente",
    price: 167.90,
    originalPrice: 245.00,
    image: "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/2f24740f4eb424754d2a69f19d76d152_1080x_600x_1024x_14eb6101-71d9-4db7-91cd-a8fb436b81ae.webp?v=1775877926",
    images: [
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/2f24740f4eb424754d2a69f19d76d152_1080x_600x_1024x_14eb6101-71d9-4db7-91cd-a8fb436b81ae.webp?v=1775877926",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/e1a6d621d936406ee758d0931d69023a_1080x_600x_1024x_13338283-1113-4e98-9611-c757e0ef3fe6.webp?v=1775877926",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/86297108f3c1990b9ad870fa9f050098_1080x_600x_1024x_3e8b0f99-fed3-48fc-9b4a-a04ad9cfb19f.webp?v=1775877925",
    ],
    category: "Quarto",
    rating: 4.7,
    reviews: 1712,
    description: "Armazene suas roupas de forma prática com esse lindo Closet Dobrável\n\nResolva o problema do guarda-roupa bagunçado com uma solução inteligente, prática e de fácil instalação.\n\nDestaques:\n• Colocação à prova de poeira, à prova de umidade e segurança\n• Bloqueia a poeira externa, evitando a queda de poeira e morfologia nas suas roupas\n• Etapas de instalação simples — monte sem ferramentas\n• Estrutura resistente e modular\n• Ideal para quartos, closets, corredores ou áreas de serviço\n\nUma alternativa moderna e funcional para organizar roupas, calçados e acessórios sem ocupar muito espaço.",
    features: ["Dobrável e modular", "À prova de poeira", "Fácil montagem", "Estrutura resistente"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592221",
  },
  {
    id: "34",
    name: "Cesto Gaveta Extra Inteligente Otimizador de Geladeira Sem Furos",
    price: 15.90,
    originalPrice: 59.90,
    image: "https://cdn.shopify.com/s/files/1/0676/5579/4790/files/Captura_de_tela_2025-12-31_093708.png?v=1776178911",
    images: [
      "https://cdn.shopify.com/s/files/1/0676/5579/4790/files/Captura_de_tela_2025-12-31_093708.png?v=1776178911",
      "https://cdn.shopify.com/s/files/1/0676/5579/4790/files/Captura_de_tela_2025-12-31_102847.png?v=1776178911",
      "https://cdn.shopify.com/s/files/1/0676/5579/4790/files/Gemini_Generated_Image_hrykithrykithryk.png?v=1776178911",
      "https://cdn.shopify.com/s/files/1/0676/5579/4790/files/branco.jpg?v=1776178911",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 642,
    description: "## Cesto Gaveta Extra Inteligente — Otimizador de Geladeira Sem Furos\n\nOrganize sua geladeira de uma vez por todas com cestos gaveta inteligentes que se encaixam sem precisar furar nada. Solução prática para aproveitar todo o espaço e manter os alimentos sempre visíveis e fáceis de pegar.\n\n## Benefícios\n\n• Aproveita o espaço ocioso entre as prateleiras\n• Instalação sem furos — apenas encaixe\n• Material resistente, fácil de lavar\n• Cesto gaveta deslizante para fácil acesso\n• Combina com qualquer modelo de geladeira\n\n**Cores disponíveis:** Rosa, Cinza e Branco\n\nIdeal para frutas, vegetais, latinhas, embalagens pequenas e tudo o que costuma se perder no fundo da geladeira.",
    features: ["Sem furos — encaixe inteligente", "Gaveta deslizante", "Material resistente", "Aumenta o espaço útil"],
    inStock: true,
    badge: "OFERTA",
    zuckHash: "592222",
    options: [
      {
        name: "Cor",
        variants: [
          { label: "Rosa", price: 15.90, originalPrice: 59.90, imageIndex: 0 },
          { label: "Cinza", price: 15.90, originalPrice: 59.90, imageIndex: 1 },
          { label: "Branco", price: 15.90, originalPrice: 59.90, imageIndex: 3 },
        ],
      },
    ],
  },
  {
    id: "18",
    name: "Máquina Elétrica TurboCorte 7 em 1",
    price: 169.90,
    originalPrice: 289.90,
    image: "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.30.14.jpg?v=1774586694",
    images: [
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.30.14.jpg?v=1774586694",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.54.04.jpg?v=1774586694",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.58.07.jpg?v=1774586694",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_19.12.18.jpg?v=1774586694",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.29.48.jpg?v=1774586694",
      "https://cdn.shopify.com/s/files/1/0812/0782/0545/files/m_13.jpg?v=1774586694",
    ],
    category: "Cozinha",
    rating: 4.9,
    reviews: 980,
    description: "Máquina Elétrica 7 em 1 — Mais produtividade para quem cozinha\n\nCorte em Quadrados: corte com rapidez e precisão, perfeitos para saladas, vinagretes, maioneses, sopas e marmitas.\n\nEconomize Tempo na Cozinha: o que você levaria 15 minutos cortando na faca, faz em segundos.\n\nSistema 7 em 1: além do corte em cubos, você pode preparar fatias, tiras, ralados e diferentes tipos de corte com praticidade e precisão.\n\nForça suficiente para cortar legumes firmes sem esforço — cozinhar fica mais rápido e menos cansativo. Padronização que valoriza suas receitas. Um único equipamento substitui vários utensílios.\n\nCaracterísticas do Produto:\n• Modelo MR-1488\n• Sistema 7 em 1\n• Lâminas em aço inox\n• Motor 100% cobre\n• 400W de potência\n• Estrutura reforçada\n• 12 meses de garantia\n\nPor que você vai amar:\n• Corta em quadrados de verdade\n• Padroniza seus alimentos\n• Economiza tempo diariamente\n• Facilita o preparo de receitas\n• Resultado mais bonito e profissional",
    features: ["Sistema 7 em 1", "Lâminas em aço inox", "Motor 100% cobre 400W", "12 meses de garantia"],
    inStock: true,
    badge: "OFERTA",
    options: [
      {
        name: "Cor",
        variants: [
          { label: "Preto", price: 169.90, originalPrice: 289.90, imageIndex: 0 },
          { label: "Branco", price: 169.90, originalPrice: 289.90, imageIndex: 1 },
        ],
      },
      {
        name: "Voltagem",
        variants: [
          { label: "110V", price: 169.90, originalPrice: 289.90 },
          { label: "220V", price: 169.90, originalPrice: 289.90 },
        ],
      },
    ],
  },
  // ============ COZINHA ============
  {
    id: "20",
    name: "Tábua de Corte em Bambu 54x46cm",
    price: 119.90,
    originalPrice: 189.90,
    image: "/products/tabua-bambu-54x46.jpg",
    images: [
      "/products/tabua-bambu-54x46.jpg",
    ],
    category: "Cozinha",
    rating: 4.9,
    reviews: 856,
    description: "## Tábua de Corte em Bambu 54x46cm Delinia\n\nTábua de corte premium em bambu natural com dimensões generosas de **54 cm de comprimento por 46 cm de largura**. Ideal para o preparo de carnes, frutas, legumes e queijos, e perfeita também para servir tábuas de frios e petiscos com elegância.\n\n## Destaques\n\n✓ **Bambu maciço** de alta densidade — resistente a cortes e impactos\n✓ **Sulcos coletores** ao redor para reter sucos e líquidos sem espalhar\n✓ **Antibacteriano natural** — o bambu inibe a proliferação de bactérias\n✓ **Não absorve odores** nem mancha facilmente\n✓ **Sustentável e renovável** — bambu cresce muito mais rápido que madeiras tradicionais\n✓ **Acabamento liso** que respeita o fio das facas\n\n## Especificações técnicas\n\n• **Material:** bambu natural maciço\n• **Dimensões:** 54 x 46 x 1,8 cm\n• **Cor:** tom natural amadeirado claro\n• **Peso:** aproximadamente 2,1 kg\n• **Sulco coletor de líquidos:** sim, em todo o perímetro\n\n## Cuidados de conservação\n\n• Lave à mão com água morna e detergente neutro logo após o uso\n• Seque imediatamente em pé para evitar empenamento\n• Aplique óleo mineral de cozinha mensalmente para preservar o bambu\n• Não usar em lava-louças nem deixar de molho\n\nFunde funcionalidade e design para transformar sua cozinha.",
    features: ["Bambu maciço premium", "54x46cm extra grande", "Sulco coletor de líquidos", "Antibacteriano natural", "Sustentável"],
    inStock: true,
    badge: "OFERTA",
  },
  {
    id: "21",
    name: "Jogo de Panelas Tramontina Turim Antiaderente 5 Peças",
    price: 169.90,
    originalPrice: 549.90,
    image: "/products/tramontina-turim-5pcs.jpg",
    images: [
      "/products/tramontina-turim-5pcs.jpg",
    ],
    category: "Cozinha",
    rating: 4.9,
    reviews: 1420,
    description: "## Jogo de Panelas Tramontina Turim 5 Peças — Antiaderente Starflon\n\nA linha **Turim** da Tramontina é símbolo de praticidade e durabilidade na cozinha brasileira. Fabricadas em alumínio resistente com revestimento interno antiaderente **Starflon T1**, essas panelas garantem cozimento uniforme, fácil limpeza e visual moderno por muito mais tempo.\n\n## Composição do jogo (5 peças)\n\n• **1 Caçarola 20 cm** com tampa de vidro temperado\n• **1 Caçarola 24 cm** com tampa de vidro temperado\n• **1 Frigideira 20 cm**\n• **1 Frigideira 24 cm**\n• **1 Panela funda 16 cm** com tampa de vidro\n\n## Destaques\n\n✓ **Revestimento Starflon T1** — antiaderente reforçado, alimentos não grudam\n✓ **Alumínio reforçado** — distribuição uniforme de calor, sem pontos quentes\n✓ **Cabos em baquelite** termorresistentes e ergonômicos\n✓ **Tampas de vidro temperado** com saída de vapor\n✓ **Compatível com fogões a gás, elétrico e vitrocerâmico**\n✓ **Fácil limpeza** — basta água, detergente neutro e esponja macia\n\n## Especificações\n\n• **Marca:** Tramontina\n• **Linha:** Turim\n• **Cor:** Grafite\n• **Material do corpo:** alumínio\n• **Revestimento:** antiaderente Starflon T1 (interno)\n• **Garantia:** 1 ano contra defeitos de fabricação\n\nUm clássico que combina qualidade Tramontina com design contemporâneo para o seu dia a dia.",
    features: ["5 peças completas", "Antiaderente Starflon T1", "Cabo termorresistente", "Tampa de vidro", "Multifogão"],
    inStock: true,
    badge: "MAIS VENDIDO",
  },
  {
    id: "22",
    name: "Kit Utensílios Silicone com Suporte 12 Peças",
    price: 67.90,
    originalPrice: 179.90,
    image: "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/12-5v5rr2i5wr.jpg",
    images: [
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/12-5v5rr2i5wr.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/11-8dqy6v5ebz.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/7-oag8295qkc.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/8-ex929ro0ey.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/9-d6sk8zpa86.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/kit-cozinha-azul-1-gzg0yhw8ci.jpg",
      "https://cdn.awsli.com.br/2500x2500/0/239/produto/234326758/kit-cozinha-preto--1-bbmi09l7f7.jpg",
    ],
    category: "Cozinha",
    rating: 4.7,
    reviews: 678,
    description: "## Kit Utensílios de Cozinha de Silicone com Suporte — 12 Peças\n\nElegância e funcionalidade se encontram neste kit completo de utensílios de cozinha em silicone com **suporte organizador incluso**. Projetado para os apaixonados por culinária, este conjunto reúne todas as ferramentas essenciais para preparar pratos deliciosos com facilidade e organização.\n\n## O que vem no kit (12 peças)\n\n• **Colher vazada** — 31,5 x 7 cm\n• **Espátula reta** — 32,5 x 8 cm\n• **Colher lisa** — 31,5 x 7 cm\n• **Espátula vazada** — 32,5 x 8 cm\n• **Espátula redonda** — 31,5 x 7 cm\n• **Espátula semicircular** — 31,5 x 6 cm\n• **Pegador de massas** — 30 x 6 cm\n• **Concha para molhos** — 31 x 7,5 cm\n• **Pincel culinário** — 26,5 x 4 cm\n• **Batedor fouet** — 24,5 x 5,2 cm\n• **Pinça pegador** — 26 cm\n• **Pote/suporte de bancada** para os utensílios\n\n## Destaques\n\n✓ **Silicone premium** — resistente e seguro para panelas antiaderentes\n✓ **Suporte vertical incluso** — organização e fácil acesso\n✓ **Livre de BPA** — atóxico e seguro para alimentos\n✓ **Cabo em madeira** ergonômico e antiderrapante\n✓ **Fácil de lavar** — pode ir na lava-louças\n✓ **Design moderno** que valoriza qualquer cozinha\n\n## Especificações\n\n• **Material:** madeira e silicone alimentar\n• **Composição:** 12 peças (11 utensílios + 1 suporte)\n• **Dimensões do suporte:** 13 x 13 x 33 cm\n• **Cores disponíveis:** rosa, azul, vermelho, preto\n• **Garantia:** 90 dias contra defeito de fabricação\n\n## Cuidados\n\n• Não use o lado verde (áspero) da esponja\n• Evite produtos químicos abrasivos — use água, esponja macia e detergente neutro\n• Lave logo após o uso para evitar manchas e cheiros",
    features: ["12 peças + suporte", "Silicone alimentar", "Livre de BPA", "Suporte organizador", "Cabo de madeira"],
    inStock: true,
    badge: "OFERTA",
    options: [
      {
        name: "Cor",
        variants: [
          { label: "Rosa", price: 67.90, originalPrice: 179.90, imageIndex: 1 },
          { label: "Azul", price: 67.90, originalPrice: 179.90, imageIndex: 5 },
          { label: "Vermelho", price: 67.90, originalPrice: 179.90, imageIndex: 3 },
          { label: "Preto", price: 67.90, originalPrice: 179.90, imageIndex: 6 },
        ],
      },
    ],
  },
  {
    id: "23",
    name: "Kit Utensílios Silicone 5 Peças Inox",
    price: 29.90,
    originalPrice: 129.90,
    image: "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/img_67dc9e4908662_1742511689-sa8mvzb4tn.jpeg",
    images: [
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/img_67dc9e4908662_1742511689-sa8mvzb4tn.jpeg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/img_67dc9e490865d_1742511689-5jep99ft67.jpeg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/69359fa38516a0885a1bd82428e8c8bd-hwyjwo15tv.jpeg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/b07ead3df9db9db11c4606b2c5793ecb-r1i5t9wcfr.jpeg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/img_67dc9e4908660_1742511689-dtner8zjxu.jpeg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/ud395_concha-8r6ic3xhld.jpg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/ud396_pegador-g00rudsn2m.jpg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/ud416_espatula_vazada-9fvxti121x.jpg",
      "https://cdn.awsli.com.br/2500x2500/1983/1983803/produto/344707601/ud799_colher-dl4lt5kkdn.jpg",
    ],
    category: "Cozinha",
    rating: 4.7,
    reviews: 412,
    description: "## Kit Conjunto Utensílios Profissional 5 Peças — Silicone com Cabo Inox\n\nConjunto profissional com 5 utensílios essenciais de cozinha que combinam **cabeça em silicone alimentar** com **cabo em aço inoxidável** de alta resistência. A escolha ideal para quem cozinha todos os dias e busca durabilidade com acabamento sofisticado.\n\n## O que vem no kit (5 peças)\n\n• **1 Escumadeira**\n• **1 Espátula vazada**\n• **1 Colher para servir**\n• **1 Pegador de macarrão**\n• **1 Concha de sopa**\n\n## Destaques\n\n✓ **Mais seguro e saudável** — silicone 100% alimentar, livre de BPA, sem odor químico forte\n✓ **Cabo em aço inox** — robusto, resistente à corrosão e fácil de higienizar\n✓ **Não risca panelas antiaderentes** — perfeito para todo tipo de cookware\n✓ **Resistente ao calor** — silicone suporta altas temperaturas sem deformar\n✓ **Acabamento profissional** — visual de cozinha de chef\n✓ **Fácil limpeza** — após 5 minutos de molho, basta enxaguar\n\n## Especificações\n\n• **Material:** silicone alimentar + aço inox\n• **Composição:** 5 peças essenciais\n• **Cores disponíveis:** vermelho e preto\n• **Garantia:** 90 dias contra defeito de fabricação\n\n## Primeira utilização\n\nDeixe os utensílios de molho por meia hora antes do primeiro uso e exponha ao ar por cerca de 3 horas — o cheiro original de sílica gel desaparecerá completamente.\n\nQualidade de chef para a sua cozinha.",
    features: ["5 peças essenciais", "Cabo em aço inox", "Silicone alimentar", "Não risca panelas", "Acabamento profissional"],
    inStock: true,
    badge: "OFERTA",
    options: [
      {
        name: "Cor",
        variants: [
          { label: "Vermelho", price: 29.90, originalPrice: 129.90, imageIndex: 0 },
          { label: "Preto", price: 29.90, originalPrice: 129.90, imageIndex: 1 },
        ],
      },
    ],
  },

  // ============ ORGANIZAÇÃO ============
  {
    id: "24",
    name: "Porta Tempero Giratório Vidro e Inox",
    price: 29.90,
    originalPrice: 219.90,
    image: "/products/porta-tempero-12-potes-inox.jpg",
    images: [
      "/products/porta-tempero-12-potes-inox.jpg",
      "/products/porta-tempero-9-potes-preto.jpg",
      "/products/porta-tempero-8-potes-madeira.jpg",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 920,
    description: "## Porta Condimentos Giratório — Aço Inox e Vidro\n\nO porta tempero perfeito para quem ama uma cozinha organizada, prática e com cara de revista. Com potes de vidro transparente e estrutura em aço inoxidável escovado, ele gira 360° e mantém todos os seus temperos ao alcance da mão.\n\n## DESTAQUES\n✓ Gira 360° — acesso fácil a todos os temperos\n✓ Estrutura sólida em aço inox que não enferruja\n✓ Tampas com furos dosadores (polvilhar) e abertura grande (colher)\n✓ Design elegante que combina com qualquer cozinha\n\n## POR QUE VOCÊ VAI AMAR\n• Acaba com a bagunça da gaveta de temperos\n• Visual de cozinha gourmet sobre a bancada\n• Economia: você passa a usar todos os temperos que tem em casa\n• Perfeito para presente em chá de casa nova ou casamento\n\n## CONTEÚDO DA EMBALAGEM\n• 1 Suporte giratório\n• Potes de vidro com tampa dosadora",
    features: ["Potes de vidro", "Estrutura em aço inox", "Giratório 360°", "Tampas dosadoras"],
    inStock: true,
    badge: "OFERTA",
    options: [
      {
        name: "Modelo",
        variants: [
          { label: "Alumínio 16", price: 129.90, originalPrice: 219.90, imageIndex: 0 },
          { label: "Alumínio 12", price: 39.90, originalPrice: 219.90, imageIndex: 1 },
          { label: "Madeira", price: 29.90, originalPrice: 219.90, imageIndex: 2 },
        ],
      },
    ],
  },
  {
    id: "25",
    name: "Porta Tempero Giratório 6 Potes Rústico",
    price: 29.90,
    originalPrice: 159.90,
    image: "/products/porta-tempero-8-potes-madeira.jpg",
    images: [
      "/products/porta-tempero-8-potes-madeira.jpg",
      "/products/porta-tempero-12-potes-inox.jpg",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 540,
    description: "## Porta Tempero Giratório Rústico — 6 Potes\n\nUm verdadeiro charme para a cozinha. Este porta condimentos une beleza e praticidade do sistema giratório, deixando seus temperos sempre à mão.\n\n## ESPECIFICAÇÕES TÉCNICAS\n• **Material dos potes:** Vidro transparente\n• **Tampas:** Metal with vedação\n• **Quantidade:** 6 potes\n• **Sistema:** Giratório 360°\n\n## DESTAQUES\n✓ Gira suavemente em 360°\n✓ Potes de vidro com alça lateral em metal\n✓ Tampas que fecham com firmeza para conservar o aroma\n✓ Design rústico que valoriza a decoração\n\n## CONTEÚDO DA EMBALAGEM\n• 1 Suporte giratório\n• 6 Potes de vidro with tampa metálica",
    features: ["6 potes giratórios", "Design elegante", "Acesso 360°", "Tampas com vedação"],
    inStock: true,
    badge: "OFERTA",
    options: [
      {
        name: "Material",
        variants: [
          { label: "Madeira", price: 29.90, originalPrice: 159.90, imageIndex: 0 },
          { label: "Alumínio", price: 59.90, originalPrice: 159.90, imageIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "26",
    name: "Caixa Organizadora Fit Grande 5,6L",
    price: 39.90,
    originalPrice: 64.90,
    image: "/products/caixa-organizadora-fit-5l.jpg",
    images: [
      "/products/caixa-organizadora-fit-5l.jpg",
    ],
    category: "Organização",
    rating: 4.7,
    reviews: 1180,
    description: "## Caixa Organizadora Fit Grande 5,6 Litros — Transparente e Empilhável\n\nA solução prática e moderna para organizar qualquer ambiente da casa. Inspirada na linha Fit, da Coza, esta caixa transparente permite visualizar todo o conteúdo sem precisar abrir, otimiza o espaço e mantém tudo no lugar.\n\n## ESPECIFICAÇÕES TÉCNICAS\n• **Material:** Plástico (polipropileno) atóxico\n• **Capacidade:** 5,6 litros\n• **Cor:** Cristal (transparente)\n• **Dimensões:** 29,5 x 19,5 x 13,5 cm (aprox.)\n• **Tampa:** Encaixe firme e seguro\n• **Empilhável:** Sim\n\n## DESTAQUES\n✓ Transparente — você vê o que tem dentro sem abrir\n✓ Empilhável — aproveita melhor a altura do armário\n✓ Tampa com travamento seguro\n✓ Material resistente e fácil de higienizar\n✓ Modular: combine vários tamanhos da mesma linha\n\n## ONDE USAR\n• **Cozinha:** organizar pacotes, bolachas, massas e mantimentos\n• **Despensa:** padronizar o armazenamento\n• **Banheiro:** produtos de higiene, cosméticos\n• **Quarto:** acessórios, papelaria, brinquedos pequenos\n• **Lavanderia:** produtos de limpeza\n• **Escritório:** organização de cabos, papéis e materiais\n\n## CONTEÚDO DA EMBALAGEM\n• 1 Caixa organizadora com tampa (5,6L)\n\n## CUIDADOS\n• Lavar com água, sabão neutro e esponja macia\n• Não levar à lava-louças ou ao microondas\n• Não usar produtos abrasivos\n• Secar bem antes de guardar alimentos",
    features: ["Capacidade 5,6L", "Transparente", "Empilhável", "Tampa com travamento", "Atóxico"],
    inStock: true,
    badge: "OFERTA",
  },
  {
    id: "27",
    name: "Cestos Organizadores Multiuso 4 Peças",
    price: 49.90,
    originalPrice: 139.90,
    image: "/products/cestos-organizadores-3pcs.jpg",
    images: [
      "/products/cestos-organizadores-3pcs.jpg",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 720,
    description: "## Kit 4 Cestos Organizadores Multiuso — Trançado em Corda Natural\n\nUm conjunto que une beleza e funcionalidade. Os 4 cestos em diferentes tamanhos são perfeitos para organizar qualquer ambiente da casa com um toque aconchegante e contemporâneo.\n\n## ESPECIFICAÇÕES TÉCNICAS\n• **Material:** Corda de algodão trançada\n• **Cor:** Bege natural / off-white\n• **Quantidade:** 4 cestos\n• **Alças:** Reforçadas, trançadas\n• **Estilo:** Boho / escandinavo / minimalista\n\n## DESTAQUES\n✓ 4 tamanhos para organizar diferentes itens\n✓ Material macio que não risca móveis\n✓ Alças reforçadas para transporte fácil\n✓ Visual neutro que combina com qualquer decoração\n✓ Quando vazios podem ser dobrados ou empilhados\n\n## ONDE USAR\n• **Quarto de bebê:** brinquedos, fraldas e roupinhas\n• **Sala:** mantas, controles e revistas\n• **Banheiro:** toalhas e produtos de beleza\n• **Lavanderia:** roupa suja separada por tipo\n• **Escritório:** papéis, cabos e materiais\n• **Closet:** acessórios, sapatos e bolsas\n\n## CONTEÚDO DA EMBALAGEM\n• 4 Cestos organizadores em tamanhos diferentes\n\n## CUIDADOS\n• Limpar com pano levemente úmido\n• Não lavar na máquina\n• Manter longe de umidade excessiva\n• Para manchas, use sabão neutro com escova macia",
    features: ["4 tamanhos", "Corda de algodão", "Alças reforçadas", "Visual neutro", "Multiuso"],
    inStock: true,
    badge: "OFERTA",
  },
  {
    id: "28",
    name: "Porta Tempero Giratório 9 Potes de Vidro Preto",
    price: 89.90,
    originalPrice: 149.90,
    image: "/products/porta-tempero-9-potes-preto.jpg",
    images: [
      "/products/porta-tempero-9-potes-preto.jpg",
    ],
    category: "Organização",
    rating: 4.8,
    reviews: 480,
    description: "## Porta Tempero Giratório 9 Potes — Vidro com Tampa Dosadora Preta\n\nDesign moderno, prático e com aquele toque de cozinha gourmet. Com 9 potes de vidro distribuídos em 2 níveis e tampas dosadoras pretas, este porta tempero gira 360° e organiza seus condimentos com elegância sobre a bancada.\n\n## ESPECIFICAÇÕES TÉCNICAS\n• **Material da estrutura:** Plástico ABS preto\n• **Material dos potes:** Vidro transparente\n• **Tampas:** Plástico preto com furos dosadores\n• **Quantidade:** 9 potes\n• **Sistema:** Giratório 360°\n• **Capacidade de cada pote:** ~100 ml\n\n## DESTAQUES\n✓ 2 níveis com 9 potes ao todo\n✓ Tampa dosadora dupla — polvilhar ou abrir totalmente\n✓ Gira suavemente 360° na base\n✓ Vidro transparente: você vê de imediato o que precisa\n✓ Cor preta moderna que combina com cozinhas contemporâneas\n\n## DIMENSÕES APROXIMADAS\n• Altura: 25 cm\n• Diâmetro da base: 20 cm\n\n## POR QUE VOCÊ VAI AMAR\n• Libera espaço na gaveta de temperos\n• Visual minimalista e moderno na bancada\n• Você passa a usar mais temperos no dia a dia\n• Perfeito para presente útil e bonito\n\n## CONTEÚDO DA EMBALAGEM\n• 1 Suporte giratório preto em 2 níveis\n• 9 Potes de vidro com tampa dosadora\n• 1 Cartela de etiquetas adesivas\n\n## CUIDADOS\n• Lavar potes com água morna e sabão neutro\n• Não levar ao forno, microondas ou lava-louças\n• Limpar a base com pano úmido\n• Secar bem os potes antes de armazenar temperos",
    features: ["9 potes de vidro", "Tampa dosadora preta", "Giratório 360°", "2 níveis", "Etiquetas inclusas"],
    inStock: true,
    badge: "OFERTA",
  },

  // ============ UTILIDADES ============
  {
    id: "30",
    name: "Vassoura Mágica Plus Flash Limp",
    price: 79.90,
    originalPrice: 129.90,
    image: "/products/vassoura-magica-flashlimp.jpg",
    images: [
      "/products/vassoura-magica-flashlimp.jpg",
      "/products/vassoura-magica-360-3em1.jpg",
    ],
    category: "Utilidades",
    rating: 4.7,
    reviews: 1340,
    description: "## Vassoura Mágica Plus Flash Limp\n\nA vassoura preferida dos brasileiros agora em sua versão **Plus**, com cerdas de alta densidade que recolhem até os menores resíduos como cabelos, pelos de animais e poeira fina.\n\n## Destaques do produto\n\n✓ **Tecnologia Flash Limp** exclusiva para limpeza profunda\n✓ **Cerdas em PET reciclado** de alta densidade e durabilidade\n✓ **Raspador de borracha** integrado para remover sujeiras grudadas\n✓ **Cabo ergonômico** longo e leve\n✓ **Funciona em qualquer piso** — seco ou úmido\n\n## Especificações técnicas\n\n• Marca: Flash Limp\n• Material da base: plástico PP resistente\n• Cerdas: PET reciclado azul\n• Cabo: alumínio com revestimento plástico\n• Comprimento total: aproximadamente 130 cm\n• Largura da base: 30 cm\n\n## Como usar\n\nUtilize movimentos retos e firmes. Para sujeiras aderidas, vire a base e use o raspador de borracha. Lave as cerdas com água e sabão neutro quando necessário.",
    features: ["Tecnologia Flash Limp", "Cerdas alta densidade", "Raspador integrado", "Cabo ergonômico", "Multipiso"],
    inStock: true,
    badge: "OFERTA",
  },
  {
    id: "31",
    name: "Lixeira com Tampa e Pedal de Bambu",
    price: 39.90,
    originalPrice: 189.90,
    image: "/products/lixeira-bambu-pedal.jpg",
    images: [
      "/products/lixeira-bambu-pedal.jpg",
    ],
    category: "Utilidades",
    rating: 4.8,
    reviews: 670,
    description: "## Lixeira Decorativa de Bambu com Pedal\n\nUma lixeira elegante, sustentável e funcional, feita em **bambu natural** com acabamento premium. O design discreto se integra a qualquer ambiente: cozinha, banheiro, quarto ou home office.\n\n## Características principais\n\n✓ **Estrutura em bambu natural** — material renovável e ecológico\n✓ **Acionamento por pedal** — abre sem usar as mãos, mais higiênico\n✓ **Amortecedor silencioso** — fechamento suave, sem barulho\n✓ **Cesto interno removível** em plástico, fácil de limpar\n✓ **Design decorativo multiuso** que valoriza o ambiente\n\n## Especificações\n\n• Material externo: bambu natural envernizado\n• Cesto interno: polipropileno removível\n• Capacidade: aproximadamente 8 litros\n• Dimensões: 23 cm (diâmetro) × 35 cm (altura)\n• Sistema: pedal com mola e amortecedor\n• Cor: bambu natural\n\n## Cuidados\n\nLimpe a parte externa com pano levemente úmido e seque em seguida. Não submerja em água. O cesto interno pode ser lavado normalmente com água e sabão.",
    features: ["Bambu natural", "Pedal silencioso", "Amortecedor", "Cesto removível", "8 litros"],
    inStock: true,
    badge: "ECO",
  },
  {
    id: "32",
    name: "Lixeira de Pedal 12L em Inox com Tampa Colorida",
    price: 49.90,
    originalPrice: 169.90,
    image: "/products/lixeira-inox-12l-pedal.jpg",
    images: [
      "/products/lixeira-inox-12l-pedal.jpg",
    ],
    category: "Utilidades",
    rating: 4.8,
    reviews: 890,
    description: "## Lixeira de Pedal 12L em Aço Inox\n\nLixeira robusta e moderna, com **estrutura em aço inox escovado** e tampa colorida que traz personalidade ao ambiente. Ideal para cozinha, banheiro, área externa e espaço gourmet.\n\n## Por que escolher\n\n✓ **Capacidade generosa de 12 litros** — atende grande volume diário\n✓ **Aço inox 201** — resistente à ferrugem e oxidação\n✓ **Cesto interno removível** em plástico, facilita o descarte\n✓ **Pedal silencioso** com mola de alta durabilidade\n✓ **Base antiderrapante** que não risca o piso\n\n## Especificações\n\n• Material: aço inox escovado + tampa em ABS colorido\n• Capacidade: 12 litros\n• Altura: aproximadamente 38 cm\n• Diâmetro: 25 cm\n• Cesto interno: polipropileno removível\n• Acompanha: 1 lixeira completa\n\n## Indicações de uso\n\nPerfeita para cozinhas, banheiros, lavabos, escritórios, áreas gourmet e ambientes externos cobertos. Higiênica graças ao acionamento por pedal — ideal para áreas de manuseio de alimentos.",
    features: ["Aço inox escovado", "12 litros", "Pedal silencioso", "Cesto removível", "Tampa colorida"],
    inStock: true,
    badge: "OFERTA",
  },
  {
    id: "33",
    name: "Mop Vassoura Mágica Giratória Varredora 360°",
    price: 89.90,
    originalPrice: 249.90,
    image: "/products/mop-vassoura-varredora.jpg",
    images: [
      "/products/mop-vassoura-varredora.jpg",
    ],
    category: "Utilidades",
    rating: 4.8,
    reviews: 1820,
    description: "## Mop Vassoura Mágica Inteligente — Varre, Aspira e Coleta\n\nA vassoura **Feiticeira** revoluciona a limpeza doméstica: ela **varre, aspira e armazena os resíduos** em um único movimento. Sem fio, sem bateria, sem complicação.\n\n## Tecnologia inovadora\n\n✓ **3 ações simultâneas** — varre + aspira + coleta\n✓ **Compartimento interno** que armazena toda a sujeira recolhida\n✓ **Rotação 360°** para alcançar cantos e embaixo de móveis\n✓ **Cabo telescópico ajustável** para qualquer altura\n✓ **Sem fio e sem bateria** — funciona pelo movimento mecânico\n\n## Especificações\n\n• Material: plástico ABS reforçado + cabo em aço inox\n• Cor: branco com detalhes em verde\n• Altura ajustável: 80 cm a 135 cm\n• Largura da base: 28 cm\n• Compartimento de coleta: 250 ml\n• Microfibra incluída para função mop úmido\n\n## Como funciona\n\nAo deslizar a vassoura pelo chão, as escovas internas giram e empurram os resíduos para o compartimento interno. Para esvaziar, basta abrir a tampa e despejar no lixo. Acompanha refil de microfibra para limpeza úmida adicional.",
    features: ["Varre + aspira + coleta", "Giratório 360°", "Sem fio nem bateria", "Cabo telescópico", "Compartimento interno"],
    inStock: true,
    badge: "MAIS VENDIDO",
  },
];

import { popularProducts } from "./popularProducts";
products.push(...popularProducts);

export const categories = [
  { name: "Cozinha", slug: "cozinha" },
  { name: "Banheiro", slug: "banheiro" },
  { name: "Quarto", slug: "quarto" },
  { name: "Organização", slug: "organizacao" },
  { name: "Sala de Estar", slug: "sala-de-estar" },
  { name: "Decoração", slug: "decoracao" },
  { name: "Escritório em Casa", slug: "escritorio-em-casa" },
  { name: "Utilidades", slug: "utilidades" },
  { name: "Iluminação", slug: "iluminacao" },
];
