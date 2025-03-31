const members = [
  {
    name: "Ana Gómez",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "Project Leader",
    projects: ["Sistema de Gestión Empresarial", "Plataforma de E-commerce"],
    inTeam: true,
  },
  {
    name: "Carlos Pérez",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "Engineering Architect",
    projects: ["Sistema de Gestión Empresarial", "Aplicación de Reservas"],
    inTeam: true,
  },
  {
    name: "Laura Sánchez",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    role: "Account Manager",
    projects: ["Plataforma de E-commerce", "App Móvil"],
    inTeam: true,
  },
  {
    name: "Diego Ramírez",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    role: "Software Engineer",
    projects: ["Sistema de Gestión Empresarial", "App Móvil"],
    inTeam: false,
  },
  {
    name: "Mariana López",
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
    role: "UX/UI Designer",
    projects: ["Plataforma de E-commerce", "Aplicación de Reservas"],
    inTeam: true,
  },
  {
    name: "Javier Torres",
    photo: "https://randomuser.me/api/portraits/men/6.jpg",
    role: "Frontend Developer",
    projects: ["Sistema de Gestión Empresarial", "App Móvil"],
    inTeam: true,
  },
  {
    name: "Sofía Herrera",
    photo: "https://randomuser.me/api/portraits/women/7.jpg",
    role: "Backend Developer",
    projects: ["Plataforma de E-commerce", "App Móvil"],
    inTeam: false,
  },
  {
    name: "Luis Fernández",
    photo: "https://randomuser.me/api/portraits/men/8.jpg",
    role: "Full Stack Developer",
    projects: ["Sistema de Gestión Empresarial", "Aplicación de Reservas"],
    inTeam: true,
  },
  {
    name: "Elena Castro",
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
    role: "Data Analyst",
    projects: ["Sistema de Gestión Empresarial", "Plataforma de E-commerce"],
    inTeam: false,
  },
  {
    name: "Fernando Ruiz",
    photo: "https://randomuser.me/api/portraits/men/10.jpg",
    role: "DevOps Engineer",
    projects: ["Plataforma de E-commerce", "Sistema de Gestión Empresarial"],
    inTeam: false,
  },
  {
    name: "Clara Moreno",
    photo: "https://randomuser.me/api/portraits/women/11.jpg",
    role: "QA Engineer",
    projects: ["Plataforma de E-commerce", "App Móvil"],
    inTeam: true,
  },
  {
    name: "Gabriel Silva",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    role: "Database Administrator",
    projects: ["Sistema de Gestión Empresarial", "Aplicación de Reservas"],
    inTeam: false,
  },
  {
    name: "Paula Méndez",
    photo: "https://randomuser.me/api/portraits/women/13.jpg",
    role: "Product Manager",
    projects: ["Aplicación de Reservas", "Plataforma de E-commerce"],
    inTeam: true,
  },
  {
    name: "Ricardo Orozco",
    photo: "https://randomuser.me/api/portraits/men/14.jpg",
    role: "Security Engineer",
    projects: ["Sistema de Gestión Empresarial", "App Móvil"],
    inTeam: false,
  },
  {
    name: "Andrea Bustamante",
    photo: "https://randomuser.me/api/portraits/women/15.jpg",
    role: "Business Analyst",
    projects: ["Plataforma de E-commerce", "Aplicación de Reservas"],
    inTeam: true,
  },
  {
    name: "Hugo Torres",
    photo: "https://randomuser.me/api/portraits/men/16.jpg",
    role: "Scrum Master",
    projects: ["Sistema de Gestión Empresarial", "Plataforma de E-commerce"],
    inTeam: false,
  },
  {
    name: "Verónica Salazar",
    photo: "https://randomuser.me/api/portraits/women/17.jpg",
    role: "Software Engineer",
    projects: ["Aplicación de Reservas", "App Móvil"],
    inTeam: true,
  },
  {
    name: "Daniel Espinoza",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
    role: "Technical Writer",
    projects: ["Sistema de Gestión Empresarial", "Plataforma de E-commerce"],
    inTeam: false,
  },
  {
    name: "Natalia Fuentes",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
    role: "Marketing Specialist",
    projects: ["Plataforma de E-commerce", "Aplicación de Reservas"],
    inTeam: true,
  },
  {
    name: "Pablo Estrada",
    photo: "https://randomuser.me/api/portraits/men/20.jpg",
    role: "Customer Support",
    projects: ["Sistema de Gestión Empresarial", "App Móvil"],
    inTeam: false,
  },
];

class RouterController {
  async getMembers(req, res) {
    try {
      if (!members) {
        return res.status(404).json({ error: "Members not found" });
      }
      return res.status(200).send(users);
    } catch (error) {
      console.log("error from controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new RouterController();
