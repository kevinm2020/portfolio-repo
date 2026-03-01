import { useParams } from "react-router-dom";

function ArticlePage() {

  const { id } = useParams();

  return (
    
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>

      <h1>{id}</h1>
      <h2>Written by Kevin Martinez</h2>

      <h2>Chapter 00: Introduction and Beginnings</h2>

      <p>
        I started my tech career at an IT consulting company. Fresh out of college, with just enough Java knowledge to get by, I entered the field ready to make my mark. But in the corporate rat race, you often find yourself dropped at the very back of the line. Technology thrives on rapid innovation and brilliance, and I felt small in its vastness.
      </p>

      <p>
        I was born in 2001, so I never knew a world without the internet. Growing up alongside technology gave me confidence—I assumed my familiarity with it would carry me far. Yet, as I stepped into the professional world, I felt like I had arrived too late. AI was emerging everywhere, promising to reshape everything I was learning.
      </p>

      <p>
        At first, I avoided AI. It always seemed too advanced, the domain of elite graduate students or Silicon Valley prodigies. But one meeting changed everything. My manager mentioned that the very Java fundamentals I had once thought trivial could serve as a gateway into learning about AI and intelligent agents.
      </p>

      <p>
        Sometimes, the thing we avoid the most finds us anyway. For me, it wasn’t just about mastering a challenging new concept—it was about confronting the limitations I had set for myself.
      </p>


      <h2>Chapter 01: What is an Agent?</h2>

      <h3>Definition</h3>

      <blockquote>
        “A software entity that perceives its environment through sensors and acts upon that environment through actuators in order to achieve goals.”
      </blockquote>

      <p>This definition has three core components:</p>

      <ul>
        <li><strong>Perception:</strong> Gathering data from input sources such as users, APIs, or databases.</li>
        <li><strong>Action:</strong> Acting upon collected data.</li>
        <li><strong>Goal-oriented behavior:</strong> Acting intentionally to achieve defined goals.</li>
      </ul>


      <h3>Types of Agents</h3>

      <ul>
        <li><strong>Simple Reflex Agent:</strong> Acts based on current input only (example: thermostat).</li>
        <li><strong>Model-Based Agent:</strong> Maintains internal state (example: robot vacuum).</li>
        <li><strong>Goal-Based Agent:</strong> Acts to achieve goals (example: chess engine).</li>
        <li><strong>Utility-Based Agent:</strong> Optimizes outcomes (example: stock recommendation system).</li>
        <li><strong>Learning Agent:</strong> Improves through experience (example: AI chatbot).</li>
      </ul>


      <h3>Key Characteristics</h3>

      <ul>
        <li>Autonomy</li>
        <li>Social ability</li>
        <li>Reactivity</li>
        <li>Proactiveness</li>
        <li>Adaptability</li>
      </ul>


      <h3>Industry Applications</h3>

      <ul>
        <li>Automation</li>
        <li>Conversational agents</li>
        <li>Autonomous agents</li>
        <li>Multi-agent systems</li>
      </ul>


      <h3>Career Outlook</h3>

      <p>Learning about AI agents opens the door to roles such as:</p>

      <ul>
        <li>AI Engineer</li>
        <li>Machine Learning Engineer</li>
        <li>Applied AI Engineer</li>
        <li>Automation / Agent Engineer</li>
      </ul>

      <p><strong>Salary expectations:</strong></p>

      <ul>
        <li>Entry Level: $80,000 – $120,000</li>
        <li>Mid Level: $110,000 – $160,000</li>
        <li>Senior Level: $150,000 – $220,000+</li>
        <li>Top roles: $180,000 – $300,000+</li>
      </ul>


      <h2>Chapter 02: Genesis – Building an Agent From Scratch</h2>

      <h3>Agent Architecture</h3>

      <p>
        An agent consists of three layers:
      </p>

      <ul>
        <li>Perception</li>
        <li>Reasoning</li>
        <li>Action</li>
      </ul>

      <p>The core loop:</p>

      <p>
        User Input → Processing → Decision → Response
      </p>


      <h3>Limitations of Simple Agents</h3>

      <ul>
        <li>Cannot answer beyond predefined rules</li>
        <li>Cannot learn from new information</li>
        <li>Cannot remember interactions</li>
      </ul>


      <h3>Large Language Models</h3>

      <p>
        Instead of hardcoding responses, modern agents use language models to generate intelligent responses dynamically.
      </p>

      <p>Future enhancements include:</p>

      <ul>
        <li>Persistent memory</li>
        <li>Tool usage</li>
        <li>Multi-step reasoning</li>
        <li>Autonomous decision making</li>
      </ul>


      <h3>Summary</h3>

      <ul>
        <li>Agents use perception, reasoning, and action</li>
        <li>Language models provide intelligence</li>
        <li>Architecture scales to enterprise systems</li>
      </ul>

      <p>In the next chapter, we will build a simple agent together and explore how to enhance it with memory and tool usage.</p>

      

    </div>
  );
}

export default ArticlePage;