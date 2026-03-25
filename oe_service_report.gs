// oe_service_report.gs
// Data reference file for AFM view (AFM couverture sheet)
// This file contains sample TSV data representing the structure of the
// "AFM couverture" spreadsheet used by getShipmentData("AFM").
//
// Sheet: AFM couverture
// Range: getRange(12, 24, 396, 9) => Row 12, Col 24, 396 rows x 9 cols
//
// Column mapping (0-indexed from col 24):
//   [0]  Client
//   [1]  Project
//   [2]  Description / Reference
//   [3]  CJT (Commande Journalière Theorique)
//   [4]  Palettes CJT
//   [5]  Palettes FG (Finis/Gérés)
//   [6]  Remorques FG
//   [7]  Besoin Palettes FG
//   [8]  Demande Remorques FG
//
// Sample TSV data (tab-separated):
// Client	Project	Description	CJT	PalCJT	PalFG	RemFG	BesoinPalFG	DemandeRemFG

var AFM_SAMPLE_DATA = [
  // RENAULT ESPAGNE
  ["RENAULT ESPAGNE","P2X AFM","AFM-0001-BODY-SIDE",120,48,42,8,52,9],
  ["RENAULT ESPAGNE","P2X AFM","AFM-0002-ROOF",95,38,33,6,40,7],
  ["RENAULT ESPAGNE","P2X AFM","AFM-0003-FLOOR-PAN",80,32,28,5,34,6],
  ["","XJI AFM","AFM-0010-DOOR-INNER",110,44,38,7,46,8],
  ["","XJI AFM","AFM-0011-PILLAR-A",75,30,26,5,32,5],
  ["","XJI AFM","AFM-0012-PILLAR-B",60,24,21,4,26,4],
  ["","K9 AFM","AFM-0020-CROSS-MEMBER",50,20,17,3,21,4],
  ["","K9 AFM","AFM-0021-BRACKET",40,16,14,3,17,3],
  // RENAULT MAROC
  ["RENAULT MAROC","P2X AFM","AFM-1001-CHASSIS-RR",85,34,30,6,36,6],
  ["RENAULT MAROC","P2X AFM","AFM-1002-LONGIT",70,28,24,5,29,5],
  ["","XJI AFM","AFM-1010-REINF-SIDE",65,26,23,4,27,5],
  ["","J92 AFM","AFM-1020-J92-PANEL",45,18,16,3,19,3],
  ["","J92 AFM","AFM-1021-J92-BEAM",35,14,12,2,15,3],
  // VOLKSWAGEN
  ["VOLKSWAGEN","K9 AFM","AFM-2001-VW-SILL",100,40,35,7,42,7],
  ["VOLKSWAGEN","K9 AFM","AFM-2002-VW-ARCH",88,35,31,6,37,7],
  ["","X52 AFM","AFM-2010-X52-RAIL",72,29,25,5,30,5],
  ["","X52 AFM","AFM-2011-X52-SUPPORT",58,23,20,4,24,4],
  // STELLANTIS
  ["STELLANTIS","P2X AFM","AFM-3001-ST-SHELL",130,52,46,9,55,10],
  ["STELLANTIS","P2X AFM","AFM-3002-ST-ROOF",105,42,37,7,44,8],
  ["","K9 AFM","AFM-3010-ST-AXLE-HSG",90,36,32,6,38,7],
  ["","K9 AFM","AFM-3011-ST-CONTROL-ARM",68,27,24,5,29,5],
  // TOYOTA
  ["TOYOTA","X52 AFM","AFM-4001-TY-FRONT",115,46,40,8,48,8],
  ["TOYOTA","X52 AFM","AFM-4002-TY-REAR",92,37,32,6,39,7],
  ["","J92 AFM","AFM-4010-TY-CENTER",78,31,27,5,33,6],
  ["","J92 AFM","AFM-4011-TY-INNER",62,25,22,4,26,5]
];

// Note: This file is a data reference/documentation artifact.
// The actual data is read directly from the Google Spreadsheet
// in the getShipmentData() function in code.gs.
