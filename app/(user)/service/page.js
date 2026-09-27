import Image from "next/image";
import styles from "./service.module.css";

const team = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Full Stack Developer",
    image: "/men1.jpeg",
    experience: "5+ Years Experience",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "UI/UX Designer",
    image: "/women1.jpg",
    experience: "4+ Years Experience",
  },
  {
    id: 3,
    name: "Aman Kumar",
    role: "Frontend Developer",
    image: "/men2.jpg",
    experience: "3+ Years Experience",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Backend Developer",
    image: "/women2.jpg",
    experience: "4+ Years Experience",
  },
];

const services = [
  {
    title: "Web Development",
    description:"Modern, responsive and scalable websites built with the latest technologies.",
    icon: "💻",
  },
  {
    title: "Mobile Development",
    description:"Fast and user-friendly mobile applications for Android and iOS platforms.",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description:"Clean and engaging user experiences designed around your business needs.",
    icon: "🎨",
  },
];

export default function Service() {
  return (
    <main className={styles.servicePage}>
      <section className={styles.teamSection}>
        <div className={styles.sectionHeading}>
          <span>OUR TEAM</span>
          <h2>Meet Our Experts</h2>
          <p>A talented team of developers, designers and technology experts working together to create great products.</p>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div className={styles.teamCard} key={member.id}>
              <div className={styles.imageWrapper}>
                <Image src={member.image} alt={member.name} width={500} height={500} />
              </div>

              <div className={styles.teamInfo}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.experience}>{member.experience}</p>

                <div className={styles.socialLinks}>
                  <a href="#">in</a>
                  <a href="#">gh</a>
                  <a href="#">tw</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}