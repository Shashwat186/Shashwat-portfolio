import { CSSProperties, ReactNode } from "react";
import { siApachemaven, siCss, siDatadog, siFirebase, siFlyway, siGit, siGithub, siGithubactions, siGitlab, siHtml5, siOkta, siOpenjdk, siPython, siReact, siSpring, siSpringboot, siVault } from "simple-icons";
import { Skills } from "@/types/resume";

// Only genuine product symbols; skills without one (IBM MQ, AWS S3, SQL, REST APIs, ...) stay text-only,
// as do C# and MySQL, whose logos are wordmarks that blur into a smudge at pill size.
const logos: Record<string, typeof siGit> = {
  Java: siOpenjdk, Python: siPython,
  "Spring Boot": siSpringboot, "Spring MVC": siSpring, Okta: siOkta,
  HTML: siHtml5, CSS: siCss, ReactJS: siReact, "React Native": siReact,
  Git: siGit, GitHub: siGithub, GitLab: siGitlab, "GitHub Actions": siGithubactions, "GitLab CI": siGitlab,
  Maven: siApachemaven, Flyway: siFlyway, "HashiCorp Vault": siVault, Datadog: siDatadog, Firebase: siFirebase,
};

// Brand colour shown on hover, lightened when it would vanish against the dark background.
const hoverColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luminance < 0.12) return "#e2e8f0";
  if (luminance >= 0.3) return `#${hex}`;
  return `rgb(${[r, g, b].map((c) => Math.round((c + (1 - c) * 0.45) * 255)).join(" ")})`;
};

function SkillPill({ skill }: { skill: string }) {
  const logo = logos[skill];
  return (
    <span className="skill-pill" style={logo ? ({ "--brand": hoverColor(logo.hex) } as CSSProperties) : undefined}>
      {logo && <svg viewBox="0 0 24 24" className="skill-logo" fill="currentColor" aria-hidden="true"><path d={logo.path} /></svg>}
      {skill}
    </span>
  );
}

const icon = (paths: ReactNode) => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>;

// xl layout, 4 columns: row 1 is 1+2+1; below it DevOps (2 wide) and Domain (1 wide) each span two rows,
// with Databases stacked over Cloud between them, so there is no ragged third row.
// At md (2 columns) Domain becomes a full-width strip instead.
const layout: { key: keyof Skills; label: string; span: string; icon: ReactNode }[] = [
  { key: "languages", label: "Languages", span: "", icon: icon(<><path d="m8 8-4 4 4 4M16 8l4 4-4 4" /><path d="m13.5 5-3 14" /></>) },
  { key: "backend", label: "Backend", span: "xl:col-span-2", icon: icon(<><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>) },
  { key: "frontend", label: "Frontend", span: "", icon: icon(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>) },
  { key: "devopsTools", label: "DevOps & Tools", span: "xl:col-span-2 xl:row-span-2", icon: icon(<><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="7" r="2.5" /><path d="M6 8.5v7M18 9.5c0 4.5-6 3.5-10.5 7" /></>) },
  { key: "databases", label: "Databases", span: "", icon: icon(<><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" /><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13" /><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></>) },
  { key: "domain", label: "Domain Expertise", span: "md:col-span-2 xl:col-span-1 xl:row-span-2", icon: icon(<><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>) },
  { key: "cloudStorage", label: "Cloud & Storage", span: "", icon: icon(<path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 9a4.5 4.5 0 0 1-.4 9.5z" />) },
];

export default function SkillsGrid({ skills }: { skills: Skills }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 short:mt-6 short:gap-3">
      {layout.map(({ key, label, span, icon: glyph }) => {
        const wide = key === "domain";
        return (
          <article key={key} className={`glass-card skill-card flex flex-col p-6 short:p-5 ${wide ? "skill-card--wide md:flex-row md:items-center md:gap-10 xl:flex-col xl:items-stretch xl:gap-0" : ""} ${span}`}>
            <div className={`flex items-center gap-3 ${wide ? "md:w-64 md:shrink-0 xl:w-auto" : ""}`}>
              <span className="skill-icon">{glyph}</span>
              <div><h3 className="text-base font-medium leading-tight text-white">{label}</h3><p className="mt-0.5 text-xs text-slate-500">{skills[key].length} skills</p></div>
            </div>
            <div className={`flex flex-wrap gap-2 ${wide ? "xl:mt-5" : "mt-5"} short:mt-4`}>{skills[key].map((skill) => <SkillPill key={skill} skill={skill} />)}</div>
          </article>
        );
      })}
    </div>
  );
}
