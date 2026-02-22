#!/usr/bin/env node
/**
 * Article generator v2 for Beyond Models.
 * Generates .astro articles with rich, storytelling-style content
 * in simple English for an Indian audience. 500-600 words per article.
 */

const fs = require('fs');
const path = require('path');
const { topics } = require('./content-plan.cjs');
const { buildPublishSchedule } = require('./utils/dates.cjs');

const PAGES_DIR = path.resolve(__dirname, '..', 'src', 'pages');

// ── Deterministic seeded random ──────────────────────────
// We use slug-based seeding so content is reproducible
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededPick(arr, seed) {
  return arr[seed % arr.length];
}

function seededPickN(arr, n, seed) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed + i * 31) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

function toPascalCase(str) {
  return str.replace(/[_\s-]+/g, ' ').split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toSnakeCase(str) {
  return str.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '');
}

// ── Natural language helpers ─────────────────────────────

// Returns [displayName, inlineName] for a tag.
// displayName: for headings (e.g. "AI Agents")
// inlineName: for mid-sentence use (e.g. "AI agents")
function naturalRef(tag) {
  const lower = tag.toLowerCase();
  // [display (heading), inline (body)]
  const map = {
    'agents': ['AI Agents', 'AI agents'], 'llms': ['Large Language Models', 'large language models'],
    'rag': ['RAG Systems', 'RAG systems'], 'slms': ['Small Language Models', 'small language models'],
    'mlops': ['MLOps', 'MLOps'], 'inference': ['AI Inference', 'AI inference'],
    'embeddings': ['Embedding Models', 'embedding models'], 'safety': ['AI Safety', 'AI safety'],
    'guardrails': ['AI Guardrails', 'AI guardrails'], 'orchestration': ['AI Orchestration', 'AI orchestration'],
    'frameworks': ['AI Frameworks', 'AI frameworks'], 'multimodal': ['Multimodal AI', 'multimodal AI'],
    'vector databases': ['Vector Databases', 'vector databases'], 'fine-tuning': ['Model Fine-Tuning', 'model fine-tuning'],
    'training': ['Model Training', 'model training'], 'evaluation': ['AI Evaluation', 'AI evaluation'],
    'compliance': ['AI Compliance', 'AI compliance'], 'security': ['AI Security', 'AI security'],
    'monitoring': ['AI Monitoring', 'AI monitoring'], 'testing': ['AI Testing', 'AI testing'],
    'deployment': ['Model Deployment', 'model deployment'], 'caching': ['AI Caching', 'AI caching'],
    'search': ['AI-Powered Search', 'AI-powered search'], 'prompts': ['Prompt Engineering', 'prompt engineering'],
    'infrastructure': ['AI Infrastructure', 'AI infrastructure'], 'cost': ['AI Cost Management', 'AI cost management'],
    'automation': ['AI Automation', 'AI automation'], 'pipelines': ['AI Pipelines', 'AI pipelines'],
    'observability': ['AI Observability', 'AI observability'], 'governance': ['AI Governance', 'AI governance'],
    'ethics': ['AI Ethics', 'AI ethics'], 'privacy': ['Data Privacy', 'data privacy'],
    'feedback loops': ['Feedback Loops', 'feedback loops'], 'streaming': ['Response Streaming', 'response streaming'],
    'platform': ['AI Platforms', 'AI platforms'], 'multi-tenant': ['Multi-Tenant AI', 'multi-tenant AI'],
    'api design': ['AI API Design', 'AI API design'], 'system design': ['AI System Design', 'AI system design'],
    'enterprise': ['Enterprise AI', 'enterprise AI'], 'cloud': ['Cloud AI', 'cloud AI'],
    'hardware': ['AI Hardware', 'AI hardware'], 'optimization': ['AI Optimization', 'AI optimization'],
    'deep learning': ['Deep Learning', 'deep learning'], 'transformers': ['Transformer Models', 'transformer models'],
    'nlp': ['Natural Language Processing', 'natural language processing'],
    'python': ['Python for AI', 'Python skills for AI'], 'kubernetes': ['Kubernetes for AI', 'Kubernetes for AI'],
    'docker': ['Docker for AI', 'Docker for AI'], 'career': ['AI Careers', 'AI career growth'],
    'interview prep': ['AI Interview Prep', 'AI interview preparation'],
    'data engineering': ['Data Engineering for AI', 'data engineering for AI'],
    'product management': ['AI Product Management', 'AI product management'],
    'project management': ['AI Project Management', 'AI project management'],
    'writing': ['Technical Writing', 'technical writing'], 'reading list': ['AI Learning Resources', 'AI learning resources'],
    'developer tools': ['AI Developer Tools', 'AI developer tools'],
    'productivity': ['Developer Productivity', 'developer productivity'],
    'chatbots': ['AI Chatbots', 'AI chatbots'], 'recommendations': ['Recommendation Systems', 'recommendation systems'],
    'personalization': ['AI Personalization', 'AI personalization'],
    'data labeling': ['Data Labeling', 'data labeling'], 'data pipelines': ['Data Pipelines', 'data pipelines'],
    'feature store': ['Feature Stores', 'feature stores'], 'model registry': ['Model Registries', 'model registries'],
    'content moderation': ['Content Moderation', 'content moderation'],
    'knowledge management': ['AI Knowledge Management', 'AI knowledge management'],
    'document ai': ['Document AI', 'document AI'], 'computer vision': ['Computer Vision', 'computer vision'],
    'speech': ['Speech AI', 'speech AI'], 'voice ai': ['Voice AI', 'voice AI'],
    'reasoning': ['AI Reasoning', 'AI reasoning'], 'code generation': ['AI Code Generation', 'AI code generation'],
    'image generation': ['AI Image Generation', 'AI image generation'],
    'diffusion models': ['Diffusion Models', 'diffusion models'],
    'continual learning': ['Continual Learning', 'continual learning'],
    'federated learning': ['Federated Learning', 'federated learning'],
    'reinforcement learning': ['Reinforcement Learning', 'reinforcement learning'],
    'bayesian': ['Bayesian Methods', 'Bayesian methods'], 'gnns': ['Graph Neural Networks', 'graph neural networks'],
    'attention': ['Attention Mechanisms', 'attention mechanisms'], 'tokenization': ['Tokenization', 'tokenization'],
    'information retrieval': ['Information Retrieval', 'information retrieval'],
    'pair programming': ['AI Pair Programming', 'AI pair programming'],
    'budget': ['AI Budgeting', 'AI budgeting'], 'feature flags': ['Feature Flags for AI', 'feature flags for AI'],
    'sla': ['AI Service Level Agreements', 'AI service level agreements'],
    'incident response': ['AI Incident Response', 'AI incident response'],
    'rollback': ['Model Rollback', 'model rollback'], 'debugging': ['AI Debugging', 'AI debugging'],
    'capacity planning': ['Capacity Planning', 'capacity planning'],
    'migration': ['AI Migration', 'AI migration'], 'disaster recovery': ['Disaster Recovery', 'disaster recovery'],
    'a/b testing': ['A/B Testing for AI', 'A/B testing for AI'],
    'data versioning': ['Data Versioning', 'data versioning'],
    'canary': ['Canary Deployments', 'canary deployments'],
    'tool use': ['LLM Tool Use', 'LLM tool use'], 'memory': ['AI Memory Systems', 'AI memory systems'],
    'rate limiting': ['Rate Limiting', 'rate limiting'], 'logging': ['AI Logging', 'AI logging'],
    'knowledge graphs': ['Knowledge Graphs', 'knowledge graphs'], 'graphrag': ['GraphRAG', 'GraphRAG'],
    'benchmarks': ['AI Benchmarks', 'AI benchmarks'], 'pricing': ['AI Pricing', 'AI pricing'],
    'structured output': ['Structured Output', 'structured output'],
    'context windows': ['Long Context Models', 'long context models'],
    'batch processing': ['Batch Processing', 'batch processing'], 'real-time': ['Real-Time AI', 'real-time AI'],
    'edge ai': ['Edge AI', 'edge AI'], 'iot': ['IoT AI', 'IoT AI'],
    'multi-cloud': ['Multi-Cloud AI', 'multi-cloud AI'], 'multi-model': ['Multi-Model Systems', 'multi-model systems'],
    'semantic': ['Semantic Caching', 'semantic caching'],
    'content generation': ['AI Content Generation', 'AI content generation'],
    'workflow': ['AI Workflows', 'AI workflows'], 'data governance': ['Data Governance', 'data governance'],
    'ranking': ['AI Ranking', 'AI ranking'], 'notification': ['AI Notifications', 'AI notifications'],
    'experimentation': ['AI Experimentation', 'AI experimentation'],
    'open source': ['Open Source', 'open source'], 'efficiency': ['Efficiency', 'efficiency'],
    'vision': ['Vision', 'vision AI'], 'best practices': ['Best Practices', 'best practices'],
    'hands-on': ['Hands-On', 'hands-on'], 'guide': ['Guide', 'this topic'],
    'fundamentals': ['Fundamentals', 'the fundamentals'], 'math': ['Math for ML', 'math for ML'],
    'statistics': ['Statistics', 'statistics'], 'scale': ['Scale', 'scaling'],
    'growth': ['Growth', 'career growth'], 'communication': ['Communication', 'communication'],
    'strategy': ['Strategy', 'strategy'], 'leadership': ['Leadership', 'leadership'],
    'quality': ['Quality', 'quality'], 'operations': ['Operations', 'operations'],
    'setup': ['Setup', 'setup'], 'engineering': ['Engineering', 'engineering'],
    'implementation': ['Implementation', 'implementation'], 'datasets': ['Datasets', 'datasets'],
    'curation': ['Curation', 'data curation'], 'management': ['Management', 'management'],
    'product': ['Product', 'product'], 'team': ['Team', 'team building'],
    'team building': ['Team Building', 'team building'], 'onboarding': ['Onboarding', 'onboarding'],
    'data preparation': ['Data Preparation', 'data preparation'],
    'vendor evaluation': ['Vendor Evaluation', 'vendor evaluation'],
    'data augmentation': ['Data Augmentation', 'data augmentation'],
    'audit': ['Audit', 'audit'], 'feedback': ['Feedback', 'feedback'],
    'poc': ['POC', 'proof of concept'], 'parsing': ['Parsing', 'output parsing'],
    'training data': ['Training Data', 'training data'],
    'ci/cd': ['CI/CD', 'CI/CD for ML'], 'synthetic data': ['Synthetic Data', 'synthetic data'],
    'healthcare': ['Healthcare', 'healthcare AI'], 'finance': ['Finance', 'financial AI'],
    'legal': ['Legal', 'legal AI'], 'retail': ['Retail', 'retail AI'],
    'manufacturing': ['Manufacturing', 'manufacturing AI'], 'education': ['Education', 'education AI'],
    'marketing': ['Marketing', 'marketing AI'], 'hr': ['HR', 'HR AI'],
    'cybersecurity': ['Cybersecurity', 'cybersecurity AI'], 'supply chain': ['Supply Chain', 'supply chain AI'],
    'devops': ['DevOps', 'AIOps'], 'aiops': ['AIOps', 'AIOps'],
    'customer support': ['Customer Support', 'AI customer support'],
    'time series': ['Time Series', 'time series AI'], 'forecasting': ['Forecasting', 'AI forecasting'],
    'ocr': ['OCR', 'OCR and document AI'], 'creative ai': ['Creative AI', 'creative AI'],
    'research': ['Research', 'AI research'], 'architecture': ['Architecture', 'architecture'],
    'regulation': ['Regulation', 'AI regulation'], 'routing': ['Routing', 'model routing'],
    'industry': ['Industry', 'industry applications'],
    'retrieval': ['Retrieval', 'retrieval systems'],
    'tooling': ['Tooling', 'AI tooling'],
    'data augmentation': ['Data Augmentation', 'data augmentation'],
    'performance': ['Performance', 'performance optimization'],
    'document processing': ['Document Processing', 'document processing'],
    'rlhf': ['RLHF', 'RLHF'], 'finops': ['FinOps', 'FinOps'],
    'microservices': ['Microservices', 'microservices'], 'kafka': ['Kafka', 'Kafka'],
    'event-driven': ['Event-Driven', 'event-driven architecture'],
    'conversational ai': ['Conversational AI', 'conversational AI'],
    'internal tools': ['Internal Tools', 'internal tools'],
    'resilience': ['Resilience', 'system resilience'],
  };
  const entry = map[lower];
  if (entry) return entry; // [display, inline]
  return [tag, tag.toLowerCase()]; // fallback
}

