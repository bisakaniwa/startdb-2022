class Forca {

  vida = 6; // Regra 1
  palavraSecreta = [];
  letrasChutadas = [];
  palavraControle = [];
  palavraCorreta = [];
  estado = "aguardando chute"; // Regra 2
  
  constructor(palavra) {
    Array.from(palavra).forEach((letra)=>{
      this.palavraCorreta.push(letra);
      this.palavraControle.push(letra);
      this.palavraSecreta.push("_");
    })
  }

  chutar(letra) {
   if (letra.length == 1 && letra != '') { // Regra 3
    if (!this.palavraCorreta.includes(letra) && !this.letrasChutadas.includes(letra)) {
      this.vida--; // Regra 6
    }
    if (!this.palavraCorreta.includes(letra) && this.letrasChutadas.includes(letra)) {
      console.log("Você já chutou essa letra!") // Regra 4
    }
    if (this.palavraCorreta.includes(letra) && this.letrasChutadas.includes(letra)) {
      console.log("Você já chutou essa letra!") // Regra 4
    }   
    this.letrasChutadas.push(letra); // Regra 5
    
    while (this.palavraControle.includes(letra)) {
      this.palavraSecreta.splice(this.palavraControle.indexOf(letra), 1, letra); // Regra 7
      this.palavraControle.splice(this.palavraControle.indexOf(letra), 1, "-");
    }
    this.alterarEstado();
  }
   }

   alterarEstado() {
    if (this.vida <= 0) {
      this.estado = "perdeu"; // Regra 8
    }
    if (this.palavraSecreta.toString() == this.palavraCorreta.toString()) {
      this.estado = "ganhou"; // Regra 9
    }
   }
  

  buscarEstado() { 
    return this.estado; } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vida, // Quantidade de vidas restantes
          palavra: this.palavraSecreta // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
