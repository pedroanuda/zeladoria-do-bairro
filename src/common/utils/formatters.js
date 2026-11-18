const SHORT_MONTHS = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const FULL_MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const SHORT_DAYS_CAPITALIZED = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb',
];

const SHORT_DAYS_LOWER = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

export function formatRelativeDays(dateInput, referenceDate = new Date()) {
  if (!dateInput) return '';
  const target = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const ref =
    referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  const diffMs = ref.getTime() - target.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'há 1 dia';
  if (diffDays < 7) return `há ${diffDays} dias`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return 'há 1 semana';
  return `há ${diffWeeks} semanas`;
}

export function formatEventBadgeDate(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const monthShort = SHORT_MONTHS[date.getMonth()] ?? '';
  return { day, monthShort };
}

export function formatEventSchedule(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const dayOfWeek = SHORT_DAYS_CAPITALIZED[date.getDay()] ?? '';
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeStr =
    minutes > 0 ? `${hours}h${String(minutes).padStart(2, '0')}` : `${hours}h`;
  return `${dayOfWeek} · ${timeStr}`;
}

export function formatShortEventDate(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const dayOfWeek = SHORT_DAYS_LOWER[date.getDay()] ?? '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${dayOfWeek} ${day}/${month}`;
}

export function formatFullDateTime(dateInput) {
  if (!dateInput) return '';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const day = date.getDate();
  const month = FULL_MONTHS[date.getMonth()] ?? '';
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} de ${month} de ${year} às ${hours}h${minutes}`;
}

export function formatFileSize(bytes) {
  if (!bytes || Number.isNaN(Number(bytes))) return '0 KB';
  const num = Number(bytes);
  if (num < 1024) return `${num} B`;
  const kb = num / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1).replace('.', ',')} MB`;
}