// ── Content building blocks ──────────────────────────────

function buildIntro(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const intros = [
    `If you have been working in AI or following the tech industry in India, you have probably heard about ${tagInline}. It sounds complex, but the core idea is actually quite simple. In this article, I will break down ${t.title.replace(/:.*/,'').toLowerCase()} in plain language — no jargon, no assumptions. Whether you are a developer at a Bangalore startup or a tech lead at a large enterprise, this guide will help you understand what matters and what you can safely ignore.`,

    `Let me tell you a story. A few months ago, a mid-size Indian company was struggling with their AI project. They had smart engineers, good data, and a clear business goal. But they were stuck because they did not understand ${tagInline} well enough to make the right technical decisions. This is more common than you think. ${t.description} Let us fix that knowledge gap together.`,

    `Here is something I have noticed working with Indian engineering teams — most people understand the basics of AI, but when it comes to ${tagInline}, there is a lot of confusion. Some teams over-engineer their solutions. Others pick the wrong tools entirely. And many waste months going down paths that a little upfront knowledge could have avoided. This article gives you that knowledge in simple, practical terms.`,

    `${t.title.replace(/:.*/,'').trim()} is one of those topics that every AI team in India needs to understand, but few take the time to learn properly. The result? Teams make expensive mistakes — choosing wrong tools, building overly complex systems, or missing simpler solutions that would have worked better. I have written this guide to save you from those mistakes. Everything here is explained in simple language with real examples.`,

    `Picture this: your team has just been asked to implement ${tagInline} for a new project. Your manager wants a plan by next week. Where do you even start? If you are feeling overwhelmed, you are not alone. ${tagDisplay} is a fast-moving space with new tools and approaches appearing every month. This article cuts through the noise and gives you a clear, practical understanding of what works in 2025.`,

    `When I talk to engineering teams across India — from startups in HSR Layout to enterprise teams in Gurgaon — one question keeps coming up: "How do we get ${tagInline} right?" The honest answer is that there is no single right way. But there are definitely wrong ways, and there are proven patterns that work. Let me share what I have learned.`,
  ];
  return seededPick(intros, seed);
}

