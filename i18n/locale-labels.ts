type CountryInformation = {
  value: string;
  label: string;
  shortLabel: string;
  isIncomplete?: boolean;
};

export const localeLabels: CountryInformation[] = [
  { value: "pt", label: "Português", shortLabel: "🇵🇹" },
  { value: "de", label: "Deutsch", shortLabel: "🇩🇪" },
  { value: "en", label: "English", shortLabel: "🇺🇸" },
  { value: "es", label: "Español", shortLabel: "🇪🇸" },
  { value: "fr", label: "Français", shortLabel: "🇫🇷" },
  { value: "hu", label: "Magyar", shortLabel: "🇭🇺" },
  { value: "id", label: "Bahasa Indonesia", shortLabel: "🇮🇩" },
  { value: "ja", label: "日本語", shortLabel: "🇯🇵" },
  { value: "ko", label: "한국어", shortLabel: "🇰🇷" },
  { value: "ms", label: "Bahasa Melayu", shortLabel: "🇲🇾", isIncomplete: true },
  { value: "pl", label: "Polski", shortLabel: "🇵🇱", isIncomplete: true },
  { value: "ru", label: "Русский", shortLabel: "🇷🇺" },
  { value: "th", label: "ไทย", shortLabel: "🇹🇭" },
  { value: "tr", label: "Türkçe", shortLabel: "🇹🇷", isIncomplete: true },
  { value: "ua", label: "Українська", shortLabel: "🇺🇦" },
  { value: "vi", label: "Tiếng Việt", shortLabel: "🇻🇳" },
  { value: "zh-CN", label: "中文", shortLabel: "🇨🇳" },
  { value: "zh-TW", label: "繁體中文", shortLabel: "🇨🇳" },
];
