export default async function leetcodeQuery() {
  const {
    totalSolved,
    totalQuestions,
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
  } = await fetch('https://leetcodestats.cyclic.app/orangealertx')
    .then((res) => res.text())
    .then((json) => JSON.parse(json));

  const totalPercentOf285 = ((totalSolved / totalQuestions) * 285).toFixed(1);
  const easyPercent = ((easySolved / totalEasy) * 100).toFixed(4);
  const mediumPercent = ((mediumSolved / totalMedium) * 100).toFixed(4);
  const hardPercent = ((hardSolved / totalHard) * 100).toFixed(4);

  return {
    totalSolved,
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
    totalPercentOf285,
    easyPercent,
    mediumPercent,
    hardPercent,
  };
}
