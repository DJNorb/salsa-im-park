import daten from '../inhalte/termine.json';

export const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
export const TAGE = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

// Erlaubte Werte für "status" in termine.json
export const STATUS = {
  'geplant':      { text: 'geplant',      klasse: 'geplant' },
  'findet statt': { text: 'findet statt', klasse: 'ok' },
  'abgesagt':     { text: 'abgesagt',     klasse: 'abgesagt' }, // eigentlicher Termin fällt aus -> Ausweichtermin
  'fällt aus':    { text: 'fällt aus',    klasse: 'abgesagt' }, // Termin UND Ausweichtermin fallen aus
};
const AUSWEICH = { text: 'Ausweichtermin', klasse: 'ausweich' };

const d = (iso) => new Date(iso + 'T12:00:00');
export const datumLang = (iso) => { const x = d(iso); return `${TAGE[x.getDay()]}, ${x.getDate()}. ${MONATE[x.getMonth()]} ${x.getFullYear()}`; };
export const datumKurz = (iso) => { const x = d(iso); return `${x.getDate()}. ${MONATE[x.getMonth()]}`; };
export const plusTage = (iso, n) => { const x = new Date(iso + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
export const heuteISO = (jetzt = new Date()) => `${jetzt.getFullYear()}-${String(jetzt.getMonth() + 1).padStart(2, '0')}-${String(jetzt.getDate()).padStart(2, '0')}`;

export const termine = daten.termine.map((t) => {
  const key = STATUS[t.status] ? t.status : 'geplant';
  return { ...t, key, status: STATUS[key], effektiv: key === 'abgesagt' ? t.ausweichtermin : t.datum };
});

/**
 * Was ist heute der "nächste Termin"?
 * - Normaler Termin: wird bis einschließlich Veranstaltungstag angezeigt, danach der Folgetermin.
 * - "abgesagt": bis zum Folgetag des abgesagten Termins erscheint ein deutlicher Absage-Hinweis
 *   mit Verweis auf den Ausweichtermin; danach nur noch der Ausweichtermin.
 * - "fällt aus": Ausfall-Hinweis bis zum Folgetag, danach der nächste Monatstermin.
 */
export function aktuelleLage(heute = heuteISO()) {
  for (const t of termine) {
    if (t.key === 'abgesagt') {
      if (heute <= plusTage(t.datum, 1)) return { t, datum: t.ausweichtermin, art: 'absage-hinweis' };
      if (heute <= t.ausweichtermin) return { t, datum: t.ausweichtermin, art: 'ausweich' };
    } else if (t.key === 'fällt aus') {
      if (heute <= plusTage(t.datum, 1)) return { t, datum: t.datum, art: 'ausfall' };
    } else if (heute <= t.datum) {
      return { t, datum: t.datum, art: 'normal' };
    }
  }
  return null;
}

/** Fertige Texte für die Anzeige (gleich für Server und Browser). */
export function anzeige(lage) {
  if (!lage) return null;
  const { t, datum, art } = lage;
  const x = d(datum);
  const basis = { tag: String(x.getDate()), monat: MONATE[x.getMonth()], lang: datumLang(datum), hinweis: t.hinweis || '', warnung: '' };
  if (art === 'absage-hinweis') return { ...basis, ...AUSWEICH, warnung: `Der Termin am ${datumLang(t.datum)} ist abgesagt. Stattdessen findet die Veranstaltung am Ausweichtermin, ${datumLang(t.ausweichtermin)}, statt.` };
  if (art === 'ausweich') return { ...basis, ...AUSWEICH };
  if (art === 'ausfall') return { ...basis, ...t.status, warnung: `Der Termin am ${datumLang(t.datum)} fällt leider aus.` };
  return { ...basis, ...t.status };
}

/** Bis wann ein Termin in der Liste als aktuell gilt (danach ausgegraut). */
export const letzterTag = (t) => (t.key === 'abgesagt' ? t.ausweichtermin : t.key === 'fällt aus' ? plusTage(t.datum, 1) : t.datum);

export const { jahr, beginn, ende, zeitzone } = daten;
