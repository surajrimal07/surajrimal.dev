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
    title: 'Attention Is All You Need',
    authors: [
      'Ashish Vaswani',
      'Noam Shazeer',
      'Niki Parmar',
      'Jakob Uszkoreit',
      'Llion Jones',
      'Aidan N. Gomez',
      'Lukasz Kaiser',
      'Illia Polosukhin',
    ],
    year: 2017,
    category: 'Machine Learning',
    summary:
      'My thoughts on the revolutionary Transformer architecture and its impact on modern NLP.',
    conference: 'NeurIPS',
    image: '/static/images/papers/transformer.webp',
    readingDate: '2024-03-15',
    content:
      'The 2017 paper Attention Is All You Need by Vaswani et al. introduced the Transformer architecture, revolutionizing the field of natural language processing (NLP) and beyond. This paper proposed a new way to handle sequence-to-sequence tasks without relying on traditional recurrent or convolutional networks, instead utilizing a mechanism called self-attention. The central idea of the Transformer is to allow the model to weigh the importance of different parts of the input sequence when producing outputs. By doing so, it overcomes the limitations of recurrent networks, such as sequential dependencies and vanishing gradients, offering a more efficient and scalable approach. The self-attention mechanism computes attention scores for every pair of words in the input sequence, enabling the model to capture long-range dependencies and contextual relationships more effectively. This approach is implemented through multi-head attention, where multiple attention mechanisms operate in parallel, capturing diverse aspects of the input data. Combined with positional encoding to retain order information, the Transformer achieves unparalleled performance in capturing linguistic nuances. Another key innovation in the paper is the encoder-decoder structure, where the encoder processes the input sequence and generates a contextual representation, while the decoder uses this representation to produce the output sequence, often word by word. This design facilitates efficient parallelization, making training faster compared to recurrent architectures. Furthermore, the introduction of scaled dot-product attention and layer normalization improved the stability and performance of the model. The paper also proposed techniques like residual connections and feedforward layers to enhance learning capabilities. The Transformer was evaluated on machine translation tasks, achieving state-of-the-art results on benchmarks like WMT 2014 English-to-German and English-to-French datasets. It outperformed existing models like recurrent neural networks (RNNs) and long short-term memory (LSTM) networks while requiring less computational time due to its parallelizable architecture. Its impact has been profound, with the model becoming the foundation for subsequent breakthroughs, including BERT, GPT, and many other NLP advancements. These models have been applied to a wide range of tasks, such as sentiment analysis, summarization, and question answering, demonstrating the Transformer’s versatility. The paper’s influence extends beyond NLP, as the architecture has been adapted for image processing, speech recognition, and even protein structure prediction. Reflecting on its significance, Attention Is All You Need not only introduced a powerful tool for machine learning but also reshaped our understanding of how attention mechanisms can serve as a universal framework for learning complex relationships in data. Its emphasis on scalability, efficiency, and performance has made it a cornerstone in the evolution of AI, inspiring countless research directions and practical applications.',
    doi: '10.48550/arXiv.1706.03762',
    keywords: [
      'Attention Mechanism',
      'Neural Networks',
      'NLP',
      'Sequence Modeling',
    ],
  },
  {
    id: 2,
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren'],
    year: 2015,
    category: 'Computer Vision',
    summary:
      'My perspective on how ResNet changed deep learning by solving the vanishing gradient problem.',
    conference: 'CVPR',
    image: '/static/images/papers/resnet.webp',
    readingDate: '2024-02-20',
    content:
      'The paper Deep Residual Learning for Image Recognition, published in 2015 by Kaiming He and colleagues, introduced the revolutionary ResNet architecture, which transformed deep learning by addressing the vanishing gradient problem in neural networks. The core innovation of ResNet is the introduction of residual connections, which allow information to bypass intermediate layers, enabling the training of very deep networks with hundreds or even thousands of layers. Prior to ResNet, deep networks suffered from degradation problems, where increasing the depth resulted in higher training errors due to difficulties in optimization. ResNet solved this by reformulating the learning objective so that each layer learns residual mappings instead of the full transformation. This approach made it significantly easier for networks to optimize and converge effectively, even as depth increased. The architecture utilizes skip connections that directly connect earlier layers to later ones, effectively mitigating the loss of information as data propagates through the network. This mechanism not only preserved gradient flow during backpropagation but also encouraged the network to learn identity mappings when deeper layers were unnecessary, leading to better generalization and reduced overfitting. ResNet’s modular design is built on stacking residual blocks, which are lightweight and computationally efficient, making the network both scalable and versatile. The researchers validated their approach by achieving groundbreaking results on benchmark datasets like ImageNet, where ResNet achieved state-of-the-art accuracy with significantly deeper networks compared to previous models. Another notable achievement was ResNet’s success in the ImageNet Large Scale Visual Recognition Challenge (ILSVRC) 2015, where it won first place in multiple categories. The architecture outperformed all competitors by a large margin, demonstrating its ability to generalize across tasks and datasets. ResNet’s influence extends beyond its immediate impact on image classification. The architecture has become a foundational building block for many other deep learning models in diverse domains, including object detection, semantic segmentation, and video analysis. Its principles have also inspired innovations in natural language processing, speech recognition, and reinforcement learning, showcasing its adaptability across modalities. Reflecting on its impact, ResNet fundamentally changed the trajectory of deep learning research by proving that deeper networks could achieve better performance when designed with proper optimization strategies. The idea of residual learning became a standard technique in neural network architecture design, cementing ResNet as a milestone in the history of artificial intelligence. Its practical applications are vast, from autonomous vehicles to medical imaging, solidifying its legacy as a pivotal contribution to modern AI development.',
  },
  {
    id: 4,
    title: 'Support-Vector Networks',
    authors: ['Corinna Cortes', 'Vladimir Vapnik'],
    year: 1995,
    category: 'Machine Learning',

    summary:
      'This paper introduced Support Vector Machines (SVM), a foundational algorithm in machine learning for classification and regression tasks. It presented a novel way to find the optimal separating hyperplane between data points in high-dimensional space.',
    conference: 'Machine Learning Journal',
    image: '/static/images/papers/support-vector.png',
    readingDate: '2024-02-25',
    content:
      'The 1995 paper Support-Vector Networks by Corinna Cortes and Vladimir Vapnik is widely regarded as one of the foundational works in modern machine learning. It introduced the concept of Support Vector Machines (SVM), an algorithm designed for classification and regression tasks, rooted in the principles of statistical learning theory. This paper marked a turning point in machine learning, laying a solid theoretical and practical foundation for supervised learning techniques. At its core, the paper describes a method to find the optimal hyperplane that separates classes of data in a high-dimensional space. The main goal is to maximize the margin, which is the distance between the hyperplane and the closest data points from each class. These critical data points are referred to as support vectors, as they define the decision boundary. By focusing only on the support vectors, SVM achieves computational efficiency and robust generalization, making it particularly effective for tasks with limited but high-dimensional datasets. A groundbreaking aspect of the paper was the introduction of the kernel trick. This mathematical technique allows SVM to work in higher-dimensional feature spaces without explicitly computing the transformations. Kernels, such as the polynomial kernel and the radial basis function (RBF), enable the algorithm to handle non-linear decision boundaries by implicitly mapping the data into a higher-dimensional space where a linear hyperplane can separate the classes. This innovation made SVM a versatile and powerful tool for a wide range of applications, from text classification to image recognition. Another significant contribution was the concept of soft margins, which introduced slack variables to allow some degree of misclassification. This approach accommodates datasets that are not perfectly separable, striking a balance between maximizing the margin and minimizing classification errors. The flexibility provided by the regularization parameter (C) allows practitioners to fine-tune the model based on the specific characteristics of their data. The impact of the Support-Vector Networks paper extends far beyond its theoretical contributions. SVM quickly gained traction as a go-to method for binary classification problems, particularly in scenarios where data is small and features are numerous. It has been successfully applied in diverse domains, including handwriting recognition, gene expression analysis, and even financial modeling. Reflecting on its importance, the paper highlights the power of combining mathematical rigor with practical insights. The use of convex optimization ensures that the SVM algorithm converges to a global minimum, providing reliable and interpretable results. Its emphasis on maximizing generalization rather than merely fitting the training data has made it a cornerstone in machine learning education and practice. In my own experience, SVM has been invaluable for tasks requiring robust and interpretable models. While the advent of deep learning has shifted attention towards neural networks, SVM remains a benchmark for classical machine learning techniques. It excels in scenarios where interpretability, computational efficiency, and performance on smaller datasets are critical. The principles established by Cortes and Vapnik continue to inspire advancements in machine learning, underscoring the enduring relevance of this seminal work.',
  },

  {
    id: 3,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: ['Jacob Devlin', 'Ming-Wei Chang'],
    year: 2018,
    category: 'Natural Language Processing',
    summary:
      'Reflecting on how BERT changed my approach to NLP tasks and transfer learning.',
    conference: 'NAACL',
    image: '/static/images/papers/bert.png',
    readingDate: '2024-01-10',
    content:
      'The paper BERT: Pre-training of Deep Bidirectional Transformers, introduced by Jacob Devlin and colleagues in 2018, revolutionized natural language processing (NLP) by presenting a new approach to pre-training language models. BERT, short for Bidirectional Encoder Representations from Transformers, is built on the Transformer architecture, enabling it to capture context from both directions—left-to-right and right-to-left—unlike earlier models that processed text unidirectionally. This bidirectional context understanding allowed BERT to generate more nuanced representations of words and sentences, improving performance across a wide range of NLP tasks. The pre-training process employed two novel objectives: masked language modeling (MLM), where random words in a sentence are masked, and the model learns to predict them based on context, and next sentence prediction (NSP), which trains the model to understand relationships between sentence pairs. These objectives helped BERT grasp both word-level and sentence-level semantics, making it highly effective in understanding complex language structures. BERT’s pre-training was conducted on vast corpora, including Wikipedia and BooksCorpus, resulting in a deeply rich linguistic understanding that could be fine-tuned for specific downstream tasks such as question answering, sentiment analysis, and named entity recognition. The model demonstrated state-of-the-art performance across multiple benchmarks, including the General Language Understanding Evaluation (GLUE) tasks and the Stanford Question Answering Dataset (SQuAD), setting a new standard in the field. Its pre-trained representations allowed researchers and practitioners to achieve impressive results with minimal task-specific training, greatly reducing the computational cost and data requirements for developing NLP models. BERT’s release also marked a significant shift toward transfer learning in NLP, inspiring a wave of subsequent models like RoBERTa, DistilBERT, and ALBERT, which further refined and extended its concepts. Today, BERT remains a cornerstone in NLP, powering applications ranging from search engines to virtual assistants, and its introduction is widely regarded as a pivotal moment in the evolution of AI.',
  },
];
