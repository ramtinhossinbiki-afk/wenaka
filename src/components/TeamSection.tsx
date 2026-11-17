import { FormEvent, useState } from 'react';
import { Award, Check, Copy, Send, UserPlus } from 'lucide-react';
import { Lang, TEAM_MEMBERS, UI_COPY } from '../data/webakData';
import { ageFromJalali } from '../utils/jalali';

interface TeamSectionProps {
  lang: Lang;
}

export function TeamSection({ lang }: TeamSectionProps) {
  const t = UI_COPY[lang];
  const [joinOpen, setJoinOpen] = useState(false);

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [how, setHow] = useState('');
  const [soroush, setSoroush] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState<{
    type: 'ok' | 'err';
    msg: string;
  } | null>(null);

  const handleJoinSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !birth.trim() ||
      !age.trim() ||
      !school.trim() ||
      !how.trim()
    ) {
      setStatus({ type: 'err', msg: t.joinErrorStatus });
      return;
    }

    const requestText =
      lang === 'fa'
        ? `📋 درخواست عضویت در تیم WEBAK

👤 نام و نام خانوادگی: ${name.trim()}
🎂 سال تولد: ${birth.trim()}
🔢 سن: ${age.trim()} سال
🏫 مدرسه: ${school.trim()}
🤝 راه آشنایی با WEBAK: ${how.trim()}
📱 آیدی سروش: ${soroush.trim() || 'ثبت نشده'}
☎️ شماره تماس: ${phone.trim() || 'ثبت نشده'}

💬 مهارت‌ها / توضیحات:
${skills.trim() || 'ثبت نشده'}

🚀 این درخواست از فرم عضویت سایت WEBAK ارسال شده است.`
        : `📋 WEBAK Team Application

👤 Full Name: ${name.trim()}
🎂 Birth Year (Jalali): ${birth.trim()}
🔢 Age: ${age.trim()}
🏫 School: ${school.trim()}
🤝 How did you find WEBAK: ${how.trim()}
📱 Soroush ID: ${soroush.trim() || 'Not provided'}
☎️ Phone: ${phone.trim() || 'Not provided'}

💬 Skills & Notes:
${skills.trim() || 'Not provided'}

🚀 Submitted via WEBAK Team Application Form.`;

    try {
      await navigator.clipboard.writeText(requestText);
      setStatus({ type: 'ok', msg: t.joinCopiedStatus });
    } catch {
      setStatus({ type: 'ok', msg: t.joinCopiedStatus });
    }
  };

  return (
    <section
      id="team"
      className="border-t border-[var(--border)] bg-[var(--surface)]/40 py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.teamKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.teamTitle1}{' '}
            <span className="text-[var(--accent)]">{t.teamTitleAccent}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.teamDesc}
          </p>
        </div>

        {/* Team Grid (Founder spotlight + 4 members) */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {TEAM_MEMBERS.map((member) => {
            const calculatedAge = ageFromJalali(member.birthJalali);
            const initials = (lang === 'fa' ? member.nameFa : member.nameEn)
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('');

            return (
              <article
                key={member.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  member.isFounder
                    ? 'border-[var(--accent)]/50 bg-[var(--surface-elevated)] sm:col-span-2 lg:col-span-3'
                    : 'border-[var(--border)] bg-[var(--surface)] lg:col-span-3 xl:col-span-2'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-base font-extrabold ${
                        member.isFounder
                          ? 'border-[var(--accent)]/50 bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text-primary)]'
                      }`}
                    >
                      {member.isFounder ? (
                        <Award className="h-6 w-6" />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    <div className="font-mono-num text-xs font-semibold text-[var(--text-muted)]">
                      {calculatedAge} {t.yearsLabel}
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-[var(--text-primary)]">
                    {lang === 'fa' ? member.nameFa : member.nameEn}
                  </h3>
                  <div className="mt-1 text-xs font-bold text-[var(--accent)]">
                    {lang === 'fa' ? member.roleFa : member.roleEn}
                  </div>
                </div>

                <div className="mt-5 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'fa' ? member.focusFa : member.focusEn}
                </div>
              </article>
            );
          })}
        </div>

        {/* Authentic Studio Note */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          {t.teamNote}
        </p>

        {/* Join Team Callout & Toggle */}
        <div
          id="join"
          className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
                {t.joinCardTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.joinCardDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setJoinOpen((prev) => !prev)}
              className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-[var(--accent)] px-5 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              <UserPlus className="h-4 w-4" />
              <span>{joinOpen ? t.joinBtnClose : t.joinBtnOpen}</span>
            </button>
          </div>

          {joinOpen && (
            <form
              onSubmit={handleJoinSubmit}
              className="mt-8 border-t border-[var(--border)] pt-7"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinName}
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.joinNamePh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinBirth}
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    placeholder={t.joinBirthPh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinAge}
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={t.joinAgePh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinSchool}
                  </label>
                  <input
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder={t.joinSchoolPh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinHow}
                  </label>
                  <input
                    required
                    value={how}
                    onChange={(e) => setHow(e.target.value)}
                    placeholder={t.joinHowPh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinSoroush}
                  </label>
                  <input
                    dir="ltr"
                    value={soroush}
                    onChange={(e) => setSoroush(e.target.value)}
                    placeholder={t.joinSoroushPh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinPhone}
                  </label>
                  <input
                    dir="ltr"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.joinPhonePh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.joinSkills}
                  </label>
                  <textarea
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder={t.joinSkillsPh}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  <Copy className="h-4 w-4" />
                  <span>{t.joinCopyBtn}</span>
                </button>
                <a
                  href="https://splus.ir/RAMtinHB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] px-5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <Send className="h-4 w-4 text-[var(--accent)]" />
                  <span>{t.joinSoroushBtn}</span>
                </a>
              </div>

              {status && (
                <div
                  role="status"
                  className={`mt-4 flex items-center gap-2 text-xs font-medium ${
                    status.type === 'ok'
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {status.type === 'ok' && <Check className="h-4 w-4" />}
                  <span>{status.msg}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
