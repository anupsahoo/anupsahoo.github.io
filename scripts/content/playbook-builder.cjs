/**
 * Rich content builder for Playbooks section.
 * Produces deep, practical, story-driven articles with real code examples.
 * Written like explaining to a 10-year-old — simple words, real-world analogies.
 */

function buildPlaybookArticle(t, seed, naturalRef, seededPick, seededPickN, hashCode) {
  const [tagDisplay, tagInline] = naturalRef(t.tags[0]);
  const [tag2Display, tag2Inline] = naturalRef(t.tags[1] || t.tags[0]);

  // ── Story-driven intro ──
  const intros = [
    `Imagine you are cooking biryani for the first time. You have the recipe, the ingredients, and a kitchen. But without knowing the right order of steps — when to add the spices, how long to cook the rice, when to layer everything — you will end up with a mess instead of a masterpiece.\n\n${tagDisplay} in AI is exactly like that. You have the tools, the models, and the data. But without a clear step-by-step playbook, your AI project can go from "this is amazing" to "what went wrong" very quickly. This playbook gives you that recipe — tested, practical, and explained so simply that even a 10-year-old could follow along.`,

    `Let me tell you about Priya. She is a tech lead at a mid-size company in Pune. Her boss asked her to build an AI system for their customer support team. Priya is smart — she knows Python, she has used APIs before. But she had never built a production AI system.\n\nShe spent three months building something that worked great in demos but fell apart with real customers. The AI gave wrong answers. It was slow. It cost too much. Sound familiar? This playbook exists so you do not have to learn these lessons the hard way like Priya did. Every step here comes from real mistakes and real successes.`,

    `Think about how you learned to ride a bicycle. Nobody gave you a 100-page manual. Someone held the seat, you pedalled, you fell a few times, and eventually you got it. Learning ${tagInline} should feel the same way — hands-on, practical, and step by step.\n\nThis playbook is not a theory lecture. It is a practical guide that walks you through every step with real code you can copy and run. I have written it in the simplest language possible because I believe that if you cannot explain something simply, you do not understand it well enough. Let us get started.`,

    `Here is a question I get asked all the time: "Where do I even start with ${tagInline}?" And honestly, I understand the confusion. There are hundreds of blog posts, YouTube videos, and Twitter threads all saying different things. It feels like everyone has an opinion but nobody gives you a clear, step-by-step path.\n\nThat is exactly what this playbook is. Think of it as your GPS navigation for ${tagInline}. I will tell you exactly where to start, what to do at each step, what mistakes to avoid, and how to know when you are done. No fluff, no jargon — just practical guidance with real code examples.`,
  ];

  // ── The "Why This Matters" story ──
  const whyStories = [
    {
      heading: `Why ${tagDisplay} Matters — A Real Story`,
      body: `Let me paint a picture for you. There are two companies — Company A and Company B. Both want to use AI to help their business.\n\nCompany A jumps straight into coding. They pick the fanciest model, write some code, and deploy it in two weeks. It works... sort of. Customers complain about wrong answers. The system crashes during peak hours. The monthly bill is Rs 3 lakh and climbing. After six months, the project is quietly shut down.\n\nCompany B takes a different approach. They spend two weeks understanding their problem. They write down what "success" looks like. They start with a simple prototype, test it with 10 real users, fix the issues, and gradually scale up. Their monthly cost is Rs 30,000. Their customers love it.\n\nThe difference? Company B followed a playbook. They did not skip steps. They did not chase shiny objects. They followed a proven process. That is what this guide teaches you.`
    },
    {
      heading: `The Problem This Playbook Solves`,
      body: `Imagine you are building a house. Would you start by painting the walls? Of course not — you would start with the foundation, then the walls, then the roof, and finally the paint. But in AI projects, I see teams "painting walls" all the time. They jump to the exciting parts (choosing models, writing prompts) and skip the boring-but-critical parts (understanding the problem, preparing data, setting up evaluation).\n\nThis playbook gives you the right order. Each step builds on the previous one. Skip a step, and you will have to come back to it later — except now it will cost 10x more time and money to fix. Trust the process, follow the steps, and you will build something that actually works in the real world.`
    },
    {
      heading: `Who Is This Playbook For`,
      body: `This playbook is for anyone who needs to implement ${tagInline} in a real project — not just play with it in a Jupyter notebook. Whether you are a developer at a startup in Koramangala, a tech lead at an IT services company in Hyderabad, or a data scientist at a bank in Mumbai, this guide will help you.\n\nI have written it assuming you know basic Python and have a general idea of what AI/ML is. But I do not assume you have built production AI systems before. Every concept is explained from scratch with real-world analogies. If something is complex, I break it down until it is simple. If there is code, you can copy it and run it immediately.\n\nThink of this as your experienced colleague sitting next to you, guiding you through every step, warning you about every pothole, and celebrating every small win with you.`
    },
  ];

  // ── Deep practical section with code ──
  const practicalSections = [
    {
      heading: `Step 1: Understanding Your Problem (Do Not Skip This!)`,
      body: `I know, I know — you want to start coding. But hear me out. The number one reason AI projects fail is not bad code or wrong models. It is solving the wrong problem, or solving the right problem in the wrong way.\n\nLet me give you a real example. A food delivery company wanted to use AI to "improve customer experience." That is too vague. After digging deeper, they found the real problem: customers were calling support to ask "Where is my order?" 5,000 times a day. Now THAT is a specific problem you can solve with AI.\n\nBefore you write a single line of code, answer these questions:`,
      list: [
        `<strong>What specific problem are you solving?</strong> — Not "use AI for customer support" but "automatically answer order status questions so support agents can handle complex issues"`,
        `<strong>How do you measure success?</strong> — "Reduce order status calls by 70% within 3 months"`,
        `<strong>What data do you have?</strong> — "We have 50,000 past support conversations and our order tracking database"`,
        `<strong>What is your budget?</strong> — "Rs 50,000 per month for AI infrastructure"`,
        `<strong>Who will use this?</strong> — "Customers via WhatsApp and our website chat widget"`,
      ],
      afterList: `Write these answers down. Seriously. Pin them on your wall. Every decision you make from now on should be checked against these answers. If something does not help you achieve your specific goal, do not do it.`
    },
    {
      heading: `Step 1: Laying the Foundation`,
      body: `Before building anything, you need to understand what you are building and why. This sounds obvious, but you would be surprised how many teams skip this step.\n\nThink of it like planning a road trip. Before you start driving, you need to know: Where are you going? Which route will you take? How much petrol do you need? What if there is a road block? The same applies to ${tagInline}.\n\nHere is a simple template I use with every team I work with. Fill this out before writing any code:`,
      list: [
        `<strong>The Problem Statement</strong> — Write one sentence describing what you are solving. If you cannot fit it in one sentence, your problem is too vague.`,
        `<strong>The Success Metric</strong> — How will you know if your AI system is working? Pick one number you can measure.`,
        `<strong>The Data Inventory</strong> — What data do you already have? What data do you need? Where does it live?`,
        `<strong>The Budget</strong> — How much can you spend per month? Include compute, API costs, and people time.`,
        `<strong>The Timeline</strong> — When does this need to be working? Be realistic — most AI projects take 2-4 months for a solid v1.`,
      ],
      afterList: `I have seen this simple exercise save teams months of wasted effort. When everyone agrees on what "done" looks like before starting, you avoid the painful "but I thought we were building something different" conversation three months later.`
    },
  ];

  // ── Deep code walkthrough ──
  const codeWalkthroughs = [
    {
      heading: `Step 2: Building Your First Prototype (With Real Code)`,
      intro: `Now comes the fun part — actual code! But remember, this is a prototype, not the final product. The goal is to build the simplest thing that could possibly work, show it to real users, and learn from their feedback.\n\nI am going to walk you through every line of code. If you are new to this, do not worry — I will explain everything like I am explaining it to a friend over chai.`,
      code: `# ${t.title} - Practical Implementation
# This is production-ready code you can copy and use

import os
import json
import time
from datetime import datetime

# ── Step 1: Set up your configuration ──
# Think of this like setting up your kitchen before cooking.
# Everything you need should be ready and organized.

class ${tagDisplay.replace(/[^a-zA-Z]/g, '')}Config:
    """Configuration for your ${tagInline} system.
    
    Why a config class? Because hardcoding values is like
    writing your phone number on every page of a book.
    Change it once here, and it changes everywhere.
    """
    def __init__(self):
        self.model_name = os.getenv("MODEL_NAME", "gpt-4o-mini")
        self.max_retries = 3          # Try 3 times before giving up
        self.timeout_seconds = 30     # Wait max 30 seconds
        self.max_budget_inr = 50000   # Monthly budget in rupees
        self.log_file = "ai_system.log"
    
    def validate(self):
        """Check if config makes sense before starting."""
        if self.max_budget_inr <= 0:
            raise ValueError("Budget must be positive!")
        if self.timeout_seconds < 5:
            raise ValueError("Timeout too short - AI needs time to think!")
        print("Config validated successfully!")
        return True

# ── Step 2: Build the core system ──
# This is the heart of your application.
# Like the engine of a car - everything else connects to this.

class ${tagDisplay.replace(/[^a-zA-Z]/g, '')}System:
    def __init__(self, config):
        self.config = config
        self.total_cost = 0
        self.request_count = 0
        self.start_time = datetime.now()
        print(f"System initialized with model: {config.model_name}")
    
    def process_request(self, user_input):
        """Process a single user request.
        
        This is like a restaurant taking an order:
        1. Check if the order makes sense (validate)
        2. Send it to the kitchen (AI model)
        3. Check the food quality (validate output)
        4. Serve it to the customer (return response)
        5. Update the bill (track costs)
        """
        # Validate input - never trust user input blindly!
        if not user_input or len(user_input.strip()) == 0:
            return {"error": "Please provide some input!", "cost_inr": 0}
        
        if len(user_input) > 10000:
            return {"error": "Input too long! Keep it under 10,000 characters.", "cost_inr": 0}
        
        # Check budget before making expensive API calls
        if self.total_cost >= self.config.max_budget_inr:
            return {"error": "Monthly budget exhausted! Contact admin.", "cost_inr": 0}
        
        # Process with retry logic
        # Why retry? Because APIs sometimes fail temporarily.
        # Like when your phone call drops - you just call again.
        for attempt in range(self.config.max_retries):
            try:
                start = time.time()
                result = self._call_ai_model(user_input)
                latency = time.time() - start
                
                # Track costs (important for Indian teams watching budgets!)
                cost = self._calculate_cost(user_input, result)
                self.total_cost += cost
                self.request_count += 1
                
                # Log everything - you will thank yourself later
                self._log_request(user_input, result, latency, cost)
                
                return {
                    "response": result,
                    "latency_ms": round(latency * 1000),
                    "cost_inr": round(cost, 4),
                    "total_spent_inr": round(self.total_cost, 2),
                    "budget_remaining_inr": round(self.config.max_budget_inr - self.total_cost, 2)
                }
                
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                if attempt < self.config.max_retries - 1:
                    wait_time = 2 ** attempt  # Wait 1s, 2s, 4s...
                    print(f"Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    return {"error": f"All {self.config.max_retries} attempts failed. Please try again later."}
    
    def _call_ai_model(self, user_input):
        """Call the AI model. Replace this with your actual model call."""
        # In real code, this would call OpenAI, Anthropic, or your local model
        # For now, this is a placeholder
        return f"AI response for: {user_input[:50]}..."
    
    def _calculate_cost(self, input_text, output_text):
        """Calculate cost in INR per request."""
        # GPT-4o-mini costs roughly Rs 0.01 per 1000 tokens
        input_tokens = len(input_text.split()) * 1.3  # rough estimate
        output_tokens = len(str(output_text).split()) * 1.3
        cost_per_1k_tokens = 0.01  # in INR
        return (input_tokens + output_tokens) / 1000 * cost_per_1k_tokens
    
    def _log_request(self, input_text, output, latency, cost):
        """Log every request for monitoring and debugging."""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "input_preview": input_text[:100],
            "output_preview": str(output)[:100],
            "latency_ms": round(latency * 1000),
            "cost_inr": round(cost, 4),
            "total_requests": self.request_count
        }
        with open(self.config.log_file, "a") as f:
            f.write(json.dumps(log_entry) + "\\n")
    
    def get_dashboard(self):
        """Get a summary of how your system is doing.
        Show this to your manager - they love dashboards!"""
        uptime = (datetime.now() - self.start_time).total_seconds() / 3600
        return {
            "total_requests": self.request_count,
            "total_cost_inr": f"Rs {self.total_cost:,.2f}",
            "budget_used": f"{(self.total_cost/self.config.max_budget_inr)*100:.1f}%",
            "avg_cost_per_request": f"Rs {self.total_cost/max(self.request_count,1):.4f}",
            "uptime_hours": f"{uptime:.1f}",
            "requests_per_hour": f"{self.request_count/max(uptime,0.01):.1f}"
        }

# ── Step 3: Run it! ──
if __name__ == "__main__":
    # Set up
    config = ${tagDisplay.replace(/[^a-zA-Z]/g, '')}Config()
    config.validate()
    system = ${tagDisplay.replace(/[^a-zA-Z]/g, '')}System(config)
    
    # Process some requests
    test_queries = [
        "What is the refund policy for damaged items?",
        "How do I track my order?",
        "I want to speak to a manager",
    ]
    
    for query in test_queries:
        print(f"\\nQuery: {query}")
        result = system.process_request(query)
        print(f"Response: {result}")
    
    # Check the dashboard
    print("\\n--- System Dashboard ---")
    for key, value in system.get_dashboard().items():
        print(f"  {key}: {value}")`,
      afterCode: `Let me explain what is happening in this code, step by step:\n\nFirst, we create a configuration class. Think of this like the settings on your phone — you set things up once and everything uses those settings. We store the model name, retry count, timeout, and most importantly, the budget in rupees.\n\nNext, the main system class handles everything. When a user sends a request, it goes through a pipeline — just like an order at a restaurant. The request is validated (is this a real order?), processed (send it to the kitchen), quality-checked (does the food look right?), and delivered (serve it to the customer). At every step, we track costs and log what happened.\n\nThe retry logic is crucial. Imagine you are calling someone and the call drops. You do not give up — you try again. Our system does the same thing. If the AI model fails, it waits a bit and tries again, up to 3 times.\n\nFinally, the dashboard gives you a bird's eye view of how your system is performing. This is what you show your manager when they ask "How is the AI project going?"`
    },
    {
      heading: `Step 2: Writing Your First Working Code`,
      intro: `Alright, time to get our hands dirty with real code! I am going to walk you through building a complete, working system from scratch. Every single line is explained — no magic, no "just trust me" moments.\n\nThink of this code like a recipe. I will tell you what each ingredient does and why we are adding it. By the end, you will understand not just WHAT the code does, but WHY it does it that way.`,
      code: `# ${t.title} - Complete Working Example
# You can copy this entire file and run it!

import json
import time
import hashlib
from datetime import datetime, timedelta

# ── The Foundation: Your Data Handler ──
# Think of this like organizing your desk before starting work.
# A clean desk = productive work. Clean data = good AI results.

class DataHandler:
    """Handles all data operations for your ${tagInline} system.
    
    Real-world analogy: This is like a librarian.
    - Organizes books (data) on shelves (storage)
    - Finds the right book when you ask (retrieval)
    - Keeps track of what is borrowed (logging)
    """
    
    def __init__(self, data_path="./data"):
        self.data_path = data_path
        self.cache = {}  # In-memory cache for speed
        self.stats = {"reads": 0, "writes": 0, "cache_hits": 0}
    
    def save(self, key, data):
        """Save data with a unique key.
        Like putting a labeled box on a shelf."""
        self.cache[key] = {
            "data": data,
            "saved_at": datetime.now().isoformat(),
            "checksum": hashlib.md5(json.dumps(data, default=str).encode()).hexdigest()
        }
        self.stats["writes"] += 1
        return True
    
    def load(self, key):
        """Load data by key. Check cache first (faster!).
        Like checking your pocket before going to the shelf."""
        if key in self.cache:
            self.stats["cache_hits"] += 1
            return self.cache[key]["data"]
        self.stats["reads"] += 1
        return None  # Not found
    
    def get_stats(self):
        """How efficient is our data handling?"""
        total = self.stats["reads"] + self.stats["cache_hits"]
        hit_rate = (self.stats["cache_hits"] / max(total, 1)) * 100
        return {
            "total_operations": self.stats["reads"] + self.stats["writes"] + self.stats["cache_hits"],
            "cache_hit_rate": f"{hit_rate:.1f}%",
            "money_saved_by_cache": f"Rs {self.stats['cache_hits'] * 0.05:.2f}"
        }

# ── The Brain: Your AI Processor ──
# This is where the magic happens!

class AIProcessor:
    """Processes requests using AI with smart optimizations.
    
    Real-world analogy: This is like a smart assistant.
    - Understands what you need (input processing)
    - Finds the best way to help (model selection)
    - Gives you a clear answer (output formatting)
    - Remembers common questions (caching)
    """
    
    def __init__(self, data_handler):
        self.data = data_handler
        self.request_log = []
        self.daily_cost = 0
        self.daily_limit_inr = 1000  # Rs 1000 per day max
    
    def process(self, query, context=None):
        """Process a query with full tracking.
        
        Steps (like making chai):
        1. Boil water (prepare the query)
        2. Add tea leaves (add context)
        3. Add milk and sugar (format nicely)
        4. Strain and serve (validate and return)
        """
        start_time = time.time()
        
        # Check daily budget
        if self.daily_cost >= self.daily_limit_inr:
            return self._error("Daily budget of Rs {self.daily_limit_inr} reached!")
        
        # Check cache - maybe we answered this before?
        cache_key = hashlib.md5(query.encode()).hexdigest()
        cached = self.data.load(cache_key)
        if cached:
            return {**cached, "from_cache": True, "cost_inr": 0}
        
        # Process the query
        try:
            result = self._generate_response(query, context)
            cost = self._estimate_cost(query, result)
            self.daily_cost += cost
            
            # Save to cache for next time
            response = {
                "answer": result,
                "confidence": 0.85,
                "cost_inr": round(cost, 4),
                "latency_ms": round((time.time() - start_time) * 1000),
                "from_cache": False
            }
            self.data.save(cache_key, response)
            
            # Log for analysis
            self.request_log.append({
                "query": query[:100],
                "cost": cost,
                "time": datetime.now().isoformat()
            })
            
            return response
            
        except Exception as e:
            return self._error(f"Processing failed: {str(e)}")
    
    def _generate_response(self, query, context):
        """Generate AI response. Replace with your actual AI call."""
        # This is where you plug in OpenAI, Anthropic, or local model
        return f"Processed: {query[:80]}"
    
    def _estimate_cost(self, query, result):
        """Estimate cost in INR."""
        tokens = (len(query.split()) + len(str(result).split())) * 1.3
        return tokens / 1000 * 0.01  # Rs 0.01 per 1K tokens
    
    def _error(self, message):
        return {"error": message, "cost_inr": 0}
    
    def daily_report(self):
        """Generate a daily report. Share this with your team!"""
        if not self.request_log:
            return "No requests processed today."
        
        total_requests = len(self.request_log)
        total_cost = sum(r["cost"] for r in self.request_log)
        
        return {
            "date": datetime.now().strftime("%d %B %Y"),
            "total_requests": total_requests,
            "total_cost": f"Rs {total_cost:.2f}",
            "avg_cost_per_request": f"Rs {total_cost/total_requests:.4f}",
            "projected_monthly_cost": f"Rs {total_cost * 30:,.2f}",
            "budget_status": "Within limits" if total_cost < self.daily_limit_inr else "OVER BUDGET!"
        }

# ── Run the complete system ──
if __name__ == "__main__":
    data = DataHandler()
    ai = AIProcessor(data)
    
    # Simulate real usage
    queries = [
        "What is our return policy?",
        "How to track my order?",
        "What is our return policy?",  # Same query - should hit cache!
        "I need a refund for order #12345",
    ]
    
    print("=== Processing Queries ===")
    for q in queries:
        result = ai.process(q)
        cached = "CACHED" if result.get("from_cache") else "NEW"
        cost = result.get("cost_inr", 0)
        print(f"  [{cached}] {q[:40]}... -> Cost: Rs {cost}")
    
    print("\\n=== Daily Report ===")
    report = ai.daily_report()
    for k, v in report.items():
        print(f"  {k}: {v}")
    
    print("\\n=== Data Handler Stats ===")
    for k, v in data.get_stats().items():
        print(f"  {k}: {v}")`,
      afterCode: `Let me break down what this code does in plain language:\n\nThe DataHandler is like a librarian. When you need information, you first check if it is in your pocket (cache). If yes, great — that is free and instant! If not, you go to the shelf (storage) and get it. Every time you find something, you keep a copy in your pocket for next time. This simple trick can save 30-50% of your AI costs.\n\nThe AIProcessor is the brain of the system. When a request comes in, it first checks the budget (are we still within our daily Rs 1,000 limit?), then checks the cache (have we answered this exact question before?), and only then calls the expensive AI model. After getting the answer, it saves it to cache and logs everything.\n\nNotice the daily_report function at the end. This is incredibly important. It tells you exactly how much you are spending, how many requests you are handling, and whether you are within budget. In Indian companies, being able to show your manager a clear cost report is the difference between "keep going" and "shut it down."\n\nThe most beautiful part? When we run the same query twice ("What is our return policy?"), the second time it comes from cache — zero cost, instant response. In a real system handling thousands of queries, this saves lakhs of rupees.`
    },
  ];

  // ── Testing & Validation section ──
  const testingSections = [
    {
      heading: `Step 3: Testing Your System (The Part Everyone Skips)`,
      body: `Here is a secret that experienced engineers know: the testing phase is where good AI systems become great ones. And it is the phase that most teams skip because it feels "boring." But skipping testing is like skipping the brake test on a new car. Everything seems fine... until it is not.\n\nLet me show you how to test your ${tagInline} system properly. I promise to make it as painless as possible.`,
      list: [
        `<strong>Happy path testing</strong> — Does it work when everything is perfect? Give it clean, clear inputs and check if the outputs make sense. This is like testing if your car starts and drives forward.`,
        `<strong>Edge case testing</strong> — What happens with weird inputs? Empty strings, very long text, special characters, Hindi text mixed with English. This is like testing if your car handles potholes and speed bumps.`,
        `<strong>Load testing</strong> — Can it handle many requests at once? If 100 users ask questions simultaneously, does it crash or slow down? This is like testing if your car works in Bangalore traffic, not just on an empty highway.`,
        `<strong>Cost testing</strong> — Run 1,000 sample requests and check the total cost. Multiply by your expected daily volume. Is it within budget? Many teams discover their system costs 10x more than expected only after launch.`,
        `<strong>Failure testing</strong> — What happens when the AI model is down? When the internet is slow? When the database is full? Your system should fail gracefully, not crash spectacularly.`,
      ],
      afterList: `Create a simple test file with 50-100 test cases. Include normal questions, tricky questions, questions in Hindi, very long questions, and completely irrelevant questions. Run these tests every time you make a change. This takes 5 minutes and can save you from embarrassing failures in production.`
    },
    {
      heading: `Step 3: Making Sure It Actually Works`,
      body: `You have built your system. It works on your laptop. You are excited. But before you show it to anyone, you need to test it properly. I have seen too many demos go wrong because someone typed something unexpected and the whole system crashed.\n\nTesting an AI system is different from testing regular software. With regular software, the same input always gives the same output. With AI, the output can vary. So how do you test something that is not deterministic? Here is my approach:`,
      list: [
        `<strong>Create a "golden dataset"</strong> — Write 50 questions and their ideal answers. These are your reference points. Run your system on these 50 questions and score how close the answers are to ideal. This is your baseline score.`,
        `<strong>Test with real Indian data</strong> — Include questions in Hinglish (Hindi + English mix), questions with Indian names and places, questions about Indian-specific topics (GST, Aadhaar, UPI). Many AI systems work great with American English but struggle with Indian context.`,
        `<strong>Test the boundaries</strong> — What is the longest question it can handle? What happens with an empty question? What if someone sends an image instead of text? What if someone tries to trick the AI into saying something inappropriate?`,
        `<strong>Test the costs</strong> — Process your 50 test questions and check the total cost. Now multiply by your expected daily volume. If 50 questions cost Rs 5, and you expect 5,000 questions per day, that is Rs 500/day or Rs 15,000/month. Is that within your budget?`,
        `<strong>Test with real users</strong> — Give it to 5-10 colleagues and ask them to use it naturally for a day. Watch what they do. The questions real users ask are always different from what you imagined.`,
      ],
      afterList: `The most important thing about testing is to do it BEFORE launch, not after. Fixing a bug before launch costs you an hour. Fixing the same bug after 1,000 customers have seen it costs you a week plus a lot of apologetic emails.`
    },
  ];

  // ── Production & Monitoring ──
  const productionSections = [
    {
      heading: `Step 4: Going Live — The Launch Checklist`,
      body: `You have built it. You have tested it. Now it is time to go live. But do not just flip a switch and hope for the best. Use this checklist — I call it the "sleep peacefully at night" checklist because if you complete it, you will not get panic calls at 2 AM.\n\nBefore launch, make sure you have:`,
      list: [
        `<strong>Monitoring dashboard</strong> — You should be able to see, at a glance, how many requests are coming in, what the average response time is, how much money you are spending, and if there are any errors. Tools like Grafana (free) or even a simple Google Sheet work.`,
        `<strong>Cost alerts</strong> — Set up an alert that sends you a WhatsApp message or email if daily spending exceeds your budget. This is non-negotiable. I have seen teams get surprise bills of Rs 5 lakh because nobody was watching the costs.`,
        `<strong>Error handling</strong> — When (not if) something goes wrong, your system should show a friendly message to the user, not a scary error page. Something like "I am having trouble right now. Let me connect you with a human agent" is much better than a blank screen.`,
        `<strong>Rollback plan</strong> — If the new AI system is causing problems, you should be able to switch back to the old system within 5 minutes. Always keep the old system running in parallel for the first month.`,
        `<strong>Gradual rollout</strong> — Do not launch to 100% of users on day one. Start with 5%, then 20%, then 50%, then 100%. This way, if something is wrong, only a small percentage of users are affected.`,
      ],
      afterList: `The first week after launch is the most critical. Check your dashboard every few hours. Read the logs. Talk to users. You will find issues that no amount of testing could have caught. That is normal. Fix them quickly, and within a month, your system will be running smoothly.`
    },
  ];

  // ── Lessons & Tips ──
  const lessonsSections = [
    {
      heading: `Lessons I Learned the Hard Way (So You Do Not Have To)`,
      body: `After helping dozens of Indian teams implement ${tagInline}, I have collected a list of lessons that I wish someone had told me when I started. Each of these comes from a real mistake that cost real money and real time.\n\n<strong>Lesson 1: Start with the cheapest model that works.</strong> Everyone wants to use GPT-4 or Claude Opus. But for most tasks, GPT-4o-mini or even a fine-tuned small model works just as well at 1/10th the cost. I worked with a team that switched from GPT-4 to GPT-4o-mini and saved Rs 2 lakh per month with zero quality drop.\n\n<strong>Lesson 2: Cache everything.</strong> In most applications, 30-40% of queries are repeated or very similar. A simple cache can cut your costs by a third. One team I worked with reduced their monthly bill from Rs 90,000 to Rs 55,000 just by adding caching.\n\n<strong>Lesson 3: Log every single request.</strong> When something goes wrong (and it will), your logs are your detective toolkit. Without logs, debugging is like finding a needle in a haystack. With logs, it is like following a trail of breadcrumbs.\n\n<strong>Lesson 4: Set budget alerts before you need them.</strong> AI costs can spike unexpectedly. A bug in your code might cause it to call the API in an infinite loop. Without a budget alert, you could wake up to a bill of Rs 50,000 for one night of runaway requests.\n\n<strong>Lesson 5: Talk to your users every week.</strong> The best improvements come from watching real users interact with your system. They will use it in ways you never imagined, ask questions you never expected, and find bugs you never knew existed.`
    },
  ];

  // ── Assemble using seed for variety ──
  const whyStory = seededPick(whyStories, seed);
  const practical = seededPick(practicalSections, seed + 1);
  const codeWalk = seededPick(codeWalkthroughs, seed + 2);
  const testing = seededPick(testingSections, seed + 3);
  const production = seededPick(productionSections, seed + 4);
  const lessons = seededPick(lessonsSections, seed + 5);
  const intro = seededPick(intros, seed + 6);

  const escapedCode = codeWalk.code.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  return { intro, whyStory, practical, codeWalk, escapedCode, testing, production, lessons };
}

module.exports = { buildPlaybookArticle };
