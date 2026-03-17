const path = require('path');
try {
    require('./routes/adminRoutes');
    require('./models/PlatformSettings');
    console.log('OK: adminRoutes.js and PlatformSettings.js syntax valid');
} catch (e) {
    console.error('SYNTAX ERROR:', e.message);
    process.exit(1);
}
