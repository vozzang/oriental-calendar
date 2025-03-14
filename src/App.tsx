import { useState } from "react";
import "./App.css";

const heavenlyStems = [
  "갑",
  "을",
  "병",
  "정",
  "무",
  "기",
  "경",
  "신",
  "임",
  "계",
];
const earthlyBranches = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
];
const zodiacs = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];
const hourBranches = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
];
const hourStemMap = [
  [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5], // 갑, 기일간
  [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7], // 을, 경일간
  [4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9], // 병, 신일간
  [6, 6, 7, 7, 8, 8, 9, 9, 0, 0, 1, 1], // 정, 임일간
  [8, 8, 9, 9, 0, 0, 1, 1, 2, 2, 3, 3], // 무, 계일간
];

const getYearGanZhiAndZodiac = (year) => {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return {
    ganZhi: heavenlyStems[ganIndex] + earthlyBranches[zhiIndex],
    zodiac: zodiacs[zhiIndex],
  };
};

const getMonthGanZhi = (year, month) => {
  const monthHeavenlyStemMap = [
    [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
  ];
  const yearStemIndex = (year - 4) % 10;
  return (
    heavenlyStems[
      monthHeavenlyStemMap[Math.floor(yearStemIndex / 2)][month - 1]
    ] + earthlyBranches[month - 1]
  );
};

const getDayGanZhi = (year, month, day) => {
  const referenceDate = new Date(1900, 0, 31);
  const inputDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor(
    (inputDate - referenceDate) / (1000 * 60 * 60 * 24)
  );
  return (
    heavenlyStems[(daysDiff + 2) % 10] + earthlyBranches[(daysDiff + 2) % 12]
  );
};

const getHourGanZhi = (dayGan, hour) => {
  const dayStemIndex = heavenlyStems.indexOf(dayGan[0]);
  const hourIndex = Math.floor(hour / 2);
  return (
    heavenlyStems[hourStemMap[Math.floor(dayStemIndex / 2)][hourIndex]] +
    hourBranches[hourIndex]
  );
};

function App() {
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [result, setResult] = useState(null);

  const calculateBazi = () => {
    const yearResult = getYearGanZhiAndZodiac(year);
    const monthResult = getMonthGanZhi(year, month);
    const dayResult = getDayGanZhi(year, month, day);
    const hourResult = getHourGanZhi(dayResult, hour);
    setResult({
      yearGanZhi: yearResult.ganZhi,
      zodiac: yearResult.zodiac,
      monthGanZhi: monthResult,
      dayGanZhi: dayResult,
      hourGanZhi: hourResult,
    });
  };

  return (
    <>
      <h2>만세력 계산기</h2>
      <label>
        연도:{" "}
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </label>
      <label>
        월:{" "}
        <input
          type="number"
          value={month}
          min="1"
          max="12"
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </label>
      <label>
        일:{" "}
        <input
          type="number"
          value={day}
          min="1"
          max="31"
          onChange={(e) => setDay(Number(e.target.value))}
        />
      </label>
      <label>
        시:{" "}
        <input
          type="number"
          value={hour}
          min="0"
          max="23"
          onChange={(e) => setHour(Number(e.target.value))}
        />
      </label>
      <label>
        분:{" "}
        <input
          type="number"
          value={minute}
          min="0"
          max="59"
          onChange={(e) => setMinute(Number(e.target.value))}
        />
      </label>
      <button onClick={calculateBazi}>계산</button>
      {result && (
        <div>
          <p>연도 간지: {result.yearGanZhi}</p>
          <p>띠: {result.zodiac}</p>
          <p>월 간지: {result.monthGanZhi}</p>
          <p>일 간지: {result.dayGanZhi}</p>
          <p>시 간지: {result.hourGanZhi}</p>
        </div>
      )}
    </>
  );
}

export default App;
