// supply_demand_report.gs
// Data reference file for SERIE view (Serie Couverture sheet)
// This file contains sample TSV data representing the structure of the
// Serie (Couverture) spreadsheet used by getShipmentData("SERIE").
//
// Sheet: Serie (Couverture)
// Range: getRange(8, 40, 145, 13) => Row 8, Col 40, 145 rows x 13 cols
//
// Column mapping (0-indexed from col 40):
//   [0]  Destination
//   [1]  Project
//   [2]  Description / Reference
//   [3]  Stock Palettes
//   [4]  Stock Remorques
//   [5]  Day 1 planning
//   [6]  Day 2 planning
//   [7]  Day 3 planning
//   [8]  Day 4 planning
//   [9]  Day 5 planning
//   [10] Day 6 planning
//   [11] (unused)
//   [12] Palette Commande
//
// Sample TSV data (tab-separated):
// Destination	Project	Description	StockPal	StockRem	D1	D2	D3	D4	D5	D6	-	PaletteCmd

var SERIE_SAMPLE_DATA = [
  // ZARAGOZE
  ["ZARAGOZE","P2X MV","REF-0001-BODY",20,2,15,12,18,10,22,8,0,45],
  ["ZARAGOZE","P2X MV","REF-0002-DOOR",18,1,12,10,14,8,18,6,0,38],
  ["ZARAGOZE","P2X MV","REF-0003-HOOD",12,0,8,7,10,6,12,4,0,28],
  ["","P2JO MCM","REF-0010-FRAME",15,3,10,9,12,8,14,5,0,32],
  ["","P2JO MCM","REF-0011-RAIL",10,1,7,6,9,5,10,3,0,22],
  ["","P2JORL FDR","REF-0020-PANEL",8,2,6,5,7,4,8,3,0,18],
  ["","P2JORL FDR","REF-0021-TRIM",6,0,4,4,5,3,6,2,0,14],
  // SOMACA
  ["SOMACA","XJI PH2","REF-1001-CHASSIS",25,4,20,18,22,15,25,10,0,55],
  ["","XJI PH2","REF-1002-AXLE",18,2,14,12,16,10,18,7,0,40],
  ["","XJI PH1","REF-1010-BUMPER",12,1,9,8,10,7,12,4,0,26],
  ["","XJI PH1","REF-1011-GRILLE",8,0,6,5,7,4,8,3,0,16],
  // VIGO
  ["VIGO","K9 MCM","REF-2001-ENGINE",30,5,24,20,26,18,30,12,0,65],
  ["","K9 MCM","REF-2002-GEARBOX",22,3,17,15,19,13,22,8,0,48],
  ["","K9 MCM","REF-2003-SHAFT",16,2,12,10,13,9,16,6,0,36],
  // PAMPLONA
  ["PAMPLONA","POLO CKD","REF-3001-SEAT",14,1,10,9,11,8,14,5,0,30],
  ["","POLO CKD","REF-3002-DASH",10,0,7,6,8,5,10,4,0,22],
  // MALAISIE
  ["MALAISIE","P2X MV","REF-4001-EXPORT-A",35,6,28,24,30,20,35,14,0,75],
  ["","P2X MV","REF-4002-EXPORT-B",28,4,22,19,24,16,28,11,0,60],
  // ARGENTINE
  ["ARGENTINE","P2X MV","REF-5001-CKD-A",32,5,25,22,27,18,32,13,0,70],
  ["","P2X MV","REF-5002-CKD-B",24,3,19,16,21,14,24,9,0,52],
  // RTE
  ["RTE","XJI PH2","REF-6001-SPARE",18,2,14,12,15,10,18,7,0,40],
  ["","TROC","REF-6010-RECYCLE",6,0,4,3,5,3,6,2,0,12],
  ["","P2JORL TRK","REF-6020-TRUCK",4,0,3,2,3,2,4,1,0,8],
  ["","J92HL","REF-6030-J92",3,0,2,2,3,2,3,1,0,6],
  ["","X52HL","REF-6040-X52",2,0,1,1,2,1,2,1,0,4],
  ["","K67","REF-6050-K67",2,0,1,1,1,1,2,1,0,3],
  ["","P2XHL","REF-6060-P2XHL",1,0,1,0,1,0,1,0,0,2]
];

// Note: This file is a data reference/documentation artifact.
// The actual data is read directly from the Google Spreadsheet
// in the getShipmentData() function in code.gs.
