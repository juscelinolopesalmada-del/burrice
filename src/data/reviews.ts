// Realistic review pool — 10 reviews assigned deterministically to every product
export interface Review {
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  recommends: boolean;
  reply?: string;
  photos?: string[];
}

const STORE_REPLY =
  "Agradecemos sua avaliação. Estamos felizes por saber que você teve uma boa experiência. Sua satisfação é muito importante para nós. Muito Obrigada.";

const POOL: Review[] = [
  { name: "Ana Paula", date: "12/10/2025", rating: 5, title: "Ótima qualidade", text: "Produto chegou rapidíssimo e veio muito bem embalado. A qualidade superou minhas expectativas, recomendo demais!", recommends: true, reply: STORE_REPLY },
  { name: "Carlos Henrique", date: "08/10/2025", rating: 5, title: "Vale cada centavo", text: "Excelente custo-benefício. Comprei com receio mas vale cada centavo. Já é a segunda vez que compro aqui.", recommends: true, reply: STORE_REPLY },
  { name: "Mariana Souza", date: "02/10/2025", rating: 4, title: "Atende bem", text: "Gostei bastante, atende perfeitamente o que promete. O acabamento é bonito e o material parece resistente.", recommends: true },
  { name: "Juliana Martins", date: "27/09/2025", rating: 5, title: "Lindo e prático", text: "Lindo, prático e exatamente como na foto. Atendimento da loja também foi impecável, tirei várias dúvidas no chat.", recommends: true, reply: STORE_REPLY },
  { name: "Roberto Lima", date: "21/09/2025", rating: 5, title: "Design moderno", text: "Cheguei em casa e já usei. Funciona perfeitamente, fácil de limpar e tem um design moderno que combinou com tudo.", recommends: true },
  { name: "Patrícia Almeida", date: "15/09/2025", rating: 4, title: "Bom pelo preço", text: "Bom produto pelo preço. Entrega foi mais rápida do que o prazo. Pequenos detalhes de acabamento poderiam melhorar.", recommends: true },
  { name: "Fernanda Ribeiro", date: "10/09/2025", rating: 5, title: "Presente perfeito", text: "Comprei para presente e a pessoa amou. Veio em embalagem caprichada, dava até para entregar direto sem trocar.", recommends: true, reply: STORE_REPLY },
  { name: "Lucas Pereira", date: "05/09/2025", rating: 5, title: "Top demais", text: "Top demais. Não esperava tanta qualidade nessa faixa de preço. Compraria de novo sem pensar duas vezes.", recommends: true },
  { name: "Beatriz Cardoso", date: "29/08/2025", rating: 5, title: "Resolveu meu problema", text: "Resolveu meu problema! Estou usando todos os dias. Muito feliz com a compra, recomendo de olhos fechados.", recommends: true, reply: STORE_REPLY },
  { name: "Gabriel Nunes", date: "22/08/2025", rating: 4, title: "Recomendo a loja", text: "Atendeu o que eu precisava. Material de boa qualidade e chegou no prazo combinado. Recomendo a loja.", recommends: true },
  { name: "Letícia Barbosa", date: "17/08/2025", rating: 5, title: "Apaixonada!", text: "Apaixonada! Combinou perfeitamente com minha casa. Já indiquei para minha mãe e minha irmã, ambas compraram também.", recommends: true, reply: STORE_REPLY },
  { name: "Rafael Costa", date: "11/08/2025", rating: 5, title: "Loja confiável", text: "Produto de altíssima qualidade, muito superior ao que eu tinha visto em outras lojas. Loja confiável, virei cliente.", recommends: true },
  { name: "Amanda Ferreira", date: "04/08/2025", rating: 4, title: "Bonito e funcional", text: "Muito bonito e funcional. Demorou um pouquinho a mais para chegar mas valeu a espera. Recomendo.", recommends: true },
  { name: "Thiago Mendes", date: "28/07/2025", rating: 5, title: "Sensacional!", text: "Sensacional! Uso diariamente e está perfeito. Acabamento impecável e fácil de usar. Nota mil!", recommends: true, reply: STORE_REPLY },
  { name: "Camila Rocha", date: "20/07/2025", rating: 5, title: "Casa mais organizada", text: "Adorei! Exatamente como descrito no anúncio. Minha casa ficou muito mais organizada e bonita depois disso.", recommends: true },
];

