function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Global Shipment Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Reçoit un paramètre "viewType" qui vaut soit 'SERIE' soit 'AFM'
function getShipmentData(viewType) {
  if (!viewType) viewType = 'SERIE';
 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
 
  // ==========================================
  // 1. LOGIQUE FIGÉE POUR LA VUE "SERIE" (3 NIVEAUX)
  // ==========================================
  if (viewType === 'SERIE') {
    const sheet = ss.getSheetByName("Serie (Couverture)");
    if (!sheet) throw new Error("Impossible de trouver la feuille 'Serie (Couverture)'");
   
    const data = sheet.getRange(8, 40, 145, 13).getValues();
    const result = [];
    let currentDestination = "Unknown";
    let currentProject = "Unknown";
   
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let destCell = String(row[0] || "").trim();
      let projectCell = String(row[1] || "").trim();
      let descCell = String(row[2] || "").trim();
      let stockPalCell = Number(row[3]) || 0;
      let stockRemCell = Number(row[4]) || 0;
     
      if (destCell.toLowerCase().includes("grand total") || projectCell.toLowerCase().includes("grand total")) {
        break;
      }
     
      if (destCell !== "" && !destCell.toLowerCase().includes("total")) {
        currentDestination = destCell.replace(/^[-+]\s*/, '').trim();
        currentProject = "Unknown";
      }
      if (projectCell !== "" && !projectCell.toLowerCase().includes("total")) {
        currentProject = projectCell.replace(/^[-+]\s*/, '').trim();
      }
     
      if (destCell.toLowerCase().includes("total") ||
          projectCell.toLowerCase().includes("total") ||
          descCell.toLowerCase().includes("total")) {
          continue;
      }
     
      let rawDays = [
        Number(row[5]) || 0,
        Number(row[6]) || 0,
        Number(row[7]) || 0,
        Number(row[8]) || 0,
        Number(row[9]) || 0,
        Number(row[10]) || 0
      ];

      let sumDays = rawDays.reduce((a, b) => a + b, 0);
      let paletteCmd = Number(row[12]) || 0;          

      if (descCell !== "" || projectCell !== "") {
        if (sumDays > 0 || stockRemCell > 0 || paletteCmd > 0 || stockPalCell > 0) {
          let cleanProject = currentProject;
         
          let gerbabilite = 3;
          let projectUpper = cleanProject.toUpperCase();
          let destinationUpper = currentDestination.toUpperCase();

          if (projectUpper.includes('XJI')) gerbabilite = 4;
          else if (projectUpper.includes('TRK') || projectUpper.includes('P2XHL')) gerbabilite = 2;

          let positionsExp2 = 12;
          if (projectUpper.includes('P2X MV') && destinationUpper.includes('ZARAGOZE')) positionsExp2 = 160;
          else if (projectUpper.includes('XJI PH2') && destinationUpper.includes('SOMACA')) positionsExp2 = 156;
          else if (projectUpper.includes('XJI PH2') && destinationUpper.includes('RTE')) positionsExp2 = 156;
          else if (projectUpper.includes('P2JO MCM') && destinationUpper.includes('ZARAGOZE')) positionsExp2 = 142;
          else if (projectUpper.includes('P2X MV') && (destinationUpper.includes('MALAISIE') || destinationUpper.includes('ARGENTINE'))) positionsExp2 = 120;
          else if (projectUpper.includes('P2JORL FDR') && destinationUpper.includes('ZARAGOZE')) positionsExp2 = 53;
          else if (projectUpper.includes('XJI PH1') && destinationUpper.includes('SOMACA')) positionsExp2 = 33;
          else if (projectUpper.includes('POLO') && (destinationUpper.includes('PAMPLONA') || destinationUpper.includes('CKD'))) positionsExp2 = 26;
          else if (projectUpper.includes('K9 MCM') && destinationUpper.includes('VIGO')) positionsExp2 = 22;
          else if (projectUpper.includes('TROC')) positionsExp2 = 19;
          else if (projectUpper.includes('P2JORL TRK')) positionsExp2 = 6;
          else if (projectUpper.includes('J92HL')) positionsExp2 = 5;
          else if (projectUpper.includes('X52HL')) positionsExp2 = 3;
          else if (projectUpper.includes('K67')) positionsExp2 = 2;
          else if (projectUpper.includes('P2XHL')) positionsExp2 = 1;

          result.push({
            destination: currentDestination,
            project: currentProject,
            description: descCell,
            palette: paletteCmd,
            stockPal: stockPalCell,
            stockRem: stockRemCell,
            rawDays: rawDays,
            totalPlanning: sumDays,
            gerb: gerbabilite,
            exp2: positionsExp2
          });
        }
      }
    }
    return { type: 'SERIE', data: result };
  }
 
  // ==========================================
  // 2. LOGIQUE FIGÉE POUR LA VUE "AFM"
  // ==========================================
  else if (viewType === 'AFM') {
    const sheet = ss.getSheetByName("AFM couverture");
    if (!sheet) throw new Error("Impossible de trouver la feuille 'AFM couverture'");
   
    const data = sheet.getRange(12, 24, 396, 9).getValues();
    const result = [];
    let currentClient = "Unknown";
    let currentProject = "Unknown";
   
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let clientCell = String(row[0] || "").trim(); 
      let projectCell = String(row[1] || "").trim();
      let descCell = String(row[2] || "").trim();   
     
      if (clientCell.toLowerCase().includes("grand total")) break;
     
      if (clientCell !== "" && !clientCell.toLowerCase().includes("total")) {
        currentClient = clientCell.replace(/^[-+]\s*/, '').trim();
      }
      if (projectCell !== "" && !projectCell.toLowerCase().includes("total")) {
        currentProject = projectCell.replace(/^[-+]\s*/, '').trim();
      }

      if (clientCell.toLowerCase().includes("total") ||
          projectCell.toLowerCase().includes("total") ||
          descCell.toLowerCase().includes("total")) {
          continue;
      }
     
      let cjt = Number(row[3]) || 0;               
      let palletsCjt = Number(row[4]) || 0;        
      let palletsFg = Number(row[5]) || 0;         
      let remorquesFg = Number(row[6]) || 0;       
      let besoinPalFg = Number(row[7]) || 0;       
      let demandeRemFg = Number(row[8]) || 0;      

      if (descCell !== "" || projectCell !== "") {
        if (cjt > 0 || palletsCjt > 0 || palletsFg > 0 || remorquesFg > 0 || besoinPalFg > 0 || demandeRemFg > 0) {
          result.push({
            client: currentClient,
            project: currentProject,
            description: descCell,
            cjt: cjt,
            palletsCjt: palletsCjt,
            palletsFg: palletsFg,
            remorquesFg: remorquesFg,
            besoinPalFg: besoinPalFg,
            demandeRemFg: demandeRemFg
          });
        }
      }
    }
    return { type: 'AFM', data: result };
  }
}
