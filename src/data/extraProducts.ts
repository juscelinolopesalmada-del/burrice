import type { Product } from "./products";
import illuCozinha from "@/assets/showcase-cozinha.jpg";
import illuOrganizacao from "@/assets/showcase-organizacao.jpg";
import illuDecoracao from "@/assets/showcase-decoracao.jpg";
import illuUtilidades from "@/assets/showcase-utilidades.jpg";
import illuCozinha2 from "@/assets/category-cozinha.jpg";
import illuOrganizacao2 from "@/assets/category-organizacao.jpg";
import illuDecoracao2 from "@/assets/category-decoracao.jpg";
import illuUtilidades2 from "@/assets/category-utilidades.jpg";

// Illustrative category images (used as placeholders for products without real photos)
const IMG: Record<string, string[]> = {
  Cozinha: [illuCozinha, illuCozinha2],
  Banheiro: [illuUtilidades, illuUtilidades2],
  Organização: [illuOrganizacao, illuOrganizacao2],
  Decoração: [illuDecoracao, illuDecoracao2],
  Quarto: [illuOrganizacao, illuDecoracao],
};

type Raw = [number, string, keyof typeof IMG, string, number, number, string];

const raw: Raw[] = [
  [1, "Jogo de Panelas Antiaderente 5 Peças", "Cozinha", "Conjunto com 5 panelas antiaderentes com tampa de vidro, cabos ergonômicos em silicone e fácil limpeza. Ideal para o dia a dia.", 169.90, 249.90, "COZ-001"],
  [2, "Forma para Bolo Retangular Antiaderente", "Cozinha", "Forma retangular com revestimento antiaderente de alta qualidade, fundo removível e distribuição uniforme de calor.", 89.90, 119.90, "COZ-002"],
  [3, "Tábua de Corte em Bambu Grande", "Cozinha", "Tábua de corte ecológica em bambu natural, com sulcos para coleta de líquidos e alça lateral para fácil manuseio.", 39.90, 129.90, "COZ-003"],
  [4, "Porta-Temperos Giratório 12 Peças", "Cozinha", "Suporte giratório com 12 potes de vidro para temperos, tampa hermética e etiquetas incluídas. Organiza e decora.", 129.90, 169.90, "COZ-004"],
  [5, "Escorredor de Louças Inox Dobrável", "Cozinha", "Escorredor em aço inox com bandeja coletora de água, dobrável para economia de espaço. Suporta até 5kg.", 149.90, 199.90, "COZ-005"],
  [6, "Conjunto de Tigelas de Vidro 4 Peças", "Cozinha", "Kit com 4 tigelas de vidro borossilicato com tampa, próprias para micro-ondas e freezer. Ideais para armazenamento.", 119.90, 159.90, "COZ-006"],
  [7, "Chaleira Elétrica 1,7L Inox", "Cozinha", "Chaleira elétrica com capacidade de 1,7L, desligamento automático, indicador de nível de água e base giratória 360°.", 179.90, 229.90, "COZ-007"],
  [8, "Processador de Alimentos 3 em 1", "Cozinha", "Processador multifuncional com 3 velocidades, lâminas intercambiáveis para fatiar, ralar e processar. 800W de potência.", 249.90, 319.90, "COZ-008"],
  [9, "Jogo de Utensílios de Cozinha 6 Peças", "Cozinha", "Kit com 6 utensílios em silicone e inox: espátula, concha, escumadeira, pegador, colher e fouet. Suporte incluso.", 99.90, 139.90, "COZ-009"],
  [10, "Lixeira de Pia com Tampa Automática", "Cozinha", "Lixeira de bancada com abertura automática por sensor, capacidade de 3L, revestimento interno removível e lavável.", 119.90, 149.90, "COZ-010"],
  [11, "Porta-Papel Toalha de Parede Inox", "Cozinha", "Suporte para papel toalha em aço inox escovado, fixação na parede ou sob armário, instalação fácil.", 84.90, 109.90, "COZ-011"],
  [12, "Conjunto de Potes Herméticos 10 Peças", "Cozinha", "Kit com 10 potes em plástico BPA free com tampa hermética de 4 travas. Ideais para mantimentos e freezer.", 139.90, 179.90, "COZ-012"],
  [13, "Mandoline Fatiador Multiuso", "Cozinha", "Fatiador ajustável com 5 lâminas intercambiáveis, base antiderrapante e protetor de mãos incluso.", 109.90, 149.90, "COZ-013"],
  [14, "Balança Digital de Cozinha 5kg", "Cozinha", "Balança de precisão com display LCD, função tara, desligamento automático e superfície em vidro temperado.", 94.90, 124.90, "COZ-014"],
  [15, "Espremedor de Frutas Elétrico", "Cozinha", "Espremedor elétrico com 2 cones intercambiáveis, separador de sementes, jarra de 1L e 25W de potência.", 129.90, 169.90, "COZ-015"],
  [16, "Jogo de Facas em Inox 6 Peças", "Cozinha", "Conjunto com 6 facas profissionais em aço inox com cabos emborrachados antiderrapantes e estojo de proteção.", 219.90, 289.90, "COZ-016"],
  [17, "Air Fryer Compacta 3,5L", "Cozinha", "Fritadeira sem óleo com capacidade de 3,5L, timer de 30 minutos, temperatura ajustável até 200°C e cesto antiaderente.", 249.90, 299.90, "COZ-017"],
  [18, "Garrafa Térmica de Inox 1L", "Cozinha", "Garrafa térmica em inox com vácuo duplo, mantém bebidas quentes por 12h e frias por 24h. Tampa-copo inclusa.", 119.90, 154.90, "COZ-018"],
  [19, "Suporte Organizador de Tampas e Panelas", "Cozinha", "Organizador expansível em inox para tampas e panelas, ajustável de 25cm a 45cm, 6 divisórias.", 89.90, 119.90, "COZ-019"],
  [20, "Conjunto de Bowls para Servir 3 Peças", "Cozinha", "Kit com 3 bowls em cerâmica com esmalte interno, ideais para saladas e sobremesas. Vão ao forno e micro-ondas.", 149.90, 189.90, "COZ-020"],

  [21, "Kit Tapete de Banheiro 3 Peças", "Banheiro", "Conjunto com tapete grande, médio e pastilha em pelúcia antiderrapante, lavável na máquina. Disponível em cores neutras.", 129.90, 169.90, "BAN-001"],
  [22, "Saboneteira Dispenser de Parede 350ml", "Banheiro", "Dispenser para sabonete líquido com fixação sem furos, capacidade de 350ml e visor de nível.", 84.90, 109.90, "BAN-002"],
  [23, "Porta-Shampoo de Canto para Chuveiro", "Banheiro", "Prateleira de canto em inox escovado com ventosas de alta fixação, 3 prateleiras e gancho para toalha.", 119.90, 154.90, "BAN-003"],
  [24, "Organizador de Gaveta para Banheiro", "Banheiro", "Kit com 6 divisórias modulares em plástico transparente para organizar maquiagem, acessórios e medicamentos.", 89.90, 119.90, "BAN-004"],
  [25, "Espelho de Aumento com Suporte Articulado", "Banheiro", "Espelho de aumento 5x com suporte articulado de 360°, acabamento em inox e iluminação LED integrada.", 179.90, 229.90, "BAN-005"],
  [26, "Toalheiro de Parede Duplo em Inox", "Banheiro", "Toalheiro duplo em aço inox escovado com fixação na parede, suporta até 3kg e acabamento premium.", 149.90, 189.90, "BAN-006"],
  [27, "Lixeira de Banheiro com Pedal 5L", "Banheiro", "Lixeira com abertura por pedal, capacidade de 5L, balde interno removível e design slim para economizar espaço.", 99.90, 129.90, "BAN-007"],
  [28, "Porta-Escova e Pasta de Dente em Acrílico", "Banheiro", "Organizador de bancada em acrílico transparente com 4 divisórias para escovas, pasta e acessórios.", 84.90, 109.90, "BAN-008"],
  
  [30, "Cortina de Box em PVC Antifungo", "Banheiro", "Cortina de box com 12 ganchos inclusos, tratamento antifungo e antibacteriano, lavável na máquina. 180x180cm.", 94.90, 124.90, "BAN-010"],
  [31, "Bandeja Organizadora de Banheiro", "Banheiro", "Bandeja em resina com compartimentos para perfumes, cremes e acessórios. Design moderno e fácil higienização.", 119.90, 154.90, "BAN-011"],
  [32, "Cabide de Parede Inox 5 Ganchos", "Banheiro", "Cabide em aço inox com 5 ganchos giratórios, suporta até 10kg e fixação com parafusos inclusos.", 109.90, 139.90, "BAN-012"],
  [33, "Tapete Diatomita para Banheiro", "Banheiro", "Tapete de pedra diatomita com absorção rápida de água, antiderrapante, antibacteriano e secagem instantânea.", 149.90, 194.90, "BAN-013"],
  [34, "Kit Acessórios de Banheiro 5 Peças Inox", "Banheiro", "Conjunto completo: saboneteira, porta-escova, copo, toalheiro e papeleira em inox escovado. Parafusos inclusos.", 229.90, 299.90, "BAN-014"],
  [35, "Organizador de Maquiagem Giratório", "Banheiro", "Porta-maquiagem giratório 360° em acrílico com 20 compartimentos para batons, pincéis e acessórios.", 159.90, 209.90, "BAN-015"],
  [36, "Saboneteira de Pia em Cerâmica", "Banheiro", "Saboneteira de cerâmica com prato removível, design minimalista e acabamento esmaltado. Antialérgica.", 84.90, 109.90, "BAN-016"],
  [37, "Porta-Toalha de Rosto de Parede", "Banheiro", "Suporte para toalha de rosto em aço inox com barra dupla, fixação sem furos e suporte de até 2kg.", 99.90, 129.90, "BAN-017"],
  [38, "Ventilador de Banheiro Silencioso", "Banheiro", "Exaustor de banheiro silencioso com 110m³/h de vazão, timer ajustável, fácil instalação e baixo consumo.", 189.90, 249.90, "BAN-018"],
  [39, "Estante de Banheiro com 3 Prateleiras", "Banheiro", "Estante suspensa em bambu com 3 prateleiras ajustáveis, suporta até 15kg e fácil montagem.", 169.90, 219.90, "BAN-019"],
  [40, "Garrafa de Vidro para Sabonete 300ml", "Banheiro", "Garrafa de vidro âmbar com bomba dosadora, rótulo lavável incluso, ideal para sabonete e shampoo líquido.", 89.90, 114.90, "BAN-020"],

  [41, "Caixa Organizadora com Tampa 30L", "Organização", "Caixa organizadora empilhável em plástico resistente com tampa, alças laterais e capacidade de 30L. Ideal para roupas e brinquedos.", 99.90, 129.90, "ORG-001"],
  [42, "Kit Cabides Veludo Antiderrapante 50 Peças", "Organização", "Conjunto com 50 cabides ultrafinos em veludo antiderrapante, giram 360°, economizam 80% de espaço no guarda-roupa.", 119.90, 154.90, "ORG-002"],
  [43, "Divisória de Gaveta Modular", "Organização", "Kit com 12 divisórias ajustáveis em bambu para organizar gavetas de roupas, talheres ou escritório.", 94.90, 124.90, "ORG-003"],
  [44, "Organizador de Armário com 6 Prateleiras", "Organização", "Organizador vertical dobrável com 6 compartimentos para bolsas, suéteres e acessórios. Fácil instalação.", 129.90, 169.90, "ORG-004"],
  [45, "Caixa de Sapato Transparente Empilhável", "Organização", "Kit com 6 caixas de sapato em acrílico transparente com tampa magnética, empilháveis e com identificação frontal.", 149.90, 189.90, "ORG-005"],
  [46, "Vácuo Bag para Roupas 6 Peças", "Organização", "Kit com 6 sacos a vácuo (3 tamanhos), com válvula dupla e lacre hermético. Reduz volume em até 75%.", 119.90, 154.90, "ORG-006"],
  [47, "Suporte Vertical para Documentos A4", "Organização", "Organizador de mesa em aço com 5 compartimentos verticais para documentos, revistas e pastas. Acabamento em preto fosco.", 89.90, 114.90, "ORG-007"],
  [48, "Cesta de Vime para Organização", "Organização", "Cesta artesanal em vime natural com alças de couro sintético, ideal para decoração e organização de qualquer ambiente.", 109.90, 139.90, "ORG-008"],
  [49, "Organizador de Bolsas Tipo Colmeia", "Organização", "Suporte vertical de parede com 6 divisórias em feltro para bolsas e clutches. Fixação com parafusos inclusos.", 139.90, 179.90, "ORG-009"],
  [50, "Prateleira de Parede Flutuante 60cm", "Organização", "Prateleira flutuante em MDF com suporte oculto, capacidade de 15kg, acabamento laminado. Buchas e parafusos inclusos.", 129.90, 164.90, "ORG-010"],
  [51, "Caixas de Papelão Decorativas 3 Peças", "Organização", "Kit com 3 caixas organizadoras em papelão resistente com estampa geométrica, tampas e etiquetas inclusas.", 94.90, 124.90, "ORG-011"],
  [52, "Suporte de Parede para Bicicleta", "Organização", "Suporte de parede em aço com revestimento em borracha, suporta até 20kg, fácil instalação e dobrável.", 159.90, 209.90, "ORG-012"],
  [53, "Organizador de Cabos de Mesa", "Organização", "Caixa organizadora de cabos e régua com 4 compartimentos, tampa deslizante e abertura para fios. Cor branca.", 84.90, 109.90, "ORG-013"],
  [54, "Gancho Adesivo de Parede Resistente 10 Peças", "Organização", "Kit com 10 ganchos adesivos em inox, suportam até 5kg cada, sem furos, removíveis e reutilizáveis.", 89.90, 119.90, "ORG-014"],
  [55, "Porta-Revista de Parede em Couro Sintético", "Organização", "Porta-revista de parede com 3 bolsos em couro sintético, acabamento costurado e fixação com parafusos.", 119.90, 154.90, "ORG-015"],
  [56, "Organizador de Roupas para Viagem 4 Peças", "Organização", "Kit com 4 organizadores de mala em nylon com zíper, sistema de compressão e janela transparente. Tamanhos variados.", 129.90, 169.90, "ORG-016"],
  [57, "Rack de Sapatos Dobrável 10 Pares", "Organização", "Sapateira dobrável em tubos de metal e MDF para 10 pares de sapatos, montagem sem ferramentas.", 149.90, 194.90, "ORG-017"],
  [58, "Porta-Joias com Espelho de Parede", "Organização", "Porta-joias de parede com espelho frontal, 2 portas, compartimentos para colares, anéis e brincos. Travamento com chave.", 189.90, 249.90, "ORG-018"],
  [59, "Caixa Multiuso com Divisórias Removíveis", "Organização", "Caixa em plástico transparente com 15 divisórias ajustáveis, ideal para bijuterias, parafusos e artesanato.", 94.90, 124.90, "ORG-019"],
  [60, "Organizador de Geladeira com 6 Peças", "Organização", "Kit com 6 organizadores de geladeira em acrílico transparente, empilháveis e laváveis. Tamanhos variados.", 139.90, 179.90, "ORG-020"],

  [61, "Vaso de Cerâmica Minimalista Branco", "Decoração", "Vaso em cerâmica com acabamento fosco e design minimalista, ideal para flores secas e galhos decorativos. Altura 25cm.", 99.90, 129.90, "DEC-001"],
  [62, "Quadro Decorativo Abstrato 40x60cm", "Decoração", "Quadro com impressão em alta resolução, moldura em MDF e vidro temperado. Arte abstrata em tons neutros.", 149.90, 194.90, "DEC-002"],
  [63, "Porta-Retrato Flutuante Inox 4 Peças", "Decoração", "Kit com 4 porta-retratos flutuantes em inox escovado para fotos 10x15cm, fixação sem moldura na parede.", 119.90, 154.90, "DEC-003"],
  [64, "Luminária de Mesa Led Articulada", "Decoração", "Luminária de mesa com haste articulada, 3 temperaturas de cor, dimmer touch e porta USB integrado. 12W.", 189.90, 249.90, "DEC-004"],
  [65, "Relógio de Parede Silencioso 30cm", "Decoração", "Relógio de parede em MDF com ponteiros silenciosos, mecanismo sweep, números romanos e design nórdico.", 109.90, 139.90, "DEC-005"],
  [66, "Jogo de Almofadas Decorativas 4 Peças", "Decoração", "Kit com 4 almofadas em veludo com enchimento de fibra siliconada, capas removíveis e laváveis. 45x45cm.", 169.90, 219.90, "DEC-006"],
  [67, "Planta Artificial Suculenta com Vaso", "Decoração", "Conjunto com 3 suculentas artificiais em vaso de cimento, visual realista e sem necessidade de manutenção.", 94.90, 124.90, "DEC-007"],
  [68, "Difusor de Ambiente com Varetas 200ml", "Decoração", "Difusor de aromas com 200ml de essência e 8 varetas de rattan. Perfuma por até 60 dias. Aroma à escolha.", 119.90, 154.90, "DEC-008"],
  [69, "Bandeja Decorativa Retangular em Madeira", "Decoração", "Bandeja em madeira de pinus com alças de corda, acabamento natural, ideal para organizar e decorar superfícies.", 129.90, 169.90, "DEC-009"],
  [70, "Espelho Redondo de Parede 50cm", "Decoração", "Espelho com moldura em metal dourado ou preto fosco, 50cm de diâmetro e fixação na parede inclusa.", 189.90, 249.90, "DEC-010"],
  [71, "Manta de Sofá em Tricô 130x160cm", "Decoração", "Manta decorativa em tricô de algodão, tamanho 130x160cm, lavável na máquina. Tons neutros disponíveis.", 149.90, 189.90, "DEC-011"],
  [72, "Vela Aromática em Pote de Vidro 200g", "Decoração", "Vela artesanal em cera de soja com pavio de algodão e fragrância premium. Queima de até 40 horas.", 89.90, 114.90, "DEC-012"],
  [73, "Cabide Decorativo de Parede 3 Ganchos", "Decoração", "Cabide em madeira maciça com 3 ganchos de ferro, acabamento natural e fixação com parafusos.", 109.90, 139.90, "DEC-013"],
  [74, "Mini Aquário de Vidro Geométrico", "Decoração", "Terrário geométrico em vidro para plantas e suculentas, design hexagonal, abertura frontal e base em metal.", 139.90, 179.90, "DEC-014"],
  [75, "Tapete Decorativo Redondo 1m", "Decoração", "Tapete redondo em algodão com padrão geométrico trançado, antiderrapante, lavável e diâmetro de 1 metro.", 179.90, 229.90, "DEC-015"],
  [76, "Moldura Painel de Fotos 25 Espaços", "Decoração", "Painel para fotos com 25 espaços em formato hexagonal, moldura em MDF com cordão e 25 pregadores inclusos.", 129.90, 164.90, "DEC-016"],
  [77, "Trio de Vasos Escandinavos com Suporte", "Decoração", "Kit com 3 vasos em cerâmica de tamanhos diferentes com suporte de madeira, estilo escandinavo minimalista.", 159.90, 209.90, "DEC-017"],
  [78, "Relógio de Mesa Analógico Vintage", "Decoração", "Relógio de mesa com design vintage, estrutura em metal, mostrador em vidro e mecanismo silencioso.", 119.90, 154.90, "DEC-018"],
  [79, "Piso Vinílico Decorativo 2mm", "Decoração", "Piso vinílico autoadesivo com textura de madeira ou pedra, espessura 2mm, resistente à umidade. Pacote com 2m².", 149.90, 194.90, "DEC-019"],
  [80, "Porta-Livros de Metal Decorativo", "Decoração", "Par de aparadores de livros em metal com design geométrico, acabamento em ouro rosé ou preto. Suporta até 5kg.", 99.90, 129.90, "DEC-020"],

  [81, "Jogo de Cama Casal 4 Peças 300 Fios", "Quarto", "Jogo de cama casal em percal 300 fios com 1 lençol, 1 fronha e 2 porta-travesseiros. Antialérgico e macio.", 189.90, 249.90, "QUA-001"],
  [82, "Travesseiro Viscoelástico com Capa", "Quarto", "Travesseiro em espuma viscoelástica com capa removível em algodão 200 fios, suporte cervical e hipoalergênico.", 169.90, 219.90, "QUA-002"],
  [83, "Edredom Casal Microfibra 300g", "Quarto", "Edredom dupla-face em microfibra com enchimento de 300g/m², lavável na máquina, tamanho 200x220cm.", 219.90, 289.90, "QUA-003"],
  [84, "Cabeceira Estofada Queen Size", "Quarto", "Cabeceira estofada em suede com botões capitonê, estrutura em MDF e pés em madeira. Tamanho Queen 158cm.", 249.90, 319.90, "QUA-004"],
  [85, "Criado-Mudo Flutuante com Gaveta", "Quarto", "Criado-mudo suspenso em MDF com 1 gaveta e 1 prateleira aberta, suporta até 20kg. Fácil instalação.", 189.90, 249.90, "QUA-005"],
  [86, "Porta-Objetos de Cama com Bolsos", "Quarto", "Organizador de cama com 6 bolsos em tecido canvas, fixação no colchão ou grade, ideal para controles e livros.", 84.90, 109.90, "QUA-006"],
  [87, "Luminária de Cabeceira com Clip", "Quarto", "Luminária de leitura com clip, luz LED regulável, pescoço flexível de 50cm e porta USB de carregamento.", 129.90, 169.90, "QUA-007"],
  [88, "Organizador de Guarda-Roupa Dobrável", "Quarto", "Organizador vertical com 6 prateleiras dobráveis em tecido não tecido, ideal para roupas dobradas e acessórios.", 94.90, 124.90, "QUA-008"],
  [89, "Protetor de Colchão Impermeável", "Quarto", "Capa protetora de colchão em microfibra com camada impermeável, elástico em toda a volta. Tamanho casal.", 139.90, 179.90, "QUA-009"],
  [90, "Espelho de Corpo Inteiro com Moldura", "Quarto", "Espelho de corpo inteiro 170x50cm com moldura em MDF, pode ser apoiado ou fixado na parede, 2 posições.", 229.90, 299.90, "QUA-010"],
  [91, "Abajur de Mesa em Tecido E27", "Quarto", "Abajur de mesa com cúpula em tecido linho, base em cerâmica, bocal E27 e cabo de 1,5m. Altura 40cm.", 149.90, 194.90, "QUA-011"],
  [92, "Capa de Almofada Decorativa 45x45cm", "Quarto", "Capa de almofada em veludo com zíper invisível, lavável na máquina. Kit com 4 unidades em tons complementares.", 119.90, 154.90, "QUA-012"],
  [93, "Cortina Blackout 2 Folhas 2,60x1,40m", "Quarto", "Par de cortinas blackout em tecido texturizado, bloqueia 100% da luz, com argolas e fácil instalação. 2,60x1,40m.", 189.90, 249.90, "QUA-013"],
  [94, "Hamper de Roupa Suja em Bambu", "Quarto", "Cesto para roupas sujas em bambu com tampa e saco interno removível e lavável, capacidade de 60L.", 159.90, 209.90, "QUA-014"],
  [95, "Despertador Digital com Carregador Wireless", "Quarto", "Relógio despertador com carregamento wireless 10W integrado, display LED, temperatura ambiente e 2 alarmes.", 179.90, 229.90, "QUA-015"],
  [96, "Aromatizador Ultrassônico de Ambiente", "Quarto", "Umidificador e aromatizador ultrassônico com luz noturna em 7 cores, 300ml e desligamento automático.", 149.90, 194.90, "QUA-016"],
  [97, "Par de Fronhas Acetinadas 50x70cm", "Quarto", "Par de fronhas em cetim de poliéster, macias para o cabelo e pele, com envelope fechado. Tamanho 50x70cm.", 89.90, 114.90, "QUA-017"],
  [98, "Suporte de Leitura para Cama", "Quarto", "Suporte para livro e tablet com base de madeira e clipe ajustável, ângulos reguláveis de 0° a 360°.", 109.90, 139.90, "QUA-018"],
  [99, "Difusor de Calor para Ar-Condicionado", "Quarto", "Defletor de ar-condicionado magnético com lâminas ajustáveis, redireciona o ar frio e evita correntes diretas.", 94.90, 124.90, "QUA-019"],
  [100, "Manta Sherpa Dupla Face 1,50x2,00m", "Quarto", "Manta dupla face com um lado em pelúcia sherpa e outro em microfibra, tamanho 1,50x2,00m, lavável na máquina.", 169.90, 219.90, "QUA-020"],
];

