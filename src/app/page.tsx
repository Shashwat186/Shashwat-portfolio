import Image from "next/image";
import { resume } from "@/data/resume";
import Typewriter from "./Typewriter";
import SkillsGrid from "./SkillsGrid";
import MobileMenu from "./MobileMenu";
import SideNav from "./SideNav";
import SocialLinks from "./SocialLinks";
import ExperienceTabs from "./ExperienceTabs";
import SiteHeader from "./SiteHeader";
import ScrollReveal from "./ScrollReveal";
import CommandPalette from "./CommandPalette";
import CopyEmail, { CopyIcon, CopyToast, MailLink } from "./CopyEmail";

const navItems = ["About", "Skills", "Work", "Education", "Projects", "Contact"];
const resumeDownload = { href: "/resume.pdf", download: "Shashwat_Singh_Chauhan_Resume.pdf" };

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

      <SiteHeader>
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 text-sm text-slate-950">S</span>
            <span className="hidden sm:block">{resume.name}</span>
          </a>
          <div className="flex items-center gap-2">
            <CommandPalette items={navItems} contact={resume.contact} resumeDownload={resumeDownload} />
            <a {...resumeDownload} aria-label="Download résumé" className="button-primary button-nav"><span className="sm:hidden">Résumé</span><span className="hidden sm:inline">Download résumé</span></a>
            <SocialLinks contact={resume.contact} />
            <MobileMenu items={navItems} email={resume.contact.email} />
          </div>
        </nav>
      </SiteHeader>
      <SideNav items={navItems} />
      <ScrollReveal />
      <CopyToast />

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
                <MailLink email={resume.contact.email} className="button-primary">Start a conversation <span aria-hidden="true">→</span></MailLink>
                <a href="#work" className="button-secondary">Explore my work</a>
                <a {...resumeDownload} className="button-secondary">Download résumé <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <aside className="hero-portrait">
              <Image src="/shashwat-portrait.png" alt="Stylized portrait of Shashwat Singh Chauhan" width={1254} height={1254} priority className="hero-portrait-image" />
              <div className="mb-7 flex items-center justify-between"><span className="eyebrow">Quick profile</span><span className="text-cyan-200">✦</span></div>
              <div className="space-y-5">
                <div><p className="label">Email</p><CopyEmail email={resume.contact.email} className="profile-value inline-flex items-center gap-2">{resume.contact.email}<CopyIcon /></CopyEmail></div>
                <div><p className="label">Based in</p><p className="profile-value">India · Working globally</p></div>
                <div><p className="label">Focus</p><p className="profile-value">Backend · Full stack · Integrations</p></div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-5"><a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-100 hover:text-white">LinkedIn profile <span>↗</span></a></div>
            </aside>
          </div>
          <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-12 bg-slate-600" /> Scroll to discover</div>
        </div>
      </section>

      <section id="impact" aria-label="Impact in numbers" className="section-wrap px-6 py-14"><div data-reveal className="mx-auto max-w-6xl">
        <p className="eyebrow"><span className="status-dot" /> Currently working on</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-.03em] text-white sm:text-3xl">{resume.currentApplication.name} <span className="font-normal text-slate-400">· {resume.currentApplication.company}</span></h2>
        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">{resume.stats.map((stat) => <div key={stat.label} className="flex flex-col-reverse justify-end last:col-span-2 lg:last:col-span-1"><dt className="mt-3 max-w-[13rem] text-sm leading-5 text-slate-400">{stat.label}</dt><dd className="m-0 text-5xl font-semibold tracking-[-.05em] text-gradient">{stat.value}</dd></div>)}</dl>
      </div></section>

      <section id="about" className="section-wrap px-6 py-24 short:pt-22"><div data-reveal className="mx-auto max-w-6xl">
        <SectionIntro number="01" eyebrow="About" title="Shashwat Singh Chauhan" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 short:mt-6">
          <div className="glass-card p-7 sm:p-9 short:p-7">
            <p className="text-xl leading-9 text-slate-200 short:text-lg short:leading-8">I&apos;m a backend Java developer with 1.8 years of experience building and modernizing enterprise systems. Over the last year I&apos;ve specialized in migrations: moving platforms forward without breaking what already works.</p>
            <p className="mt-5 text-base leading-8 text-slate-300">Beyond migrations, I lead root cause analysis on production issues across systems with a C# frontend and Java server, monitor Datadog logs, and remediate ArmorCode security findings. I&apos;m comfortable working in both GitLab and GitHub.</p>
            <div className="mt-8 flex flex-wrap gap-2">{resume.skills.domain.map((item) => <span key={item} className="skill-pill">{item}</span>)}</div>
          </div>
          <div className="glass-card p-7 sm:p-9 short:p-7">
            <div className="flex flex-wrap items-end gap-x-5 gap-y-2"><p className="text-5xl font-semibold tracking-[-.08em] text-gradient">1.8 yrs</p><p className="pb-1 text-sm leading-5 text-slate-400">Backend Java experience, with the last<br className="hidden sm:block" /> year focused on platform migrations.</p></div>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="label">Migrations I&apos;ve led</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">{migrations.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div></section>

      <section id="skills" className="section-wrap px-6 py-24 short:pt-22"><div data-reveal className="mx-auto max-w-6xl">
        <SectionIntro number="02" eyebrow="Capabilities" title="The tools behind the thinking." />
        <SkillsGrid skills={resume.skills} />
      </div></section>

      <section id="work" className="section-wrap px-6 py-24 short:pt-22"><div data-reveal className="mx-auto max-w-6xl">
        <SectionIntro number="03" eyebrow="Experience" title="Building impact, one system at a time." />
        <ExperienceTabs experience={resume.experience} />
      </div></section>

      <section id="education" className="section-wrap px-6 py-24 short:pt-22"><div data-reveal className="mx-auto max-w-6xl">
        <SectionIntro number="04" eyebrow="Education" title="Where the foundation was laid." />
        <article className="glass-card mt-12 p-6 sm:p-8 short:mt-6 short:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div><h3 className="text-xl font-medium text-white">{resume.education.degree}</h3><p className="mt-1 text-slate-400">{resume.education.institution}</p></div>
            <p className="text-sm text-cyan-100/80">{resume.education.period}</p>
          </div>
        </article>
        <h3 className="eyebrow mb-4 mt-10 short:mt-6">Research</h3>
        <article className="glass-card p-6 sm:p-8 short:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div className="max-w-3xl"><h4 className="text-xl font-medium text-white">{resume.research.title}</h4><p className="mt-1 text-slate-400">{resume.research.publication}</p></div>
            <p className="text-sm text-cyan-100/80">{resume.research.period}</p>
          </div>
          <ul className="mt-5 space-y-2.5 text-sm leading-[1.6] text-slate-300">{resume.research.details.map((detail) => <li key={detail} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{detail}</li>)}</ul>
          <a href={resume.research.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-100 hover:text-white">Read the paper in IJCH <span aria-hidden="true">↗</span></a>
        </article>
      </div></section>

      <section id="projects" className="section-wrap px-6 py-24 short:pt-22"><div data-reveal className="mx-auto max-w-6xl">
        <SectionIntro number="05" eyebrow="Selected work" title="Ideas brought into the real world." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2 short:mt-6">{resume.projects.map((project, index) => <article key={project.title} className="glass-card project-card p-7 sm:p-8"><div className="mb-12 flex items-start short:mb-6 justify-between"><span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sm text-cyan-100">0{index + 1}</span><span className="text-right text-xs uppercase tracking-wider text-slate-500">{project.client}<br />{project.period}</span></div><h3 className="text-2xl font-medium text-white">{project.title}</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">{project.details.map((detail) => <li key={detail} className="flex gap-3"><span className="text-violet-300">✦</span>{detail}</li>)}</ul></article>)}</div>
      </div></section>

      <section id="contact" className="px-6 pb-16 pt-24"><div data-reveal className="contact-panel mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-8 sm:p-14"><p className="eyebrow">Let&apos;s create something meaningful</p><div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-.045em] text-white sm:text-6xl">Have a project in mind?</h2><div className="shrink-0"><MailLink email={resume.contact.email} className="button-primary w-full">Get in touch <span aria-hidden="true">→</span></MailLink><CopyEmail email={resume.contact.email} className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-slate-300 transition hover:text-white">{resume.contact.email}<CopyIcon /></CopyEmail><p className="mt-2 text-center text-sm text-slate-400">{resume.contact.mobile}</p></div></div></div></section>
      <footer className="px-6 pb-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t border-white/10 pt-7 text-sm text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} {resume.name}</span><a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a></div></footer>
    </main>
  );
}

function SectionIntro({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div className="flex items-end justify-between gap-6"><div><p className="eyebrow mb-4 short:mb-3">{eyebrow}</p><h2 className="max-w-2xl text-3xl xl:max-w-none font-semibold tracking-[-.04em] text-white sm:text-5xl short:text-4xl">{title}</h2></div><span className="hidden text-sm text-slate-500 sm:block">/{number}</span></div>;
}
