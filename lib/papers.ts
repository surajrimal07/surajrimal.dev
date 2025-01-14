export interface Paper {
  id: number;
  title: string;
  authors: string[];
  year: number;
  category: string;
  summary: string;
  conference: string;
  image: string;
  content?: string;
  readingDate?: string;
  doi?: string;
  keywords?: string[];
}

export const papers: Paper[] = [
  {
    id: 1,
    title: "Attention Is All You Need",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Lukasz Kaiser", "Illia Polosukhin"],
    year: 2017,
    category: "Machine Learning",
    summary: "My thoughts on the revolutionary Transformer architecture and its impact on modern NLP.",
    conference: "NeurIPS",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&q=80&w=800",
    readingDate: "2024-03-15",
    content: "The Transformer architecture introduced in this paper has completely changed how we approach natural language processing. What fascinates me most is its elegant simplicity - replacing complex recurrent structures with attention mechanisms.\n\nIn my experience working with various NLP models, I've found that Transformers are not just more efficient to train, but they also capture long-range dependencies in text much better than previous approaches. The multi-head attention mechanism is particularly brilliant, allowing the model to focus on different aspects of the input simultaneously.\n\nOne aspect that doesn't get discussed enough is how this architecture has enabled transfer learning in NLP. The ability to pre-train on massive amounts of text and fine-tune for specific tasks has democratized NLP, making it accessible to more developers and researchers.\n\nWhile the paper focuses on machine translation, I believe the most significant impact has been in language understanding tasks. The success of models like BERT and GPT, which build upon this architecture, proves the versatility of the approach.",
    doi: "10.48550/arXiv.1706.03762",
    keywords: ["Attention Mechanism", "Neural Networks", "NLP", "Sequence Modeling"],
  },
  {
    id: 2,
    title: "Deep Residual Learning for Image Recognition",
    authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren"],
    year: 2015,
    category: "Computer Vision",
    summary: "My perspective on how ResNet changed deep learning by solving the vanishing gradient problem.",
    conference: "CVPR",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    readingDate: "2024-02-20",
    content: "ResNet's introduction of skip connections seems obvious in hindsight, but it was a breakthrough moment in deep learning. Having worked with neural networks before and after ResNet, I can attest to how this simple idea transformed our ability to train very deep networks.\n\nWhat I find most interesting is how this architectural change challenged our assumptions about network depth. Before ResNet, we thought that adding more layers would eventually hurt performance. The residual learning framework showed us that deeper networks can work better, as long as we give them the right structure.\n\nIn my projects, I've found that ResNet-style skip connections have become a standard tool, not just in computer vision but across many deep learning applications. They're like the goto pattern when you need to ensure gradient flow in deep networks.",
  },
  {
    id: 3,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: ["Jacob Devlin", "Ming-Wei Chang"],
    year: 2018,
    category: "Natural Language Processing",
    summary: "Reflecting on how BERT changed my approach to NLP tasks and transfer learning.",
    conference: "NAACL",
    image: "https://images.unsplash.com/photo-1664447972779-316251bd8bd7?auto=format&fit=crop&q=80&w=800",
    readingDate: "2024-01-10",
    content: "BERT's impact on NLP cannot be overstated. What strikes me most is how it changed our fundamental approach to language understanding tasks. The bidirectional nature of BERT, combined with its clever pre-training objectives, created a more nuanced understanding of context than previous models.\n\nIn my work with BERT, I've been consistently impressed by its transfer learning capabilities. The ability to fine-tune a pre-trained model for specific tasks with relatively small amounts of data has made sophisticated NLP accessible to smaller teams and projects.\n\nOne aspect I particularly appreciate is the masked language modeling objective. It's a more natural way to train language models compared to traditional left-to-right approaches, leading to better feature representations.",
  },
];