// Deterministic feature extraction from description (split by ". " or "," → take 4 chunks)
const buildFeatures = (desc: string): string[] => {
  const parts = desc
    .split(/[.,]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 4 && p.length < 60);
  return parts.slice(0, 4);
};

const ratings = [4.6, 4.7, 4.8, 4.9, 5.0];
const reviewCounts = [42, 67, 89, 124, 156, 178, 203, 234, 267, 312];

export const extraProducts: Product[] = raw.map(([num, name, cat, desc, price, original, sku], i) => {
  const p: Product = {
    id: sku,
    name,
    price,
    originalPrice: original,
    image: IMG[cat][i % IMG[cat].length],
    category: cat,
    rating: ratings[i % ratings.length],
    reviews: reviewCounts[i % reviewCounts.length],
    description: desc,
    features: buildFeatures(desc),
    inStock: true,
    badge: i % 3 === 0 ? "OFERTA" : undefined,
  };

  // Customizations requested by user
  if (num === 1) { // Jogo de Panelas Antiaderente
    p.image = "https://m.media-amazon.com/images/I/61Ea4XF1YXL._AC_SL1000_.jpg";
    p.images = [p.image];
  } else if (num === 3) { // Tábua de Corte em Bambu
    p.image = "https://m.media-amazon.com/images/I/71YyXo3yEaL._AC_SL1500_.jpg";
    p.images = [p.image];
  } else if (num === 22) { // Saboneteira Dispenser
    const imgRosa = "https://images.tcdn.com.br/img/img_prod/1154564/dispensador_de_parede_sabao_gel_350ml_varios_ambientes_585_1_092047333550e6833a681d4a06592233.jpg";
    const imgCinza = "https://m.media-amazon.com/images/I/41H-XU-H60L._AC_SL1000_.jpg";
    const imgBranco = "https://m.media-amazon.com/images/I/51r2K8lG-FL._AC_SL1000_.jpg";
    const imgAzul = "https://m.media-amazon.com/images/I/41P-XU-H60L._AC_SL1000_.jpg";
    
    p.image = imgRosa;
    p.images = [imgRosa, imgCinza, imgBranco, imgAzul];
    p.options = [{
      name: "Cor",
      variants: [
        { label: "Rosa", price: p.price, originalPrice: p.originalPrice, imageIndex: 0 },
        { label: "Cinza", price: p.price, originalPrice: p.originalPrice, imageIndex: 1 },
        { label: "Branco", price: p.price, originalPrice: p.originalPrice, imageIndex: 2 },
        { label: "Azul", price: p.price, originalPrice: p.originalPrice, imageIndex: 3 },
      ]
    }];
  } else if (num === 34) { // Kit Acessórios de Banheiro
    p.image = "https://m.media-amazon.com/images/I/71r9l-I-QML._AC_SL1500_.jpg";
    p.images = [p.image];
  }

  return p;
});
