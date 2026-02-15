// const DAILY_STATS_KEY = "dailyReadStats";

// // Получить все данные
// export function getDailyStats() {
//   const raw = localStorage.getItem(DAILY_STATS_KEY);
//   return raw ? JSON.parse(raw) : {};
// }

// // Получить сегодняшнюю дату в локальном формате
// export function getTodayKey() {
//   const today = new Date();
//   return today.toLocaleDateString("sv-SE"); 
//   // формат YYYY-MM-DD (идеальный для ключа)
// }

// // Увеличить счётчик сегодняшнего дня
// export function addTodayWords(count) {
//   if (!count || count <= 0) return;

//   const stats = getDailyStats();
//   const todayKey = getTodayKey();

//   stats[todayKey] = (stats[todayKey] || 0) + count;

//   localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(stats));
// }

// // Получить сколько слов прочитано сегодня
// export function getTodayCount() {
//   const stats = getDailyStats();
//   const todayKey = getTodayKey();
//   return stats[todayKey] || 0;
// }

const BASE_KEY = "dailyReadStats";

function getStorageKey(appId) {
  return `${BASE_KEY}_${appId}`;
}

// Получить все данные
export function getDailyStats(appId) {
  const raw = localStorage.getItem(getStorageKey(appId));
  return raw ? JSON.parse(raw) : {};
}

// Локальная дата
export function getTodayKey() {
  const today = new Date();
  return today.toLocaleDateString("sv-SE");
}

// Увеличить счётчик
export function addTodayWords(appId, count) {
  if (!count || count <= 0) return;

  const stats = getDailyStats(appId);
  const todayKey = getTodayKey();

  stats[todayKey] = (stats[todayKey] || 0) + count;

  localStorage.setItem(
    getStorageKey(appId),
    JSON.stringify(stats)
  );
}

// Получить сегодняшнее количество
export function getTodayCount(appId) {
  const stats = getDailyStats(appId);
  const todayKey = getTodayKey();
  return stats[todayKey] || 0;
}
