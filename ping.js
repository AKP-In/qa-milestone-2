/**
 * Covers: 2xx, 4xx, 5xx (httpbin), a real-site 200, and fetch failures (DNS, refused port, bad URL).
 * Note: fetch follows redirects, so 3xx endpoints usually end as 2xx unless you use redirect: "manual".
 */
const links = [

    // --- 2xx (response.ok === true) ---
    "https://httpbin.org/status/200",
    "https://httpbin.org/status/201",
    "https://httpbin.org/status/204",
    "https://www.wikipedia.org",

    // --- 4xx (HTTP error, still no throw) ---
    "https://httpbin.org/status/400",
    "https://httpbin.org/status/401",
    "https://httpbin.org/status/403",
    "https://github.com/fake111111111",
    "https://httpbin.org/status/404",
    "https://httpbin.org/status/405",
    "https://httpbin.org/status/408",
    "https://httpbin.org/status/409",
    "https://httpbin.org/status/422",
    "https://httpbin.org/status/429",

    // --- 5xx ---
    "https://httpbin.org/status/500",
    "https://httpbin.org/status/502",
    "https://httpbin.org/status/503",

    // --- Throws before/with no HTTP status (catch) ---
    "https://example.com",
    "https://httpstat.us/404",
    "https://httpstat.us",
    "https://this-will-not-resolve.invalid",
    "http://127.0.0.1:1",
    "http://127.0.0.1:59999",
    "not-a-url",
    "",
    "http://10.255.255.1:81",
    // "http://192.168.255.255:81",
    // "http://203.0.113.1",
];

async function checkUrls() {
    for (const link of links) {
        try {
            const response = await fetch(link);// for every link in the links array, fetch the link and wait for the response
            const { status, statusText, ok } = response;
            if (ok) {// if the link is found, log the link, status, and status text
                console.log(`${link} — ${status} ${statusText}`);
            } else {// if the link is found but the page has an error, log the link, status, and status text
                console.log(`${link} — HTTP failed: ${status} ${statusText}`);
            }
            console.log("--------------------------------");
        } catch (error) {// if the link is not found, catch the error and log the error
            console.log("Failed to reach: " + link);
            printErrorMessage(error);
            console.log("--------------------------------");
        }
    }
}

//print descriptive message for common errors, otherwise print normal message. 
async function printErrorMessage(error) {
    
    console.log("Error Message: " + error.message);
    console.log("Error Code: " + error.cause?.code);
    if (error.cause?.code == "ERR_INVALID_URL") {
        console.log("Error Cause: This is not a valid URL.")
    }
    else if (error.cause?.code == "ENOTFOUND") {
        console.log("Error Cause: DNS lookup failed. There is no such host./The name may be wrong.")
    }
    else if (error.cause?.code == "ECONNREFUSED") {
        console.log("Error Cause: Server is refusing to connect. There may be no service on the port. Please check your firewall/VPN.")
    }
    else if (error.cause?.code == "ECONNRESET") {
        console.log("Error Cause: Connection was reset during transfer.")
    }
    else if (error.cause?.code == "UND_ERR_CONNECT_TIMEOUT" || error.cause?.code == "ETIMEDOUT") {
        console.log("Error Cause: Connection timed out. Site may be slow.")
    }
    else if (error.cause?.code == "EHOSTUNREACH" || error.cause?.code == "ENETUNREACH") {
        console.log("Error Cause: Your network can’t reach that host or network (offline Wi‑Fi, VPN, or routing issue).")
    }
    else if (error.cause?.code == "UNABLE_TO_GET_ISSUER_CERT_LOCALLY") {
        console.log("Error Cause: The security certificate couldn’t be verified (missing trusted issuer). Often corporate proxy/antivirus or outdated trust settings.")
    }
    else {
        console.log("Error Cause: " + error.cause?.message);
    }
}

module.exports = { checkUrls };//export the function so that it can be used in other files

checkUrls();