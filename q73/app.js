// Alaa Ahmad

function utf8ToBase64(utf8Text) {
    const textBuffer = Buffer.from(utf8Text, 'utf8');
    return textBuffer.toString('base64');
}

function base64ToUtf8(base64Text) {
    const base64Buffer = Buffer.from(base64Text, 'base64');
    return base64Buffer.toString('utf8');
}



function runDemo() {
    const originalText = "Hello from Alaa Ahmad at Birzeit University!";

    console.log("Original Text (UTF-8):");
    console.log(originalText);
    console.log("-".repeat(40));

    const encodedText = utf8ToBase64(originalText);
    console.log("Converted to Base64:");
    console.log(encodedText);
    console.log("-".repeat(40));

    const decodedText = base64ToUtf8(encodedText);
    console.log("Converted back to UTF-8:");
    console.log(decodedText);
    console.log("-".repeat(40));

    if (originalText === decodedText) {
        console.log("Verification Successful");
    } else {
        console.log("Verification Failed");
    }
}

runDemo();