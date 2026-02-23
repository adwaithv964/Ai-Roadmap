import { roadmaps } from './src/data/roadmaps.js';

const domains = Object.keys(roadmaps);
console.log(`Total domains: ${domains.length}`);

let allGood = true;
for (const domain of domains) {
    const rd = roadmaps[domain];
    for (const stage of rd.stages) {
        for (const mod of stage.modules) {
            if (!mod.steps || mod.steps.length < 20) {
                console.warn(`  ⚠️  ${domain} > ${stage.title} > ${mod.title}: only ${mod.steps?.length ?? 0} steps`);
                allGood = false;
            }
        }
    }
}

if (allGood) {
    console.log('✅ All modules have 20+ steps!');
} else {
    console.log('❌ Some modules need more steps.');
}
