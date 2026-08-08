/**
 * 曲線ストロークの形状パターン。SVGのpath dで指定する
 */
const strokePaths = [
  "M -20 40 Q 120 280 300 200 T 520 260",
  "M 520 -20 Q 350 120 260 260 T -20 300",
  "M -20 200 Q 260 -20 400 200 T 520 400",
  "M 520 300 Q 300 350 260 150 T -20 60",
  "M 260 -20 Q 400 200 260 400 T 260 520",
  "M -20 460 Q 200 300 380 380 T 520 60",
];

/** 差し色。基本は青紫系で、まれにシアン/ピンクを混ぜる */
const accentColors = [
  "#22d3ee", // cyan
  "#f472b6", // pink
  "#38bdf8", // sky
  "#8b5cf6", // violet
];

/**
 * indexに応じて、青系ベース + 曲線ストロークのSVG画像(data URI)を生成する
 * 色相は青〜紫で統一し、線の形だけを変えることでパターン違いを表現する
 * stroke-widthを太くしてカードの50%以上を色が占めるよう調整している
 * @param index - 記事の配列インデックス
 * @returns background-image に渡せるdata URI文字列
 */
export function generateStreakGradient(index: number): string {
  const path = strokePaths[index % strokePaths.length];
  const accent = accentColors[index % accentColors.length];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
      <defs>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="50%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#312e81" />
        </linearGradient>
        <filter id="blur" x="-200" y="-200" width="900" height="900" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="45" />
        </filter>
      </defs>
      <rect width="500" height="500" fill="#03040d" />
      <path d="${path}" stroke="url(#stroke)" stroke-width="220"
        stroke-linecap="round" fill="none" filter="url(#blur)" opacity="1" />
    </svg>
  `.trim();

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * ノイズ(粒状のざらつき)を表現するSVGパターンをdata URIとして生成する
 * feTurbulenceでランダムノイズを作り、mix-blend-modeで上から重ねて使う想定
 * @returns background-image に渡せるdata URI文字列
 */
export const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * 記事のインデックスに応じてストローク背景を取得する
 * @param index - 記事の配列インデックス
 * @returns background-image プロパティ用のCSS文字列
 */
export const getGradient = (index: number) => {
  return generateStreakGradient(index);
};
