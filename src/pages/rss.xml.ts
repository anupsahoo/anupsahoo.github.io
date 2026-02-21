import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'Beyond Models — by Anup Sahoo',
    description: 'Enterprise AI architecture, landscape mapping, governance patterns, and implementation playbooks.',
    site: context.site!.toString(),
    items: [
      {
        title: 'The Enterprise LLM Landscape: A Decision Framework',
        description: 'A structured approach to evaluating and selecting large language models for enterprise use cases.',
        link: '/ai-landscape/enterprise-llm-landscape',
        pubDate: new Date('2025-01-15'),
      },
      {
        title: 'RAG Architecture Patterns for Production Systems',
        description: 'Retrieval-augmented generation patterns that work at scale — from naive RAG to advanced multi-step retrieval.',
        link: '/ai-landscape/rag-architecture-patterns',
        pubDate: new Date('2025-01-10'),
      },
      {
        title: 'Designing a Production RAG Architecture',
        description: 'End-to-end architecture for retrieval-augmented generation systems that handle enterprise-scale document collections.',
        link: '/architecture/production-rag-architecture',
        pubDate: new Date('2025-01-05'),
      },
      {
        title: 'The LLM Gateway Pattern: Centralizing Model Access',
        description: 'How to build a centralized gateway for managing LLM access, cost tracking, rate limiting, and fallback routing.',
        link: '/architecture/llm-gateway-pattern',
        pubDate: new Date('2025-01-01'),
      },
      {
        title: 'Building an LLM Evaluation Framework',
        description: 'A practical guide to evaluating LLM outputs systematically — from automated metrics to human evaluation protocols.',
        link: '/playbooks/llm-evaluation-framework',
        pubDate: new Date('2024-12-20'),
      },
    ],
    customData: '<language>en-us</language>',
  });
}
