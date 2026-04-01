const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();

async function fetchXML(xml) {
    const response = await fetch(xml);
    const data = await response.text();
    return data;
}


// This is the fetch XML function
fetchXML('https://www.google.com/sitemap.xml').then((xml) => {
    const jsonObj = parser.parse(xml);
    console.log(JSON.stringify(jsonObj, null, 2));
    const urls = jsonObj.urlset.url.map((url) => url.loc);
    console.log(urls);
});

