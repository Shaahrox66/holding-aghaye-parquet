import { createHash } from "node:crypto";
import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve(process.argv[2] || "C:/Users/Shahrokh/Desktop/TARAHI");
const workspaceRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(workspaceRoot, "assets", "images", "design-studio");
const dataFile = path.join(workspaceRoot, "js", "design-studio-data.js");
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const excluded = new Set(["IMG_5544.JPG", "IMG_5567.JPG", "IMG_5690.JPG"]);

const definitions = [
  [5433, 5436, "کمد و میزکار سفید بلوطی", "کمد و کلوزت", "مدرن مینیمال", "MDF سفید مات و طرح بلوط", "سفید، بلوطی و مشکی", "ولیعصر، کوی سپهر", "ترکیب کمد قدی، میزکار زیر پنجره و شلف‌های باز، فضای کوچک اتاق را بدون شلوغی به یک مجموعه کاربردی تبدیل کرده است."],
  [5437, 5438, "کمد دیواری سفید گردویی", "کمد و کلوزت", "مدرن", "MDF سفید مات و طرح گردویی", "سفید، گردویی و مشکی", "پرواز، کوی مهر", "کمد سرتاسری با دستگیره‌های خطی مشکی و شلف کناری، برای استفاده حداکثری از ارتفاع اتاق طراحی شده است."],
  [5439, 5440, "کلوزت سبز پاستلی", "کمد و کلوزت", "نئوکلاسیک", "MDF رنگ‌شده با درهای قاب‌دار", "سبز پاستلی و چوب روشن", "خاوران، کوی نارون", "مجموعه کمد، میز آرایش و نیمکت پنجره با قاب‌های ظریف و نورپردازی داخلی، فضایی آرام و منظم ساخته است."],
  [5441, 5452, "کلوزت سفید شیاردار", "کمد و کلوزت", "مدرن لوکس", "MDF سفید مات با پنل شیاردار", "سفید و طلایی", "مرزداران، کوی ارغوان", "نمای یکپارچه با دستگیره‌های بلند طلایی و تقسیم‌بندی داخلی مجهز به نور خطی، رگال آسانسوری و کشوهای متعدد."],
  [5453, 5455, "میزکار نئوکلاسیک طوسی", "اتاق و میزکار", "نئوکلاسیک", "MDF رنگ‌شده و طرح چوب", "طوسی گرم، چوبی و مشکی", "نصر، کوی آفتاب", "میزکار و کمد یکپارچه با درهای قاب‌دار، فضای آرشیو و کار روزانه را در یک دیوار جمع کرده است."],
  [5457, 5461, "کمد نئوکلاسیک کرم", "کمد و کلوزت", "نئوکلاسیک", "MDF رنگ‌شده قاب‌دار", "کرم گرم و مشکی", "فلکه فردوس، کوی یاس", "کمدهای قدی تا سقف با کابین بالایی، کشوهای داخلی و جای تلویزیون، برای اتاقی با نیاز ذخیره‌سازی بالا اجرا شده‌اند."],
  [5464, 5469, "آشپزخانه سفید و چوب", "آشپزخانه", "نئوکلاسیک مدرن", "MDF سفید قاب‌دار و روکش طرح چوب", "سفید، چوب بلوط و مشکی", "پرواز، کوی باران", "کابینت‌های سفید قاب‌دار با باکس‌های شیاردار، صفحه چوبی و نور خطی، تعادلی میان فرم کلاسیک و عملکرد مدرن ایجاد کرده‌اند."],
  [5470, 5474, "آشپزخانه نئوکلاسیک طوسی", "آشپزخانه", "نئوکلاسیک", "MDF رنگ‌شده قاب‌دار", "طوسی روشن، چوب و مشکی", "ولیعصر، کوی نیلوفر", "چیدمان ال‌شکل با یونیت لباسشویی مخفی، کشوهای سوپری و ویترین ورودی، جزئیات کاربردی پروژه را کامل کرده است."],
  [5533, 5535, "آشپزخانه سفید و مشکی", "آشپزخانه", "نئوکلاسیک لوکس", "MDF سفید رنگ‌شده", "سفید و سنگ مشکی", "خاوران، کوی سرو", "کابینت‌های بلند تا سقف، قاب هود شاخص و سنگ مشکی یکپارچه، نمایی رسمی و منظم به آشپزخانه داده‌اند."],
  [5545, 5548, "آشپزخانه کلاسیک سفید", "آشپزخانه", "کلاسیک", "MDF ممبران سفید", "سفید و مشکی", "مرزداران، کوی بهار", "قاب‌بندی پرجزئیات، ستون‌های ابزارخورده و تاج سرتاسری در کنار صفحه مشکی، هویت کلاسیک پروژه را شکل داده‌اند."],
  [5549, 5554, "کمد مینیمال طوسی", "کمد و کلوزت", "مدرن مینیمال", "MDF طوسی مات", "طوسی روشن و مشکی", "نصر، کوی شهریار", "کمد چهارلنگه با دستگیره‌های بلند مشکی و فضای داخلی تفکیک‌شده برای لباس، کفش و کشوهای شخصی."],
  [5555, 5570, "کلوزت براق سفید", "کمد و کلوزت", "مدرن لوکس", "هایگلاس سفید و MDF داخلی", "سفید براق، طوسی و طلایی", "ولیعصر، کوی لاله", "کلوزت براق با دستگیره‌های مخفی، نور داخلی و کنسول آینه منحنی، یک مجموعه کامل برای ورودی و اتاق خواب ساخته است."],
  [5571, 5583, "اتاق خواب کرم لوکس", "اتاق و میزکار", "مدرن لوکس", "MDF کرم مات با پنل شیاردار", "کرم، سفید و طلایی", "پرواز، کوی آسمان", "کمد، میز تحریر، میز آرایش، تی‌وی‌وال و پاتختی‌ها با زبان طراحی مشترک و جزئیات طلایی اجرا شده‌اند."],
  [5584, 5603, "آشپزخانه طوسی مدرن", "آشپزخانه", "مدرن مینیمال", "MDF طوسی مات", "طوسی روشن، مشکی و قهوه‌ای", "خاوران، کوی زیتون", "کابینت‌های بدون دستگیره، تجهیزات توکار، ویترین شیشه‌ای نورپردازی‌شده و صفحه سنگ تیره، آشپزخانه‌ای خلوت و دقیق ساخته‌اند."],
  [5604, 5607, "کمد کودک سفید و صورتی", "کمد و کلوزت", "مدرن", "MDF سفید مات و پنل شیاردار", "سفید و صورتی", "مرزداران، کوی شقایق", "کمد قدی کودک با کابین‌های صورتی شیاردار و تقسیم‌بندی داخلی جادار، متناسب با فضای روشن اتاق طراحی شده است."],
  [5608, 5615, "کمد و میزکار سفید طوسی", "اتاق و میزکار", "مدرن مینیمال", "MDF سفید و طوسی مات با طرح چوب", "سفید، طوسی و چوبی", "نصر، کوی فرهنگ", "ترکیب کمد قدی و میز مطالعه نورپردازی‌شده، یک دیوار کامل اتاق را به فضای ذخیره‌سازی و کار تبدیل کرده است."],
  [5616, 5622, "کلوزت آبی طوسی", "کمد و کلوزت", "مدرن", "MDF آبی طوسی مات و پنل شیاردار", "آبی طوسی و سفید", "فلکه فردوس، کوی صبا", "کمد مدرن با کابین بالایی شیاردار، رگال دوبل، سبد ریلی، کشو و نورپردازی عمودی داخل یونیت‌ها."],
  [5623, 5637, "آشپزخانه سبز زیتونی و چوب", "آشپزخانه", "مدرن", "MDF سبز زیتونی مات و طرح چوب", "سبز زیتونی، گردویی و سنگ طوسی", "ولیعصر، کوی رز", "پلان یو شکل با میز صبحانه، جای بطری نورپردازی‌شده و ترکیب سبز زیتونی با چوب تیره، فضایی گرم و معاصر ایجاد کرده است."],
  [5638, 5639, "آشپزخانه خاکستری صنعتی", "آشپزخانه", "مدرن صنعتی", "MDF خاکستری مات", "خاکستری، مشکی و سبز تیره", "پرواز، کوی پامچال", "جزیره مرکزی، هود استوانه‌ای، نورپردازی خطی و سطوح خاکستری، شخصیت صنعتی و یکدست این پروژه را می‌سازند."],
  [5678, 5689, "آشپزخانه کلاسیک سفید و چوب", "آشپزخانه", "نئوکلاسیک", "MDF سفید قاب‌دار و طرح چوب", "سفید، چوب طبیعی و مشکی", "خاوران، کوی اقاقیا", "آشپزخانه خانوادگی با جزیره غذاخوری، ویترین‌های چوبی، پنتری گوشه و کابینت‌های سفید قاب‌دار تا سقف."],
];

