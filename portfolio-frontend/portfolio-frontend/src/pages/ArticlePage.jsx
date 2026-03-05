const articles = 
{
  "introduction-to-ai-and-agents": 
  {
    title: "Introduction to AI and Agents",
    author: "Kevin Martinez",
    content: (
      <>
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

        
      </>
    )
  },

  "aws-and-splunk-overview": {
    title: "AWS and Splunk: A Beginner-Friendly Overview",
    author: "Kevin Martinez",
    content: (
      <>
        <h2>Sections</h2>
        <ol>
          <li>The Problem: Running Software in Production</li>
          <li>What AWS Does</li>
          <li>What Splunk Does</li>
          <li>How do Splunk and AWS connect in a real system</li>
          <li>Real World Example Architecture</li>
          <li>Why this matters for engineers</li>
        </ol>

        <h2>Section 01: The Problem: Running Software in Production</h2>
        <p>
        Most of my life all of my code has been executed and hosted locally on my laptop. It’s easy to execute the program and observe the output and adjust accordingly. But clearly real-world applications do not run on local laptops. They run on servers that must be available 24/7, accessible from anywhere in the world, and capable of handling thousands or millions of user traffic. This scaling introduces two fundamental challenges:
        </p>
        <ul>
          <li>Where does the application run?</li>
          <li>How do you know what the application is doing?</li>
        </ul>
        <p>
        Solutions to these problems arise in the field of cloud platforms and monitoring tools. Cloud providers like AWS run the infrastructure, and monitoring platforms like Splunk help engineers observe and understand system behavior.
        </p>

        <h2>Section 02: What AWS Does: Infrastructure in the Cloud</h2>
        <p>
        Amazon Web Services (AWS) is a cloud computing platform that provides the infrastructure required to run modern applications. Instead of maintaining physical servers, companies are able to rent computing resources on demand.
        </p>
        <p>
        Cloud Computing might sound intimidating. You think you need to know every nook and cranny over all AWS services. But I find it helpful to have a baseline understanding of every service, their use cases, and processes. This way you can select which services are the ones you need and go from there.
        </p>
        <p>Without further ado, here are the essential AWS core services that form the backbone of most systems:</p>

        <h3>Compute (EC2)</h3>
        <p>
        EC2 allows engineers to launch virtual servers in the cloud. These servers serve as the hosting platform for backend applications, APIs, or any custom software. 
        </p>

        <h3>Storage (S3)</h3>
        <p>
        S3 provides scalable storage for files such as images, videos, backups, and system data. It diverts away from typical database storage.
        </p>

        <h3>Databases (RDS)</h3>
        <p>
        RDS allows engineers to run relational databases like PostgreSQL or MySQL without managing the underlying hardware. Industry-ready DB services.
        </p>

        <h3>Serverless Execution (Lambda)</h3>
        <p>
        Lambda allows code to run automatically in response to events, without managing servers directly. Having a server 24/7 online for minimal procedures is excessive and expensive; Lambda allows software execution based on the execution time of the operation. 
        </p>

        <h3>Access Control (IAM)</h3>
        <p>
        IAM manages permissions, ensuring that users and services can only access what they are authorized to use. 
        </p>

        <p>
        As you can see, a combination of these core services really builds a strong backbone for hosting applications in a computational environment that is safe, scalable, and affordable.
        </p>

        <h2>Section 03: What Splunk Does: Observing and Monitoring</h2>
        <p>
        As I mentioned before, we are now running applications on cloud servers, not on our laptops. Monitoring behavior of a server application across the cloud is different than being able to monitor it locally. Therefore, a need for standard monitoring tools and techniques arises as we orchestrate and coordinate various cloud services to ensure they are working efficiently.
        </p>
        <p>
        Monitoring is usually done with logs. Logs vary in the information they contain but they all try to capture essential application behavior metrics such as:
        </p>
        <ul>
          <li>User Login Attempts</li>
          <li>API Requests</li>
          <li>Database Queries</li>
          <li>Error Messages</li>
          <li>Performance Metrics</li>
        </ul>
        <p>
        Splunk is a platform designed to collect, store, search, and analyze these logs. Automation to log overview makes it possible to quickly diagnose issues, monitor performance, and understand system behavior. Splunk allows engineers to create dashboards and alerts. This visibility is critical to maintaining reliable production systems.
        </p>
        <p>
        Splunk is most helpful when an application is in production and exposed to the public, as it gives a pulse check of the system amidst vast user traffic.
        </p>

        <h2>Section 04: How AWS and Splunk Connect in a Real System</h2>
        <p>
        AWS provides the environment where applications run, and those applications continuously generate logs. Splunk collects and analyzes those logs to provide visibility. It does not get any more complicated than that!
        </p>

        <h2>Section 05: Example: Image Upload System</h2>
        <p>
        Consider a simple application feature where users upload profile pictures. The system might work like this:
        </p>
        <ol>
          <li>A user uploads an image through a web application (Frontend).</li>
          <li>The backend servers running in EC2 receive the image.</li>
          <li>The image is stored in S3.</li>
          <li>A Lambda function processes the image.</li>
          <li>Metadata about the image is stored in a database such as RDS.</li>
        </ol>
        <p>
        Throughout each step of this process we can generate logs. We can log for successful/unsuccessful uploads, processing steps, and errors along the way. Splunk will collect all these logs and allow engineers to monitor the system. If the upload feature starts failing, engineers can search Splunk to identify the cause quickly.
        </p>

        <h2>Section 06: Why This Matters for Software Engineers</h2>
        <p>
        Understanding the relationship between cloud infrastructure and monitoring is essential for modern software engineering. Writing code is only part of building real systems. Engineers need to understand how software runs in production and how to monitor and maintain it.
        </p>
        <p>
        As more systems move to the cloud, understanding infrastructure and observability becomes increasingly valuable. Learning these tools not only improves technical ability but also provides insight into how real-world systems operate at scale.
        </p>
      </>
    ),
  },

  "application-shipping-and-deployment": {
  title: "Application Shipping and Deployment for Beginners",
  author: "Kevin Martinez",
  content: (
    <>
      <h2>Chapter 01: The Situation I am in</h2>
      <p>
        I developed my portfolio website with Spring Boot and React. I’ve also always avoided website deployment because it seems too exhaustive and boring to me. In the industry, there are entire cloud and deployment teams. As a website developer, I just wanted to focus on making my site look nice, not having to deal with getting it to the expansive and eternal internet we know today. But why not take a stab at learning something new.
      </p>
      <p>
        In fact, I am forced to. If no one can access my portfolio website, it’s like I nor my professional career exists. A lesson I learned in life is that usually what you avoid is what you must do next.
      </p>
      <p>
        My application is currently running on my laptop: Localhost:3000 & Localhost:8080. Shipping and Deployment is essentially getting out of my laptop. I want the frontend to live on a server. The backend will run continuously on a machine with a public IP address. When users visit my domain, their browser will load the frontend I’ve developed. From there the frontend will make HTTP requests to the backend running on the machine.
      </p>
      <p>
        I will be choosing Render Static Site to host my frontend and Render Web Service for the backend. At a high level, these are the steps:
      </p>
      <ul>
        <li>Package Backend</li>
        <li>Deploy Backend</li>
        <li>Build Frontend</li>
        <li>Deploy Frontend</li>
        <li>Fix CORS</li>
        <li>Update API URL</li>
      </ul>

      <h2>Chapter 2: Time to Start - Backend</h2>
      <ol>
        <li>Upload Backend to GitHub</li>
        <li>Go to Render and Create an Account</li>
        <li>Set up Render Web Service to GitHub Repo</li>
        <li>Enable CORS</li>
        <li>Deploy</li>
      </ol>
      <p>
        This is what the end goal looks like (picture). I want to talk about a challenge I faced, because that is how you learn if you encounter it again.
      </p>
      <h3>Challenges</h3>
      <p>
        The Render Service does not support Java directly; it must use a Docker container of my application, which is what it’s hosting on the server. Containerized applications are a great skill to begin. I’ll have to write a chapter about it later. The challenge was writing and implementing Docker for the first time.
      </p>

      <h2>Frontend</h2>
      <p>
        The Frontend follows a similar approach. I will also be using Render. Now that the backend is live on a server, what does this mean? Our frontend is still doing backend calls to the localhost endpoint. We must swap that URL for the one where the Render server hosts our application. Make sure to enable CORS configuration.
      </p>
      <h3>Challenges</h3>
      <p>
        A challenge I faced on this issue was setting up the CORS configuration. It took me a few attempts to get the security just right so the frontend can successfully touch the backend.
      </p>

      <h2>Next Steps</h2>
      <p>
        Next steps for me are debugging the application so the services work. Sometimes what works on your laptop does not fully translate into production-ready servers. Fix accordingly.
      </p>
    </>
  )
}
};

































import { useParams } from "react-router-dom";

function ArticlePage() {

  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Article Not Found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{article.title}</h1>
      <h3>Written by {article.author}</h3>
      <hr style={{ margin: "2rem 0" }} />
      {article.content}
    </div>
  );
}

export default ArticlePage;