function buildSection1(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const headings = {
    beginner: [
      `Understanding ${tagDisplay} — The Basics`,
      `What Is ${tagDisplay} and Why Should You Care`,
      `${tagDisplay} Explained Simply`,
    ],
    intermediate: [
      `The Current State of ${tagDisplay}`,
      `How ${tagDisplay} Works in Practice`,
      `${tagDisplay} — What Has Changed Recently`,
    ],
    advanced: [
      `Deep Dive into ${tagDisplay}`,
      `The Technical Foundation of ${tagDisplay}`,
      `Advanced ${tagDisplay} Concepts`,
    ],
  };
  const h = seededPick(headings[t.difficulty] || headings.intermediate, seed);

  const bodies = [
    `Let me explain this with a simple analogy. Think of ${tagInline} like building a house. You need a strong foundation (your data), good materials (your tools and models), skilled workers (your engineering team), and a clear blueprint (your architecture). Skip any of these, and the house will have problems.\n\nIn the Indian context, this is especially important because many teams are building AI systems for the first time. They often jump straight to the latest fancy tool without understanding the fundamentals. The teams that succeed are the ones that take time to understand the basics first, then choose tools that fit their specific needs.`,

    `The simplest way to think about ${tagInline} is this: it is about making your AI system work reliably in the real world, not just in a demo. There is a huge gap between an AI model that works on your laptop and one that serves thousands of users every day without breaking.\n\nI have seen this gap catch many Indian teams off guard. They build a brilliant prototype, show it to stakeholders, get approval, and then spend months struggling to make it work in production. Understanding ${tagInline} properly from the start can save you from this painful cycle.`,

    `At its core, ${tagInline} solves a fundamental problem that every AI team faces. As your AI system grows — more users, more data, more use cases — things that worked at small scale start breaking. Response times increase. Costs spiral. Quality drops. Errors become harder to debug.\n\n${tagDisplay} gives you the patterns and tools to handle this growth gracefully. Think of it as the difference between a chai stall that serves 50 customers a day and a restaurant chain that serves 50,000. Both serve food, but the systems behind them are completely different.`,
  ];

  return { heading: h, body: seededPick(bodies, seed + 1) };
}

