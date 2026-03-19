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
                        <p>
                        
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        date="June 2025 - December 2025"
                        title="Revature "
                        subtitle="Trainee"
                    >
                        <p>
                        
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        date="Decemeber 2024 - March 2024"
                        title="Texas Financial Advisors"
                        subtitle="Junior Finicial Consultant"
                    >
                        <p>
                        
                        </p>
                    </VerticalTimelineElement>

                     <VerticalTimelineElement
                        date="September 2020 - December 2024"
                        title="University of Texas at Dallas"
                        subtitle="B.S. in Computer Science"
                    >
                        <p>
                        
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