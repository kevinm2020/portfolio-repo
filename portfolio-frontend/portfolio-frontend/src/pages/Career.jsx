import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./Career.css";



function Career() {

    const skills = [
    { name: "Java", level: 4 },
    { name: "C++", level: 4 },
    { name: "React", level: 4 },
    { name: "Spanish", level: 5 },
    { name: "JSX & JavaScript", level: 4 },
    { name: "HTML + CSS", level: 5 },
    { name: "Music Production (Ableton)", level: 3 },
    { name: "Python", level: 3 },
    ];

    const learning = [
    "Kubernetes",
    "AWS",
    "Docker",
    "Microservices Architecture",
    "Unity 3D Game Development",
    "Ai agents",
    ];




    return (

        <div className="career-page">

            <h1>Career History & Skill Matrix </h1>

            <section>
                <h2> Career Timeline </h2>
                
                 <VerticalTimeline>

                    <VerticalTimelineElement
                        date="December 2025 - Present"
                        title="Infosys"
                        subtitle="Software Developer"
                    >
                        <h3>
                            Infosys
                        </h3>

                        <p>
                            Participating in structured training and self-driven learning focused on backend development and enterprise technologies. Building technical proficiency through hands-on practice, problem-solving, and independent study of real-world software engineering concepts.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        date="June 2025 - December 2025"
                        title="Revature "
                        subtitle="Trainee"
                    >
                        <h3>
                            Revature
                        </h3>

                        <p>
                            Completed an intensive training program focused on Java and REST API application development. Built backend services and full-stack applications while strengthening skills in data structures, problem-solving, and real-world software development practices.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        date="Decemeber 2024 - March 2024"
                        title="Texas Financial Advisors"
                        subtitle="Junior Finicial Consultant"
                    >
                        <h3>
                            Texas Financial Advisors
                        </h3>

                        <p>
                            Provided client advisory support focused on 401(k) planning and asset management, developing strong communication and analytical skills. Worked with structured financial data to support decision-making in a professional environment. Earned the SIE and Series 65 certifications, demonstrating knowledge of financial systems, regulations, and investment principles.
                        </p>
                    </VerticalTimelineElement>

                     <VerticalTimelineElement
                        date="September 2020 - December 2024"
                        title="University of Texas at Dallas"
                        subtitle="B.S. in Computer Science"
                    >
                        <h3>
                            University of Texas at Dallas
                        </h3>

                        <p>
                            Pursued a B.S. in Computer Science, building a strong foundation in algorithms, data structures, and software engineering. Completed projects involving full-stack development and system design principles.
                        </p>
                    </VerticalTimelineElement>
                    </VerticalTimeline>
            </section>

            <section>
                <h2>Skills Matrix</h2>
                <div className="skills-container">
                {skills.map((skill) => (
                    <div key={skill.name} className="skill">
                    <span className="skill-name">{skill.name}</span>

                    <div className="skill-bar">
                        <div
                        className="skill-fill"
                        style={{ width: `${skill.level * 20}%` }}
                        />
                    </div>
                    </div>
                ))}
                </div>
            </section>

            <section>
                <h2>Currently Learning</h2>

                <div className="learning-container">
                    {learning.map((item) => (
                    <span key={item} className="learning-tag">
                        {item}
                    </span>
                    ))}
                </div>
            </section>

        </div>
        
    );
}

export default Career;