function buildSection2(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const headings = [
    `Key Decisions You Need to Make`,
    `Choosing the Right Approach`,
    `What Works and What Does Not`,
    `Practical Considerations for Indian Teams`,
  ];
  const h = seededPick(headings, seed + 2);

  const bodies = [
    `When it comes to ${tagInline}, Indian teams typically face three key decisions. First, build versus buy — should you build your own solution or use an existing tool? Second, cloud versus on-premise — where should this run? Third, which specific tools or frameworks to use?\n\nMy advice: start with the simplest option that could work. If a managed service solves your problem, use it. Do not build from scratch just because it feels more "engineering." Save your engineering effort for the parts that are truly unique to your business. For everything else, stand on the shoulders of existing solutions.`,

    `Here is what I have seen work well in Indian companies of different sizes. Small startups (under 50 people) should use managed services and APIs — do not waste time on infrastructure. Mid-size companies (50-500 people) should use a mix of managed services and some self-hosted components for cost optimization. Large enterprises (500+ people) can justify building custom solutions for their most critical workflows.\n\nThe mistake I see most often is small teams trying to build everything from scratch. They end up spending 80% of their time on infrastructure and only 20% on the actual AI problem they are trying to solve. Flip that ratio.`,

    `Let me be direct about what works and what does not in the ${tagInline} space. What works: starting simple, measuring everything, iterating based on data, and investing in good evaluation. What does not work: chasing the latest trends without understanding your requirements, over-engineering your first version, and skipping evaluation because "the demo looked good."\n\nFor Indian teams specifically, I would add: do not ignore the multilingual challenge. If your users speak Hindi, Tamil, Telugu, or any other Indian language, test your system with those languages from day one. Adding multilingual support later is much harder than building it in from the start.`,
  ];

  return { heading: h, body: seededPick(bodies, seed + 3) };
}

