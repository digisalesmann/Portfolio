export const ARTICLES = [
  {
    slug: "federated-learning",
    title: "Federated Learning: Privacy-first Machine Learning at Scale",
    subtitle:
      "A practical guide to decentralized model training, how it works, and when to use it.",
    author: {
      name: "Victor Ekele",
      avatar: "/avatars/victor.jpg",
      role: "ML Engineer & Full-stack Dev",
    },
    publishedAt: "2025-09-20",
    readMinutes: 9,
    cover: "/images/federated-cover.jpg",
    tags: ["AI", "ML", "Privacy", "Edge"],
    sections: [
      {
        id: "intro",
        heading: "Introduction",
        content: [
          `Federated Learning is an approach that trains models across many decentralized edge devices or servers 
          holding local data samples, without exchanging them. Instead, model updates are aggregated centrally.`,
        ],
      },
      {
        id: "how-it-works",
        heading: "How Federated Learning Works",
        content: [
          `Devices download the current global model, train locally on private data, and send model updates (gradients / weights) back.`,
          `A central aggregator performs secure aggregation and updates the global model.`,
        ],
        image: "/images/federated-diagram.png",
      },
      {
        id: "privacy",
        heading: "Privacy & Security Considerations",
        content: [
          `Differential privacy and secure aggregation are common techniques to reduce leakage from model updates.`,
        ],
      },
      {
        id: "when-to-use",
        heading: "When to Use Federated Learning",
        content: [
          `Excellent for privacy-sensitive domains like healthcare or mobile keyboards, but consider communication costs.`,
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion & Next Steps",
        content: [
          `Federated Learning extends ML to privacy-first contexts — pairing it with edge compute and careful orchestration is key.`,
        ],
      },
    ],
  },
  {
    slug: "edge-ml-guide",
    title: "Edge ML: Deploying Models on the Edge",
    subtitle:
      "A comprehensive guide on deploying machine learning models directly on devices, from smartphones to IoT.",
    author: {
      name: "Victor Ekele",
      avatar: "/avatars/victor.jpg",
      role: "ML Engineer & Full-stack Dev",
    },
    publishedAt: "2025-08-15",
    readMinutes: 12,
    cover: "/images/edge-ml-cover.jpg",
    tags: ["IoT", "ML", "Deployment"],
    sections: [
      {
        id: "intro",
        heading: "What is Edge ML?",
        content: [
          `Edge ML involves running machine learning inference on the device itself, rather than in the cloud. This reduces latency, saves bandwidth, and improves data privacy.`,
          `This approach is crucial for real-time applications like autonomous vehicles, facial recognition on smartphones, and industrial IoT.`,
        ],
      },
      {
        id: "benefits",
        heading: "Key Benefits of Edge ML",
        content: [
          `Low Latency: Decisions are made instantly on the device, without a round trip to a server.`,
          `Privacy and Security: Raw data never leaves the device, which is vital for sensitive information.`,
          `Offline Capability: Models can function even without an internet connection.`,
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        content: [
          `Edge ML is a rapidly growing field that brings the power of AI to the physical world, enabling a new generation of smart, responsive applications.`,
        ],
      },
    ],
  },
  {
    slug: "privacy-ml-patterns",
    title: "Privacy-preserving ML Patterns",
    subtitle: "Explore techniques like differential privacy and homomorphic encryption to train models on sensitive data.",
    author: {
      name: "Victor Ekele",
      avatar: "/avatars/victor.jpg",
      role: "ML Engineer & Full-stack Dev",
    },
    publishedAt: "2025-07-01",
    readMinutes: 7,
    cover: "/images/privacy-ml-cover.jpg",
    tags: ["Privacy", "Security", "Crypto", "ML"],
    sections: [
      {
        id: "intro",
        heading: "The Challenge of Data Privacy",
        content: [
          `As AI models become more data-hungry, ensuring the privacy of user information is a critical concern. Traditional methods of data collection are no longer sufficient.`,
        ],
      },
      {
        id: "techniques",
        heading: "Common Techniques",
        content: [
          `Differential Privacy: Adds a small amount of "noise" to data to protect individual records while preserving aggregate trends.`,
          `Homomorphic Encryption: Allows computations to be performed on encrypted data without decrypting it first.`,
        ],
      },
    ],
  },
];