async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...await walk(full));
    else if (item.isFile() && extensions.has(path.extname(item.name).toLowerCase())) files.push(full);
  }
  return files;
}

function imageNumber(file) {
  const match = path.basename(file).match(/^IMG_(\d+)/i);
  return match ? Number(match[1]) : null;
}

async function hashFile(file) {
  const { readFile } = await import("node:fs/promises");
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

await mkdir(outputRoot, { recursive: true });
await mkdir(path.dirname(dataFile), { recursive: true });

const allFiles = (await walk(sourceRoot)).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const unique = [];
const seenHashes = new Set();
for (const file of allFiles) {
  if (excluded.has(path.basename(file).toUpperCase())) continue;
  const digest = await hashFile(file);
  if (seenHashes.has(digest)) continue;
  seenHashes.add(digest);
  unique.push(file);
}

const projects = [];
for (let index = 0; index < definitions.length; index++) {
  const [start, end, title, category, style, material, colors, location, description] = definitions[index];
  const sourceFiles = unique.filter((file) => {
    const number = imageNumber(file);
    return number !== null && number >= start && number <= end;
  });
  if (!sourceFiles.length) continue;
  const slug = `project-${String(index + 1).padStart(2, "0")}`;
  const targetDir = path.join(outputRoot, slug);
  await mkdir(targetDir, { recursive: true });
  const images = [];
  for (const file of sourceFiles) {
    const name = path.basename(file).replace(/\s+/g, "-");
    await copyFile(file, path.join(targetDir, name));
    images.push(`../assets/images/design-studio/${slug}/${name}`);
  }
  projects.push({ id: slug, title, category, style, material, colors, location, description, cover: images[0], images });
}

const payload = `window.DESIGN_STUDIO_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;
await writeFile(dataFile, payload, "utf8");
const count = projects.reduce((total, project) => total + project.images.length, 0);
process.stdout.write(`Imported ${projects.length} projects and ${count} unique images.\n`);
