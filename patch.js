const fs = require('fs');
let code = fs.readFileSync('app/dashboard/documents/page.tsx', 'utf8');

const scanFunc = `
  const handleAIScan = async (fileToScan: File) => {
    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/scan-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: base64Data, mimeType: fileToScan.type }),
        });
        const json = await res.json();
        if (json.data) {
          if (json.data.expirationDate) {
            setExpiration(json.data.expirationDate);
          }
          if (json.data.documentName) {
            setDocType('Custom');
            setCustomName(json.data.documentName);
          }
          addToast("AI Scan completed! Form auto-filled.", "success");
        } else {
          addToast("AI Scan failed to extract details.", "error");
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(fileToScan);
    } catch (e) {
      console.error(e);
      addToast("Failed to scan document with AI.", "error");
      setIsScanning(false);
    }
  }

  useEffect(() => {
`;

code = code.replace("  useEffect(() => {", scanFunc);
fs.writeFileSync('app/dashboard/documents/page.tsx', code);
