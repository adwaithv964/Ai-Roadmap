import { roadmaps } from './src/data/roadmaps.js';

console.log('--- Verification Report ---');
console.log(`Total Roadmaps Found: ${Object.keys(roadmaps).length}`);
console.log(`Keys: ${Object.keys(roadmaps).join(', ')}`);

const frontend = roadmaps.frontend;
if (frontend) {
    console.log('\n[PASS] Frontend roadmap exists.');
    console.log(`Title: "${frontend.title}"`);
    console.log(`Stages: ${frontend.stages?.length || 0}`);

    if (frontend.stages?.length > 0) {
        const firstStage = frontend.stages[0];
        console.log(`First Stage: "${firstStage.title}"`);
        console.log(`First Stage Modules: ${firstStage.modules?.length || 0}`);

        if (firstStage.modules?.length > 0) {
            const firstModule = firstStage.modules[0];
            console.log(`First Module: "${firstModule.title}"`);
            console.log(`First Module Steps: ${firstModule.steps?.length || 0}`);
            if (firstModule.steps?.length > 0) {
                console.log(`Sample Step Example: "${firstModule.steps[0].example}"`);
            }
        }
    }
} else {
    console.error('\n[FAIL] Frontend roadmap is MISSING!');
}

const backend = roadmaps.backend;
if (backend && Object.keys(backend).length > 0) {
    console.log('\n[INFO] Backend roadmap exists.');
} else {
    console.log('\n[WARN] Backend roadmap is empty or missing (expected due to truncation).');
}

console.log('\n--- End of Report ---');