function buildSection3(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const headings = [
    `Step-by-Step Implementation Guide`,
    `How to Get Started — A Practical Roadmap`,
    `Implementation: From Zero to Production`,
    `Building Your First ${tagDisplay} System`,
  ];
  const h = seededPick(headings, seed + 4);

  const steps = [
    [
      `<strong>Week 1-2: Learn and Explore</strong> — Spend time understanding the fundamentals. Read documentation, try tutorials, and experiment with small examples. Do not commit to any tool yet.`,
      `<strong>Week 3-4: Prototype</strong> — Build a minimal working version using the simplest approach possible. Use your actual business data, not sample datasets. Show it to real users and collect feedback.`,
      `<strong>Month 2: Evaluate and Iterate</strong> — Measure the prototype against your success criteria. Identify the biggest gaps. Fix the most impactful issues first.`,
      `<strong>Month 3: Production Prep</strong> — Add monitoring, error handling, and logging. Set up automated tests. Document your system for your team. Plan for scaling.`,
      `<strong>Month 4+: Launch and Monitor</strong> — Deploy to production with a small percentage of traffic first. Monitor closely. Gradually increase traffic as you gain confidence.`,
    ],
    [
      `<strong>Define success clearly</strong> — Before writing any code, write down what "good" looks like. What accuracy do you need? What latency is acceptable? What is your budget? Without clear targets, you will never know if you have succeeded.`,
      `<strong>Start with your data</strong> — The quality of your data matters more than the quality of your model. Spend time cleaning, organizing, and understanding your data before choosing tools.`,
      `<strong>Build the simplest thing that works</strong> — Your first version should be embarrassingly simple. A basic solution that works is infinitely better than a complex solution that is still being built.`,
      `<strong>Measure from day one</strong> — Set up logging and metrics before you launch. You need to know how your system is performing in the real world, not just in your test environment.`,
      `<strong>Plan for iteration</strong> — Your first version will not be perfect. That is okay. What matters is that you can improve it quickly based on real user feedback and real performance data.`,
    ],
  ];

  return { heading: h, steps: seededPick(steps, seed + 5) };
}

function buildSection4(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const headings = [
    `Cost and Resource Planning`,
    `Managing Costs Effectively`,
    `Budget-Friendly Approaches`,
    `Making It Work on an Indian Budget`,
  ];
  const h = seededPick(headings, seed + 6);

  const bodies = [
    `Let us talk about money — because in India, budget is often the biggest constraint. The good news is that ${tagInline} does not have to be expensive. The bad news is that costs can spiral quickly if you are not careful.\n\nHere are some cost-saving strategies that work well for Indian teams. Use open-source tools wherever possible — the quality of open-source AI tools has improved dramatically. Use spot or preemptible GPU instances for non-critical workloads to save 60-70% on compute costs. Start with smaller models and only scale up when you have data showing that bigger models give meaningfully better results. And always set up cost alerts so you know immediately if spending is going above your budget.`,

    `Budget planning for ${tagInline} projects is tricky because costs depend heavily on scale. A prototype might cost almost nothing, but production costs can be significant. Here is a rough framework for Indian teams:\n\nFor a small-scale deployment (serving hundreds of users), expect to spend Rs 10,000-50,000 per month on infrastructure. For medium scale (thousands of users), Rs 50,000-2,00,000 per month. For large scale (lakhs of users), Rs 2,00,000-10,00,000 per month. These numbers vary widely based on your specific use case, but they give you a starting point for budget conversations.\n\nThe most important cost optimization is choosing the right model size. Using a model that is 10x larger than necessary is like using a truck to deliver a letter — it works, but it is incredibly wasteful.`,

    `One thing I always tell Indian teams: do not let budget anxiety stop you from starting. You can build a meaningful ${tagInline} prototype for almost zero cost using free tiers of cloud services, open-source models, and tools like Google Colab.\n\nThe expensive part comes when you scale to production. But by that point, you should have data showing the business value of your AI system. Use that data to justify the budget. Show your leadership concrete numbers — "This system saves our support team 200 hours per month" is much more convincing than "We need GPUs for AI."\n\nAlso, explore government initiatives. The Indian government's AI programs and startup schemes sometimes offer cloud credits and computing resources. It is worth checking if your company qualifies.`,
  ];

  return { heading: h, body: seededPick(bodies, seed + 7) };
}

