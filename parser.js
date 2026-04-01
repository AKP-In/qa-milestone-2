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
    console.log(json);
    return json;
}

async function getUrls(xml) {
    const json = await parseXML(xml);
    const urls = json.urlset.url.map((url) => url.loc);
    return urls;
}

// This is the fetch XML function
fetchXML('https://www.google.com/sitemap.xml').then((xml) => {
    const jsonObj = parser.parse(xml);
    console.log(JSON.stringify(jsonObj, null, 2));
    const urls = jsonObj.urlset.url.map((url) => url.loc);
    console.log(urls);
});

