const http = require('http');

const url = 'http://localhost:5000/api/roadmaps';

http.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(data);
            console.log('Count:', parsedData.length);
            if (parsedData.length > 0) {
                console.log('Sample[0] category:', parsedData[0].category);
                console.log('Sample[0] slug:', parsedData[0].slug);

                const dataAI = parsedData.find(r => r.category === 'data');
                console.log('Sample DataAI:', dataAI ? `Found: ${dataAI.title}` : 'Not Found');

                const dev = parsedData.find(r => r.category === 'dev');
                console.log('Sample Dev:', dev ? `Found: ${dev.title}` : 'Not Found');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
