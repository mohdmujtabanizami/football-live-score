// frontend/src/formationPositions.js

export const FORMATIONS = {
  "VS_MODE": {
    
    topTeam: {
      goalkeeper: { top: "5%", left: "50%" }, // Alisson
      defenders: [
        { top: "16%", left: "15%" },  // E. Militao
        { top: "16%", left: "38%" },  // Marquinhos
        { top: "16%", left: "62%" },  // T. Silva
        { top: "16%", left: "85%" },  // Danilo
      ],
      midfielders: [
        { top: "27%", left: "30%" },  // Paqueta
        { top: "27%", left: "70%" },  // Casemiro
      ],
      forwards: [
        { top: "38%", left: "15%" },  // Raphinha
        { top: "36%", left: "50%" },  // Neymar Jr
        { top: "45%", left: "50%" },  // Rui Torre (Center Center Line)
        { top: "38%", left: "85%" },  // Vini Jr
      ]
    },

    
    bottomTeam: {
      forwards: [
        { top: "55%", left: "15%" },  // Di Maria
        { top: "55%", left: "50%" },  // J. Alvarez
        { top: "55%", left: "85%" },  // Lionel Messi
      ],
      midfielders: [
        { top: "66%", left: "20%" },  // Mac Allister
        { top: "66%", left: "50%" },  // E. Fernandez
        { top: "66%", left: "80%" },  // R. De Paul
      ],
      defenders: [
        { top: "78%", left: "15%" },  // Tagliafigo
        { top: "78%", left: "38%" },  // Otamendi
        { top: "78%", left: "62%" },  // C. Romero
        { top: "78%", left: "85%" },  // N. Molina
      ],
      goalkeeper: { top: "92%", left: "50%" } // Martinez
    }
  }
};