import Image from "next/image";
import { resume } from "@/data/resume";
import { Resume } from "@/types/resume";
import Typewriter from "./Typewriter";

const categoryLabels: Record<keyof Resume["skills"], string> = {
  languages: "Languages", backend: "Backend", databases: "Databases", frontend: "Frontend",
  devopsTools: "DevOps & Tools", cloudStorage: "Cloud & Storage", domain: "Domain Expertise",
};

const navItems = ["About", "Skills", "Work", "Projects"];

const migrations = [
  "Java 8 → Java 21 upgrades across multiple projects",
  "GitLab → GitHub: moved repositories and rebuilt GitLab pipelines as organization-standard GitHub Actions workflows",
  "GitLab CI secrets → HashiCorp Vault",
  "Popcorn starter parent → open-spring starter parent",
  "Version-controlled SQL schema and data migrations with Flyway",
  "Unit test result reporting set up in CI pipelines",
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="noise" />

      <header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-sm text-slate-950">S</span>
            <span className="hidden sm:block">{resume.name}</span>
          </a>
          <div className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
          </div>
          <a href="#contact" className="rounded-full border border-cyan-200/20 bg-white/10 px-4 py-2 text-xs font-medium text-cyan-50 transition hover:bg-white/20">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section id="top" className="relative min-h-screen px-6 pb-16 pt-36 sm:pt-40">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-6xl flex-col justify-center">
          <div className="hero-grid items-end gap-10">
            <div>
              <div className="eyebrow mb-6"><span className="status-dot" /> Available for select opportunities</div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/70">Software Developer  · India</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
  Effortless <span className="text-gradient">engineering</span>
  <br />
  <Typewriter
    options={{
      strings: [
        "isn't just about code, anymore."
      ],
      autoStart: true,
      loop: true,
      delay: 70,
      
    }}
  />
</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {resume.summary || "I build dependable web products with thoughtful interfaces, clear APIs, and systems made to last."}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={`mailto:${resume.contact.email}`} className="button-primary">Start a conversation <span aria-hidden="true">→</span></a>
                <a href="#projects" className="button-secondary">Explore my work</a>
              </div>
            </div>
            <aside className="hero-portrait">
              <Image src="/shashwat-portrait.png" alt="Stylized portrait of Shashwat Singh Chauhan" width={1254} height={1254} priority className="hero-portrait-image" />
              <div className="mb-7 flex items-center justify-between"><span className="eyebrow">Quick profile</span><span className="text-cyan-200">✦</span></div>
              <div className="space-y-5">
                <div><p className="label">Email</p><a className="profile-value" href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a></div>
                <div><p className="label">Based in</p><p className="profile-value">India · Working globally</p></div>
                <div><p className="label">Focus</p><p className="profile-value">Backend · Full stack · Integrations</p></div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-5"><a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-100 hover:text-white">LinkedIn profile <span>↗</span></a></div>
            </aside>
          </div>
          <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-12 bg-slate-600" /> Scroll to discover</div>
        </div>
      </section>

      <section id="about" className="section-wrap px-6 py-24"><div className="mx-auto max-w-6xl">
        <SectionIntro number="01" eyebrow="About" title="Shashwat Singh Chauhan" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="glass-card p-7 sm:p-9">
            <p className="max-w-2xl text-xl leading-9 text-slate-200">I&apos;m a backend Java developer with 1.8 years of experience building and modernizing enterprise systems. Over the last year I&apos;ve specialized in migrations: moving platforms forward without breaking what already works.</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Beyond migrations, I lead root cause analysis on production issues across systems with a C# frontend and Java server, monitor Datadog logs, and remediate ArmorCode security findings. I&apos;m comfortable working in both GitLab and GitHub.</p>
            <p className="label mt-10">Migrations I&apos;ve led</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">{migrations.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}</ul>
            <div className="mt-10 flex flex-wrap gap-2">{resume.skills.domain.map((item) => <span key={item} className="skill-pill">{item}</span>)}</div>
          </div>
          <div className="glass-card grid place-content-center p-8"><p className="text-6xl font-semibold tracking-[-.08em] text-gradient">1.8 yrs</p><p className="mt-3 max-w-[13rem] text-sm leading-6 text-slate-400">Backend Java experience, with the last year focused on platform migrations.</p></div>
        </div>
      </div></section>

      <section id="skills" className="section-wrap px-6 py-24"><div className="mx-auto max-w-6xl">
        <SectionIntro number="02" eyebrow="Capabilities" title="The tools behind the thinking." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(resume.skills) as [keyof Resume["skills"], string[]][]).map(([category, items], index) => <article key={category} className="glass-card group p-6"><div className="mb-7 flex items-center justify-between"><h3 className="text-lg font-medium text-white">{categoryLabels[category]}</h3><span className="text-xs text-slate-500">0{index + 1}</span></div><div className="flex flex-wrap gap-2">{items.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}</div></article>)}
        </div>
      </div></section>

      <section id="work" className="section-wrap px-6 py-24"><div className="mx-auto max-w-6xl">
        <SectionIntro number="03" eyebrow="Experience" title="Building impact, one system at a time." />
        <div className="mt-12 space-y-4">{resume.experience.map((item, index) => {
          const companyStyle = item.company.toLowerCase().includes("genpact") ? "genpact" : item.company.toLowerCase().includes("blockstash") ? "blockstash" : "default";
          const logoName = companyStyle === "genpact" ? "GENPACT" : companyStyle === "blockstash" ? "blockstash" : item.company.split(",")[0];
          const logoSource = companyStyle === "genpact" ? "/genpact-logo-black.png" : companyStyle === "blockstash" ? "/blockstash-logo.png" : null;

          return <article key={`${item.title}-${item.company}`} className={`glass-card experience-card experience-card--${companyStyle} p-6 sm:p-8`}>
            <div className="company-watermark" aria-hidden="true">
              {logoSource ? <Image src={logoSource} alt="" width={860} height={260} className="company-logo" /> : <span>{logoName}</span>}
            </div>
            <div className="experience-content grid gap-5 md:grid-cols-[.7fr_1.4fr] md:gap-10"><div><p className="text-sm text-cyan-100/80">0{index + 1} / {item.period}</p><h3 className="mt-2 text-xl font-medium text-white">{item.title}</h3><p className="mt-1 text-slate-400">{item.company}</p></div><ul className="space-y-3 text-sm leading-6 text-slate-300">{item.highlights.slice(0, 4).map((highlight) => <li key={highlight} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{highlight}</li>)}</ul></div>
          </article>;
        })}</div>
      </div></section>

      <section id="projects" className="section-wrap px-6 py-24"><div className="mx-auto max-w-6xl">
        <SectionIntro number="04" eyebrow="Selected work" title="Ideas brought into the real world." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">{resume.projects.map((project, index) => <article key={project.title} className="glass-card project-card p-7 sm:p-8"><div className="mb-12 flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sm text-cyan-100">0{index + 1}</span><span className="text-right text-xs uppercase tracking-wider text-slate-500">{project.client}<br />{project.period}</span></div><h3 className="text-2xl font-medium text-white">{project.title}</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">{project.details.map((detail) => <li key={detail} className="flex gap-3"><span className="text-violet-300">✦</span>{detail}</li>)}</ul></article>)}</div>
      </div></section>

      <section id="contact" className="px-6 pb-16 pt-24"><div className="contact-panel mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-8 sm:p-14"><p className="eyebrow">Let&apos;s create something meaningful</p><div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-.045em] text-white sm:text-6xl">Have a project in mind?</h2><div className="shrink-0"><a href={`mailto:${resume.contact.email}`} className="button-primary">Get in touch <span aria-hidden="true">→</span></a><p className="mt-4 text-center text-sm text-slate-400">{resume.contact.mobile}</p></div></div></div></section>
      <footer className="px-6 pb-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t border-white/10 pt-7 text-sm text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} {resume.name}</span><a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a></div></footer>
    </main>
  );
}

function SectionIntro({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div className="flex items-end justify-between gap-6"><div><p className="eyebrow mb-4">{eyebrow}</p><h2 className="max-w-2xl text-3xl font-semibold tracking-[-.04em] text-white sm:text-5xl">{title}</h2></div><span className="hidden text-sm text-slate-500 sm:block">/{number}</span></div>;
}
