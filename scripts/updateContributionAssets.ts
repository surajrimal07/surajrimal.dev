import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const BADGES_DIR = path.join(
  process.cwd(),
  'public',
  'contributions',
  'badges'
);
const GRAPH_DIR = path.join(process.cwd(), 'public', 'contributions', 'graph');

function modifySvg(svgString: string): string {
  if (!svgString) return '';

  return svgString
    .replace(/<image[^>]+xlink:href="[^"]*logo-gh\.svg"[^>]*>/, '')
    .replace(/(<style[^>]*>[\s\S]*?<\/style>)/, (styleBlock) => {
      return styleBlock.replace(
        /text\s?{([^}]*)}/,
        (_textMatch, properties) => {
          return `text {${properties.replace(/fill:\s?#([A-Fa-f0-9]{6})/, 'fill: #FFFFFF')}}`;
        }
      );
    })
    .replace(/fill:\s?#([A-Fa-f0-9]{6})/g, (_match, color) => {
      return `fill: ${color === 'DCE3E1' ? '#171b21' : `#${color}`}`;
    });
}

async function ensureDirectories() {
  await fs.mkdir(BADGES_DIR, { recursive: true });
  await fs.mkdir(GRAPH_DIR, { recursive: true });
}

async function fetchAndSaveGraph() {
  try {
    const res = await fetch(
      'https://wakapi.dev/api/activity/chart/surajrimal.svg'
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch graph: ${res.status} ${res.statusText}`);
    }
    const svg = await res.text();
    const modifiedSvg = modifySvg(svg);

    // Convert SVG to PNG using sharp
    await sharp(Buffer.from(modifiedSvg))
      .resize(1219, 186)
      .png()
      .toFile(path.join(GRAPH_DIR, 'contributions.png'));

    console.log('Successfully saved contribution graph as PNG');
  } catch (error) {
    console.error('Error saving contribution graph:', error);
    throw error;
  }
}

async function fetchAndSaveBadges() {
  const intervals = ['today', 'week', '30_days', 'last_12_months', 'all_time'];
  const labels = ['Today', 'Week', 'Month', 'Year', 'All Time'];

  try {
    await Promise.all(
      intervals.map(async (interval, index) => {
        const url = `https://wakapi.dev/api/badge/surajrimal/interval:${interval}?label=${labels[index]}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch badge ${interval}: ${res.status} ${res.statusText}`
          );
        }
        const svg = await res.text();
        await fs.writeFile(path.join(BADGES_DIR, `${interval}.svg`), svg);
      })
    );
    console.log('Successfully saved all badges');
  } catch (error) {
    console.error('Error saving badges:', error);
    throw error;
  }
}

async function main() {
  try {
    await ensureDirectories();
    await Promise.all([fetchAndSaveGraph(), fetchAndSaveBadges()]);
    console.log('Successfully updated all contribution assets');
  } catch (error) {
    console.error('Error updating contribution assets:', error);
    process.exit(1);
  }
}

main();