function buildSection5(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const headings = [
    `Common Mistakes and How to Avoid Them`,
    `Lessons from Real Indian Deployments`,
    `What I Wish Someone Had Told Me Earlier`,
    `Pitfalls to Watch Out For`,
  ];
  const h = seededPick(headings, seed + 8);

  const bodies = [
    `After working with many Indian teams on ${tagInline} projects, I have seen the same mistakes repeated over and over. Let me save you the trouble.\n\nFirst, do not skip evaluation. Many teams build a system, do a quick manual check, and declare it "working." Then they are surprised when users complain about quality. Build automated evaluation from the start — even a simple test suite with 50 examples is better than nothing.\n\nSecond, do not ignore latency. Indian internet speeds vary widely. A system that responds in 2 seconds on your office WiFi might take 8 seconds on a user's mobile connection in a tier-2 city. Always test with realistic network conditions.\n\nThird, do not try to solve everything at once. Pick one use case, make it work really well, and then expand. The teams that try to build a "general AI platform" from day one usually end up with nothing that works well.`,

    `Here are the top lessons I have gathered from real ${tagInline} deployments across Indian companies:\n\nLesson 1: Simple beats clever. The most successful AI systems I have seen are not the most technically sophisticated — they are the ones that solve a clear problem simply and reliably.\n\nLesson 2: Data quality trumps model quality. I have seen teams spend weeks choosing between models when their real problem was messy, inconsistent training data. Fix your data first.\n\nLesson 3: Users do not care about your architecture. They care about whether the system gives them useful answers quickly. Optimize for user experience, not technical elegance.\n\nLesson 4: Plan for the long term. AI systems need ongoing maintenance — data updates, model refreshes, monitoring, and improvement. Budget for this from the start, not as an afterthought.`,

    `Let me share the most expensive mistakes I have seen Indian teams make with ${tagInline}:\n\nMistake 1: Choosing tools based on hype instead of requirements. Just because a tool is trending on Twitter does not mean it is right for your use case. Always start with your requirements and find tools that fit.\n\nMistake 2: Not involving domain experts early enough. Your AI system needs to understand your business domain. Engineers alone cannot provide this — you need input from people who understand the business deeply.\n\nMistake 3: Underestimating the "last mile" problem. Getting from 80% accuracy to 95% accuracy often takes more effort than getting from 0% to 80%. Plan your timeline accordingly.\n\nMistake 4: Forgetting about Indian languages. If your users speak Hindi or regional languages, your system needs to handle that. Retrofitting multilingual support is much harder than building it in from the start.`,
  ];

  return { heading: h, body: seededPick(bodies, seed + 9) };
}

