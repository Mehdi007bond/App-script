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
   
    // SERIE: Ligne 8, de AN (colonne 40) à AZ (colonne 52) -> 13 colonnes exactes, sur 145 lignes
    const data = sheet.getRange(8, 40, 145, 13).getValues();
    const result = [];
    let currentDestination = "Unknown";
    let currentProject = "Unknown";
   
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let destCell = String(row[0] || "").trim();      // AN (0) : Destination
      let projectCell = String(row[1] || "").trim();   // AO (1) : Projet
      let descCell = String(row[2] || "").trim();      // AP (2) : Description
      let stockPalCell = Number(row[3]) || 0;          // AQ (3) : Stock palette
      let stockRemCell = Number(row[4]) || 0;          // AR (4) : Stock remorque
     
      // Stop si on arrive au Grand Total
      if (destCell.toLowerCase().includes("grand total") || projectCell.toLowerCase().includes("grand total")) {
        break;
      }
     
      // Mémoire de la destination et du projet
      if (destCell !== "" && !destCell.toLowerCase().includes("total")) {
        currentDestination = destCell.replace(/^[-+]\s*/, '').trim();
        currentProject = "Unknown"; // Sécurité: on réinitialise le projet au changement de destination
      }
      if (projectCell !== "" && !projectCell.toLowerCase().includes("total")) {
        currentProject = projectCell.replace(/^[-+]\s*/, '').trim();
      }
     
      // EXCLUSION DES SOUS-TOTAUX
      if (destCell.toLowerCase().includes("total") ||
          projectCell.toLowerCase().includes("total") ||
          descCell.toLowerCase().includes("total")) {
          continue;
      }
     
      let rawDays = [
        Number(row[5]) || 0, // AS (5) : Lundi
        Number(row[6]) || 0, // AT (6) : Mardi
        Number(row[7]) || 0, // AU (7) : Mercredi
        Number(row[8]) || 0, // AV (8) : Jeudi
        Number(row[9]) || 0, // AW (9) : Vendredi
        Number(row[10]) || 0 // AX (10): Samedi
      ];


      let sumDays = rawDays.reduce((a, b) => a + b, 0);
     
      // Besoin en Palette se trouve en colonne AZ (Index 12)
      let paletteCmd = Number(row[12]) || 0;          


      // Validation de la ligne
      if (descCell !== "" || projectCell !== "") {
        if (sumDays > 0 || stockRemCell > 0 || paletteCmd > 0 || stockPalCell > 0) {
         
          let cleanProject = currentProject;
         
          // ===================================================================
          // INTELLIGENCE MÉTIER : Attribution auto Gerbabilité & EXP2 pour la 2D
          // ===================================================================
          let gerbabilite = 3; // Défaut
          let p = cleanProject.toUpperCase();
          let d = currentDestination.toUpperCase();


          if (p.includes('XJI')) gerbabilite = 4;
          else if (p.includes('TRK') || p.includes('P2XHL')) gerbabilite = 2;


          let positionsExp2 = 12; // Défaut
          if (p.includes('P2X MV') && d.includes('ZARAGOZE')) positionsExp2 = 160;
          else if (p.includes('XJI PH2') && d.includes('SOMACA')) positionsExp2 = 156;
          else if (p.includes('XJI PH2') && d.includes('RTE')) positionsExp2 = 156;
          else if (p.includes('P2JO MCM') && d.includes('ZARAGOZE')) positionsExp2 = 142;
          else if (p.includes('P2X MV') && (d.includes('MALAISIE') || d.includes('ARGENTINE'))) positionsExp2 = 120;
          else if (p.includes('P2JORL FDR') && d.includes('ZARAGOZE')) positionsExp2 = 53;
          else if (p.includes('XJI PH1') && d.includes('SOMACA')) positionsExp2 = 33;
          else if (p.includes('POLO') && (d.includes('PAMPLONA') || d.includes('CKD'))) positionsExp2 = 26;
          else if (p.includes('K9 MCM') && d.includes('VIGO')) positionsExp2 = 22;
          else if (p.includes('TROC')) positionsExp2 = 19;
          else if (p.includes('P2JORL TRK')) positionsExp2 = 6;
          else if (p.includes('J92HL')) positionsExp2 = 5;
          else if (p.includes('X52HL')) positionsExp2 = 3;
          else if (p.includes('K67')) positionsExp2 = 2;
          else if (p.includes('P2XHL')) positionsExp2 = 1;


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
   
    // AFM: Ligne 12, de X (24) à AF (32) -> 9 colonnes exactes, de la ligne 12 à 407 (soit 396 lignes)
    const data = sheet.getRange(12, 24, 396, 9).getValues();
    const result = [];
    let currentClient = "Unknown";
    let currentProject = "Unknown";
   
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let clientCell = String(row[0] || "").trim();  // X (0) : Client
      let projectCell = String(row[1] || "").trim(); // Y (1) : Projet
      let descCell = String(row[2] || "").trim();    // Z (2) : Description (NOUVEAU)
     
      // Arrêt au Grand Total
      if (clientCell.toLowerCase().includes("grand total")) break;
     
      // Mise à jour de la mémoire pour Client et Projet
      if (clientCell !== "" && !clientCell.toLowerCase().includes("total")) {
        currentClient = clientCell.replace(/^[-+]\s*/, '').trim();
      }
      if (projectCell !== "" && !projectCell.toLowerCase().includes("total")) {
        currentProject = projectCell.replace(/^[-+]\s*/, '').trim();
      }


      // EXCLUSION DES SOUS-TOTAUX : On ignore les lignes "Total" créées par le TCD pour éviter de compter en double
      if (clientCell.toLowerCase().includes("total") ||
          projectCell.toLowerCase().includes("total") ||
          descCell.toLowerCase().includes("total")) {
          continue;
      }
     
      // Colonnes de valeurs décalées à cause de la Description
      let cjt = Number(row[3]) || 0;                // AA (3) : CJT
      let palletsCjt = Number(row[4]) || 0;         // AB (4): Pallets CJT
      let palletsFg = Number(row[5]) || 0;          // AC (5): Pallets FG
      let remorquesFg = Number(row[6]) || 0;        // AD (6): Remorques FG
      let besoinPalFg = Number(row[7]) || 0;        // AE (7): Besoin en Palette FG
      let demandeRemFg = Number(row[8]) || 0;       // AF (8): Demande en remorque FG


      // On ajoute la ligne si elle contient une description ou un projet et au moins une donnée
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
