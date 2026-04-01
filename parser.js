const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();

async function fetchXML(xml) {
    const response = await fetch(xml);
    const data = await response.text();
    return data;
}

async function parseXML(xml) {
    const parser = new XMLParser();
    const json = parser.parse(xml);
    return json;
}



fetchXML('https://www.relevantaudience.com/sitemap.xml').then((xml) => {
    const jsonObj = parser.parse(xml);
    console.log(JSON.stringify(jsonObj, null, 2));
    const urls = jsonObj.urlset.url.map((url) => url.loc);
    console.log(urls);
});