function buildCode(t, seed) {
  const tag0 = toSnakeCase(t.tags[0]);
  const pascal = toPascalCase(t.tags[0]);

  const codes = [
    `# Simple ${t.tags[0]} setup for Indian teams
# Start with this basic structure and expand as needed

class ${pascal}System:
    def __init__(self, config):
        self.config = config
        self.model = self._load_model(config["model_name"])
        self.monitor = PerformanceMonitor()

    def process(self, input_data):
        """Process a single request with monitoring"""
        start_time = time.time()

        # Step 1: Validate input
        if not self._validate(input_data):
            return {"error": "Invalid input", "status": "failed"}

        # Step 2: Run the AI model
        result = self.model.predict(input_data)

        # Step 3: Check quality
        confidence = result.get("confidence", 0)
        if confidence < 0.7:
            result["warning"] = "Low confidence - consider human review"

        # Step 4: Log metrics (important for Indian compliance)
        latency = time.time() - start_time
        self.monitor.log({
            "latency_ms": latency * 1000,
            "confidence": confidence,
            "model": self.config["model_name"],
            "cost_inr": self._calculate_cost(input_data)
        })

        return result

# Usage
system = ${pascal}System({"model_name": "your-model-here"})
result = system.process({"text": "Your input here"})
print(f"Result: {result}, Cost: Rs {result.get('cost_inr', 0)}")`,

    `# Evaluating ${t.tags[0]} solutions - practical framework
# Use this to compare different approaches objectively

def evaluate_${tag0}_solution(solution, test_cases):
    """Run evaluation on your actual business data"""
    results = {
        "accuracy": [],
        "latency_ms": [],
        "cost_per_request_inr": [],
        "failures": []
    }

    for test in test_cases:
        start = time.time()
        try:
            output = solution.run(test["input"])
            latency = (time.time() - start) * 1000

            # Check if output matches expected result
            is_correct = check_quality(output, test["expected"])
            results["accuracy"].append(is_correct)
            results["latency_ms"].append(latency)
            results["cost_per_request_inr"].append(solution.get_cost())
        except Exception as e:
            results["failures"].append(str(e))

    # Calculate summary metrics
    summary = {
        "accuracy": sum(results["accuracy"]) / len(results["accuracy"]) * 100,
        "avg_latency_ms": sum(results["latency_ms"]) / len(results["latency_ms"]),
        "p99_latency_ms": sorted(results["latency_ms"])[int(len(results["latency_ms"]) * 0.99)],
        "avg_cost_inr": sum(results["cost_per_request_inr"]) / len(results["cost_per_request_inr"]),
        "failure_rate": len(results["failures"]) / len(test_cases) * 100,
        "monthly_cost_estimate_inr": sum(results["cost_per_request_inr"]) * 30 * 1000
    }

    print(f"Accuracy: {summary['accuracy']:.1f}%")
    print(f"Avg Latency: {summary['avg_latency_ms']:.0f}ms")
    print(f"Monthly Cost: Rs {summary['monthly_cost_estimate_inr']:,.0f}")
    return summary`,

    `# Production-ready ${t.tags[0]} pipeline
# Designed for reliability and cost efficiency

class ${pascal}Pipeline:
    def __init__(self):
        self.preprocessor = DataPreprocessor()
        self.model = self._init_model()
        self.cache = ResponseCache(max_size=10000)
        self.rate_limiter = RateLimiter(max_rpm=100)
        self.logger = setup_logging("${tag0}_pipeline")

    async def run(self, request):
        # Check cache first (saves money!)
        cached = self.cache.get(request.cache_key)
        if cached:
            self.logger.info("Cache hit - saved one API call")
            return cached

        # Rate limiting (prevent runaway costs)
        await self.rate_limiter.wait()

        # Preprocess
        clean_input = self.preprocessor.clean(request.data)

        # Run model with retry logic
        for attempt in range(3):
            try:
                result = await self.model.predict(clean_input)
                break
            except Exception as e:
                self.logger.warning(f"Attempt {attempt+1} failed: {e}")
                if attempt == 2:
                    return {"error": "Service temporarily unavailable"}
                await asyncio.sleep(2 ** attempt)

        # Cache the result
        self.cache.set(request.cache_key, result)

        # Log for monitoring
        self.logger.info(f"Processed request, cost: Rs {result.cost_inr}")
        return result

# Tip: The cache alone can reduce your API costs by 30-50%`,
  ];

  return seededPick(codes, seed + 10);
}

function buildTakeaways(t, seed) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const allTakeaways = [
    `<strong>Start simple, then improve</strong> — the best ${tagInline} implementations begin with a basic version that works, then get better over time based on real user feedback.`,
    `<strong>Your data quality matters more than your model choice</strong> — spending a week cleaning your data will improve results more than spending a week choosing between models.`,
    `<strong>Measure everything from day one</strong> — set up logging and metrics before you launch. You cannot improve what you cannot measure.`,
    `<strong>Budget for the long term</strong> — AI systems need ongoing maintenance, monitoring, and improvement. Factor this into your cost planning.`,
    `<strong>Test with real Indian users early</strong> — what works in a demo may not work for users in tier-2 cities with slower internet connections and different language preferences.`,
    `<strong>Do not over-engineer your first version</strong> — a working simple system beats a perfect system that is still being built. Ship early, learn fast.`,
    `<strong>Involve domain experts</strong> — engineers build the system, but domain experts ensure it solves the right problem in the right way.`,
    `<strong>Plan for multilingual needs</strong> — if your users speak Hindi, Tamil, or other Indian languages, build language support in from the start.`,
    `<strong>Open source is production-ready</strong> — many open-source ${tagInline} tools are now good enough for production use, saving significant licensing costs.`,
    `<strong>Security and compliance are not optional</strong> — especially with India's DPDPA, make sure your AI system handles personal data responsibly from day one.`,
  ];
  return seededPickN(allTakeaways, 4, seed + 11);
}

