import { S3Client } from '@ejekanshjain/cloud-storage';
import 'dotenv/config';
import sharp from 'sharp';

// Environment configuration handling
function getEnvValue(key: string): string {
  const sources = [
    // First, check GitHub Actions secrets (prefixed with INPUT_)
    process.env[`INPUT_${key.toUpperCase()}`],

    // Then check standard environment variables
    process.env[key.toUpperCase()],
    process.env[key],
    process.env[key.toLowerCase()],
    process.env[`INPUT_${key.toLowerCase()}`],
  ];

  const value = sources.find((val) => val !== undefined && val.trim() !== '');

  if (value) return value;

  throw new Error(`Missing required environment variable: ${key}`);
}

const supabase = S3Client({
  region: getEnvValue('SUPABASE_REGION'),
  accessKey: getEnvValue('SUPABASE_ACCESS_ID'),
  accessSecret: getEnvValue('SUPABASE_ACCESS_KEY'),
  bucket: getEnvValue('SUPABASE_BUCKET'),
  host: getEnvValue('SUPABASE_ENDPOINT'),
});

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

async function uploadToS3(file: Buffer, fileName: string) {
  try {
    await supabase.addFile({
      filename: fileName,
      data: file,
    });
    console.log(`Successfully uploaded ${fileName}`);
  } catch (error) {
    console.error(`Upload error for ${fileName}:`, error);
    throw error;
  }
}

// Rest of the implementation remains the same as in the original script
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

    const pngBuffer = await sharp(Buffer.from(modifiedSvg))
      .resize(1219, 186)
      .png()
      .toBuffer();

    await uploadToS3(pngBuffer, 'contributions.png');

    console.log('Successfully uploaded contribution graph');
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

        const pngBuffer = await sharp(Buffer.from(svg))
          .resize(240, 30)
          .png()
          .toBuffer();

        await uploadToS3(pngBuffer, `${interval}.png`);
      })
    );
    console.log('Successfully uploaded all badges');
  } catch (error) {
    console.error('Error saving badges:', error);
    throw error;
  }
}

async function main() {
  try {
    await Promise.all([fetchAndSaveGraph(), fetchAndSaveBadges()]);
    console.log('Successfully updated all contribution assets');
    process.exit(0);
  } catch (error) {
    console.error('Error updating contribution assets:', error);
    process.exit(1);
  }
}

// Only run main if script is directly executed
if (require.main === module) {
  main();
}

export { main };