// Per-product custom reviews (with real product photos sent by customers)
const CUSTOM_REVIEWS: Record<string, Review[]> = {
  // Kit Caixa do Mês Bambu
  "13": [
    { name: "Ana Paula Ribeiro", date: "12/10/2025", rating: 5, title: "Minha cozinha virou outra!", text: "Chegou super rápido e veio tudo certinho. Montei a mesa para o café da manhã do domingo e ficou parecendo de revista! O bambu é lindo, sofisticado, vale demais cada centavo.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/c7b00c1b62819f76db58fc17890902d3.webp?v=1773580328"] },
    { name: "Juliana Martins", date: "05/10/2025", rating: 5, title: "Apaixonada pelo kit", text: "Comprei a versão completa e amei. As 10 peças são lindíssimas, o acabamento do bambu é perfeito. Já usei para receber visitas e todo mundo elogiou.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/b4b78d0097dd812f25562e56785d6025.webp?v=1773580187"] },
    { name: "Carla Mendes", date: "28/09/2025", rating: 5, title: "Presente perfeito", text: "Comprei para presentear minha mãe e ela ficou encantada. A boleira giratória e a manteigueira são lindas. Embalagem caprichada, dava para entregar direto.", recommends: true, reply: STORE_REPLY },
    { name: "Fernanda Costa", date: "20/09/2025", rating: 5, title: "Vale cada centavo", text: "Cheguei a desconfiar do preço mas o kit é excelente. As canecas com alça de bambu são meu xodó. Recomendo de olhos fechados.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/e99675b7e0402b90e661870df615da9d.webp?v=1773580187"] },
    { name: "Patrícia Almeida", date: "11/09/2025", rating: 5, title: "Lindo demais", text: "Material premium, design impecável. A garrafa térmica mantém a água gelada o dia todo. Já é minha terceira compra na loja.", recommends: true, reply: STORE_REPLY },
    { name: "Roberta Lima", date: "02/09/2025", rating: 4, title: "Muito bom", text: "Produto excelente, só achei a entrega um pouquinho demorada. Mas o kit em si é maravilhoso, recomendo.", recommends: true },
    { name: "Beatriz Cardoso", date: "25/08/2025", rating: 5, title: "Cozinha de revista", text: "Não acreditei quando montei tudo. Parece foto de Pinterest! Os potes são lindos e o porta frios deixa a mesa sofisticada.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/05bb8f9c7aa408a9939935dfcf7f3223.webp?v=1773580188"] },
    { name: "Letícia Barbosa", date: "17/08/2025", rating: 5, title: "Recomendo demais", text: "Atendimento da loja foi top, tirei várias dúvidas no chat e responderam super rápido. Produto chegou antes do prazo.", recommends: true, reply: STORE_REPLY },
    { name: "Camila Rocha", date: "10/08/2025", rating: 5, title: "Surpreendeu", text: "Surpreendeu em tudo. Qualidade muito acima do esperado, acabamento sem nenhum defeito. Voltarei a comprar.", recommends: true },
    { name: "Mariana Souza", date: "01/08/2025", rating: 5, title: "Maravilhoso", text: "Comprei para usar na minha casa nova. Combinou perfeitamente com a decoração. A bandeja redonda com pé é o destaque.", recommends: true, reply: STORE_REPLY },
  ],

  // Sapateira Organizadora Compacta
  "14": [
    { name: "Juliana Martins", date: "10/10/2025", rating: 5, title: "Cabe muito mais do que parece", text: "Comprei para o corredor do quarto e cabe MUITO sapato. O design é lindo, super discreto. Qualidade excelente.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/Organiza_o_estilo_em_um_so_lugar.jpg?v=1769911628", "https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG3.png?v=1769911628"] },
    { name: "Patrícia Almeida", date: "03/10/2025", rating: 5, title: "Resolveu meu problema", text: "Eu tinha sapato pelo chão todo. Agora está tudo organizado e o quarto ficou outro. Montagem foi tranquila, em meia hora estava pronta.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG2.png?v=1769911628"] },
    { name: "Fernanda Ribeiro", date: "27/09/2025", rating: 5, title: "Linda e funcional", text: "Caprichada no acabamento, muito mais bonita do que eu imaginava. Minha sogra viu e já quer comprar uma também.", recommends: true, reply: STORE_REPLY },
    { name: "Carla Souza", date: "19/09/2025", rating: 4, title: "Boa qualidade", text: "Material resistente, parece que vai durar bastante. Só ajustei o tempo de montagem porque vem sem instrução clara, mas é simples.", recommends: true },
    { name: "Beatriz Lima", date: "12/09/2025", rating: 5, title: "Compraria de novo", text: "Tô amando! Cabem 18 pares no meu modelo. Discreta, elegante e prática. Recomendo.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/SAPATEIRA_IMG1.png?v=1769911628"] },
    { name: "Mariana Costa", date: "04/09/2025", rating: 5, title: "Perfeita", text: "Exatamente como na foto. Chegou bem embalada, sem nenhum amassado. Loja confiável.", recommends: true, reply: STORE_REPLY },
    { name: "Larissa Santos", date: "26/08/2025", rating: 5, title: "Ótimo custo benefício", text: "Pela qualidade que entrega, o preço está ótimo. Já recomendei para 3 amigas.", recommends: true },
    { name: "Roberta Mendes", date: "18/08/2025", rating: 4, title: "Atende bem", text: "Atende perfeitamente o que promete. Entrega rápida, dentro do prazo combinado.", recommends: true },
    { name: "Camila Pereira", date: "10/08/2025", rating: 5, title: "Adorei", text: "Adorei! Estrutura firme, parece bem reforçada. Para o preço está ótima.", recommends: true, reply: STORE_REPLY },
    { name: "Aline Rocha", date: "02/08/2025", rating: 5, title: "Recomendo", text: "Solução perfeita para apartamento pequeno. Cabe atrás da porta sem atrapalhar.", recommends: true },
  ],

  // Panela de Pressão Pedra Sabão
  "15": [
    { name: "Fernanda Costa", date: "11/10/2025", rating: 5, title: "Comida com outro sabor!", text: "Sério, o feijão na pedra sabão tem outro sabor. Cozinha super rápido e mantém quentinho por horas. Estou apaixonada.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/1764601918692db03e74ed8-656818402b3c03458017647699720402-1024-1024.webp?v=1773571466"] },
    { name: "Marcia Oliveira", date: "04/10/2025", rating: 5, title: "Vale cada centavo", text: "Demorei para comprar com receio do peso, mas é uma maravilha. Resistente, segura e o sabor da comida é incomparável.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/1764601913692db0398f578-921ae76ad1613b240217647699703426-1024-1024.webp?v=1773571466"] },
    { name: "Sandra Pereira", date: "27/09/2025", rating: 5, title: "Minha sogra adorou", text: "Comprei para minha sogra de presente. Ela amou! Disse que o gosto da carne ficou igual ao da fazenda dela.", recommends: true, reply: STORE_REPLY },
    { name: "Lucia Martins", date: "20/09/2025", rating: 5, title: "Saudável e prática", text: "Sem teflon, sem químicos, libera ferro no cozimento. Para quem é anêmica como eu, é uma bênção.", recommends: true },
    { name: "Roberto Lima", date: "13/09/2025", rating: 4, title: "Boa, pesa um pouco", text: "Cozinha rápido e a comida fica deliciosa. Só pesa um pouco mais que panela comum, mas vale pelo benefício.", recommends: true },
    { name: "Vanessa Silva", date: "05/09/2025", rating: 5, title: "Compraria 10x", text: "Já uso há 1 mês e estou encantada. Acompanhou manual de cura impresso, super fácil de seguir.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0706/9145/5148/files/WhatsApp-Image-2026-03-06-at-13.27.49.jpg?v=1773571400"] },
    { name: "Cristina Alves", date: "28/08/2025", rating: 5, title: "Maravilhosa", text: "11 litros é perfeito para família grande. Faço feijão para a semana toda em uma cozinhada só.", recommends: true },
    { name: "Patricia Gomes", date: "20/08/2025", rating: 5, title: "Muito boa", text: "Embalagem reforçada, chegou sem nenhum risco. Brinde especial veio também, atendimento nota 10.", recommends: true, reply: STORE_REPLY },
    { name: "Helena Castro", date: "12/08/2025", rating: 4, title: "Atende bem", text: "Atende muito bem. Para quem nunca usou pedra sabão, vale ler o manual antes do primeiro uso.", recommends: true },
    { name: "Amanda Ferreira", date: "04/08/2025", rating: 5, title: "Recomendo demais", text: "Recomendo demais. Comida fica gostosa, cozinha rápido e ainda é mais saudável que panela comum.", recommends: true },
  ],

  // Globo Terrestre Luminoso
  "16": [
    { name: "Roberto Lima", date: "10/10/2025", rating: 5, title: "Lindíssimo!", text: "Coloquei no escritório e ficou um charme. À noite acende com uma luz suave que dá um clima incrível na sala.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_119_Globo-Terrestre-Luminoso-345-CM-1.png?v=1776054334"] },
    { name: "Camila Pereira", date: "03/10/2025", rating: 5, title: "Decoração impecável", text: "Comprei para o quarto do meu filho que adora geografia. Ficou lindo e ele adorou. Funciona perfeitamente.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_109_Globo-Terrestre-Luminoso-345-CM-2.png?v=1776054335"] },
    { name: "Lucas Pereira", date: "26/09/2025", rating: 5, title: "Presente top", text: "Presenteei um amigo professor. Ele amou. Embalagem caprichada, chegou rápido e sem avarias.", recommends: true, reply: STORE_REPLY },
    { name: "Fernanda Souza", date: "18/09/2025", rating: 5, title: "Mais bonito ao vivo", text: "É ainda mais bonito do que nas fotos. A bateria recarregável dura várias horas, super prático.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/imageye___-_imgi_152_Globo-Terrestre-Luminoso-345-CM-5.png?v=1776054334"] },
    { name: "Marcelo Costa", date: "10/09/2025", rating: 4, title: "Lindo", text: "Lindo, atende bem. Os idiomas do globo são inglês e chinês conforme descrito, o que pode incomodar quem queria em português.", recommends: true },
    { name: "Jessica Lima", date: "02/09/2025", rating: 5, title: "Apaixonada", text: "Peça incrível de decoração. A iluminação interna é um espetáculo, dá um ar sofisticado para qualquer ambiente.", recommends: true, reply: STORE_REPLY },
    { name: "Daniel Rocha", date: "25/08/2025", rating: 5, title: "Excelente qualidade", text: "Estrutura em aço bem firme, acrílico de qualidade. Comprei o branco e ficou um luxo na minha sala.", recommends: true },
    { name: "Aline Martins", date: "17/08/2025", rating: 5, title: "Maravilhoso", text: "Demorou um pouco para chegar mas valeu cada dia de espera. Cabo USB acompanha, só ligar e usar.", recommends: true },
    { name: "Bruno Santos", date: "09/08/2025", rating: 5, title: "Adorei", text: "Comprei o dourado e ficou estonteante no meu home office. Recebo elogios de todo mundo nas reuniões.", recommends: true, reply: STORE_REPLY },
    { name: "Larissa Mendes", date: "01/08/2025", rating: 4, title: "Bom", text: "Bom produto pelo preço. Único ponto: não acompanha controle remoto como descrito, mas é fácil de operar.", recommends: true },
  ],

  // Guarda Roupa Dobrável
  "17": [
    { name: "Patricia Gomes", date: "09/10/2025", rating: 5, title: "Salvou meu apartamento", text: "Moro em apê alugado pequeno e essa solução foi perfeita. Cabe muita roupa e protege da poeira.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/e1a6d621d936406ee758d0931d69023a_1080x_600x_1024x_13338283-1113-4e98-9611-c757e0ef3fe6.webp?v=1775877926"] },
    { name: "Vanessa Lima", date: "02/10/2025", rating: 5, title: "Fácil de montar", text: "Montei sozinha em menos de 1 hora. Estrutura firme, não balança. Estou amando.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/86297108f3c1990b9ad870fa9f050098_1080x_600x_1024x_3e8b0f99-fed3-48fc-9b4a-a04ad9cfb19f.webp?v=1775877925"] },
    { name: "Camila Souza", date: "25/09/2025", rating: 5, title: "Atende perfeitamente", text: "Para usar como guarda roupa extra ou em quarto pequeno é a solução perfeita. Recomendo.", recommends: true, reply: STORE_REPLY },
    { name: "Aline Costa", date: "17/09/2025", rating: 4, title: "Bom produto", text: "Atendeu o que eu precisava. À prova de poeira como prometido, as roupas ficam protegidas.", recommends: true },
    { name: "Mariana Silva", date: "09/09/2025", rating: 5, title: "Recomendo demais", text: "Coloquei no quarto da minha filha, ela amou que pode ver as roupas pelo zíper transparente.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/2f24740f4eb424754d2a69f19d76d152_1080x_600x_1024x_14eb6101-71d9-4db7-91cd-a8fb436b81ae.webp?v=1775877926"] },
    { name: "Renata Alves", date: "01/09/2025", rating: 5, title: "Compra certa", text: "Estava com medo de ser frágil mas a estrutura é bem reforçada. Aguenta bem o peso das roupas.", recommends: true, reply: STORE_REPLY },
    { name: "Joana Ribeiro", date: "24/08/2025", rating: 5, title: "Lindo", text: "Visual moderno, combinou super com meu quarto. Entrega chegou antes do prazo.", recommends: true },
    { name: "Bianca Mendes", date: "16/08/2025", rating: 5, title: "Maravilhoso", text: "Para o preço cobrado, é uma maravilha. Substituiu meu guarda roupa antigo perfeitamente.", recommends: true, reply: STORE_REPLY },
    { name: "Luciana Pereira", date: "08/08/2025", rating: 4, title: "Bom", text: "Bom produto, instruções poderiam ser mais claras mas no geral muito bom.", recommends: true },
    { name: "Talita Rocha", date: "31/07/2025", rating: 5, title: "Adorei", text: "Adorei! Comprei dois para organizar quarto e área de serviço. Vale muito a pena.", recommends: true },
  ],

  // TurboCorte 7 em 1
  "18": [
    { name: "Cristina Alves", date: "11/10/2025", rating: 5, title: "Mudou minha rotina", text: "Cozinho todos os dias e essa máquina economiza MUITO tempo. Cubinhos perfeitos em segundos.", recommends: true, reply: STORE_REPLY, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.54.04.jpg?v=1774586694"] },
    { name: "Marcia Lima", date: "04/10/2025", rating: 5, title: "Vale demais", text: "Sopa, salada, vinagrete, faço tudo na metade do tempo agora. Lâminas super afiadas e fáceis de limpar.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_18.58.07.jpg?v=1774586694"] },
    { name: "Sandra Costa", date: "27/09/2025", rating: 5, title: "Motor potente", text: "400W faz toda a diferença. Corta cenoura, batata, tudo sem esforço. Recomendo.", recommends: true, reply: STORE_REPLY },
    { name: "Vanessa Silva", date: "19/09/2025", rating: 5, title: "Substitui muitos utensílios", text: "Joguei fora rolar, fatiador e ralador. Essa máquina sozinha faz tudo.", recommends: true, photos: ["https://cdn.shopify.com/s/files/1/0812/0782/0545/files/WhatsApp_Image_2026-03-04_at_19.12.18.jpg?v=1774586694"] },
    { name: "Lucia Martins", date: "11/09/2025", rating: 5, title: "Apaixonada", text: "Estou apaixonada por essa máquina. Resultado profissional para qualquer prato.", recommends: true, reply: STORE_REPLY },
    { name: "Helena Castro", date: "03/09/2025", rating: 4, title: "Boa", text: "Boa máquina, atende bem. As lâminas precisam ser lavadas com cuidado por serem bem afiadas.", recommends: true },
    { name: "Amanda Ferreira", date: "26/08/2025", rating: 5, title: "Excelente", text: "Excelente custo benefício. Comprei com receio mas superou as expectativas. Garantia de 12 meses dá segurança.", recommends: true },
    { name: "Roberta Mendes", date: "18/08/2025", rating: 5, title: "Top", text: "Top demais. Marmita da semana fica pronta em 20 minutos. Mudou minha vida.", recommends: true, reply: STORE_REPLY },
    { name: "Bruna Santos", date: "10/08/2025", rating: 5, title: "Recomendo", text: "Recomendo de olhos fechados. Estrutura reforçada, parece muito durável.", recommends: true },
    { name: "Daniela Pereira", date: "02/08/2025", rating: 5, title: "Perfeita", text: "Perfeita para quem cozinha pra família grande. Saladas e refogados ficam padronizados, lindos.", recommends: true, reply: STORE_REPLY },
  ],

};

export function getReviewsForProduct(productId: string): Review[] {
  if (CUSTOM_REVIEWS[productId]) return CUSTOM_REVIEWS[productId];
  let seed = 0;
  for (let i = 0; i < productId.length; i++) seed = (seed * 31 + productId.charCodeAt(i)) >>> 0;
  const reviews: Review[] = [];
  const used = new Set<number>();
  while (reviews.length < 10) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const idx = seed % POOL.length;
    if (!used.has(idx)) {
      used.add(idx);
      reviews.push(POOL[idx]);
    }
  }
  return reviews;
}

export function getReviewStats(reviews: Review[]) {
  const total = reviews.length;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / total;
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const recommendPct = Math.round((reviews.filter((r) => r.recommends).length / total) * 100);
  return { total, avg, dist, recommendPct };
}