// ── Article assembler ────────────────────────────────────

function generateArticle(topic, allTopics) {
  const seed = hashCode(topic.slug);
  const year = (topic.publishDate || '2025-01-01').split('-')[0];

  // Pick related articles for Next Reads
  const related = allTopics
    .filter(t => t.slug !== topic.slug)
    .filter(t => t.section === topic.section || t.tags.some(tag => topic.tags.includes(tag)));
  const nextReads = seededPickN(related.length > 3 ? related : allTopics.filter(t => t.slug !== topic.slug), 3, seed + 20);

  const intro = buildIntro(topic, seed);
  const s1 = buildSection1(topic, seed);
  const s2 = buildSection2(topic, seed);
  const s3 = buildSection3(topic, seed);
  const s4 = buildSection4(topic, seed);
  const s5 = buildSection5(topic, seed);
  const code = buildCode(topic, seed);
  const takeaways = buildTakeaways(topic, seed);
  const escapedCode = code.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const nextReadsHtml = nextReads.map(nr =>
    `  <li><a href="/${nr.section}/${nr.slug}">${nr.title}</a></li>`
  ).join('\n');

  const stepsHtml = s3.steps.map(s => `  <li>${s}</li>`).join('\n');
  const takeawaysHtml = takeaways.map(t => `  <li>${t}</li>`).join('\n');

  return `---
import ArticleLayout from "../../layouts/ArticleLayout.astro";

const codeExample = \`${escapedCode}\`;
---

<ArticleLayout
  title="${topic.title.replace(/"/g, '&quot;')}"
  description="${topic.description.replace(/"/g, '&quot;')}"
  category="${topic.category}"
  date="${year}"
  readTime="${topic.readTime}"
  tags={${JSON.stringify(topic.tags)}}
>

<h2>Executive Summary</h2>
<p>${intro}</p>

<h2>Key Takeaways</h2>
<ul>
${takeawaysHtml}
</ul>

<h2>${s1.heading}</h2>
${s1.body.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}

<h2>${s2.heading}</h2>
${s2.body.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}

<pre><code class="language-python" set:html={codeExample} /></pre>

<h2>${s3.heading}</h2>
<p>Here is a practical roadmap that has worked well for Indian teams at different stages of their ${naturalRef(topic.tags[0])[1]} journey:</p>
<ul>
${stepsHtml}
</ul>

<h2>${s4.heading}</h2>
${s4.body.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}

<h2>${s5.heading}</h2>
${s5.body.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}

<h2>Next Reads</h2>
<ul>
${nextReadsHtml}
</ul>

</ArticleLayout>
`;
}

// ── Main ─────────────────────────────────────────────────

function countWords(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
}

function main() {
  const scheduled = buildPublishSchedule(topics);

  let created = 0;
  let skipped = 0;
  let wordCounts = [];

  for (const topic of scheduled) {
    const dir = path.join(PAGES_DIR, topic.section);
    const filePath = path.join(dir, `${topic.slug}.astro`);

    if (fs.existsSync(filePath)) {
      skipped++;
      console.log(`  SKIP  ${topic.section}/${topic.slug}.astro (already exists)`);
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });
    const content = generateArticle(topic, scheduled);
    fs.writeFileSync(filePath, content, 'utf-8');

    // Count words in the body (after the frontmatter closing ---)
    const bodyStart = content.indexOf('</ArticleLayout>');
    const bodyContent = content.substring(content.indexOf('<h2>'), bodyStart);
    const wc = countWords(bodyContent);
    wordCounts.push(wc);

    created++;
    console.log(`  CREATE  ${topic.section}/${topic.slug}.astro (${wc} words)`);
  }

  console.log(`\nDone! Created ${created} articles, skipped ${skipped} existing files.`);
  if (wordCounts.length > 0) {
    const avg = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
    const min = Math.min(...wordCounts);
    const max = Math.max(...wordCounts);
    console.log(`Word counts — avg: ${avg}, min: ${min}, max: ${max}`);
  }

  // Write article index JSON
  const indexData = scheduled.map(t => ({
    slug: t.slug,
    title: t.title,
    description: t.description,
    section: t.section,
    category: t.category,
    tags: t.tags,
    readTime: t.readTime,
    difficulty: t.difficulty,
    publishDate: t.publishDate,
    href: `/${t.section}/${t.slug}`,
  }));

  const indexPath = path.join(__dirname, '..', 'src', 'data', 'article-index.json');
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
  console.log(`Wrote article index to src/data/article-index.json (${indexData.length} entries)`);
}

main();
