import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = "0";
  memoria: string = "0";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;

  constructor() { }

  digitos(valor: string) {
    if (this.resultado === '0' && valor !== '0') {
      this.resultado = valor;
      this.verifica_zero = false;
    } else {
     if (this.is_novo_calculo) {
      this.resetar();
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    } else {
      if (this.is_segundo_elemento) {
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    }
    } 
  }

  operadores(operador: string) {
    if (!this.operador_inserido && this.verifica_zero == false) {
      this.primeiro_elemento = this.resultado;
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }
    
  calcular() {
    if (this.operador === '+' && this.segundo_elemento !== '') {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + '=' + this.resultado;
      this.is_novo_calculo = true;
      this.verifica_zero = true;
    } else if (this.operador === '-' && this.segundo_elemento !== '') {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + '=' + this.resultado;
      this.is_novo_calculo = true;
      this.verifica_zero = true;
    } else if (this.operador === '*' && this.segundo_elemento !== '') {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + '=' + this.resultado;
      this.is_novo_calculo = true;
      this.verifica_zero = true;
    } else  if (this.operador === '/' && this.segundo_elemento !== '') {
      const segundoNumero = parseFloat(this.segundo_elemento);
      if (segundoNumero === 0) {
        this.resultado = 'Erro';
        return;
      }
      this.resultado = (parseFloat(this.primeiro_elemento) / segundoNumero).toString();
      this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + '=' + this.resultado;
      this.is_novo_calculo = true;
    } else {
      if (this.operador === '') {
        alert('Nenhum operador foi selecionado.');
      } else {
        alert('O segundo elemento não foi definido.');
      }
    }
    this.verifica_zero = true;

  }

  porcentagem() {
    if (!this.verifica_zero) {
      const currentValue = parseFloat(this.resultado);
      this.resultado = (currentValue / 100).toString();
      this.memoria = `${currentValue}% = ${this.resultado}`;
      this.verifica_zero = true;
    }
  }

  quadrado() {
    if (!this.verifica_zero) {
      const currentValue = parseFloat(this.resultado);
      this.resultado = (currentValue * currentValue).toString();
      this.memoria = `${currentValue}² = ${this.resultado}`;
      this.verifica_zero = true;
    }
  }

  raizQuadrada() {
    if (!this.verifica_zero) {
      const currentValue = parseFloat(this.resultado);
      if (currentValue >= 0) {
        this.resultado = Math.sqrt(currentValue).toString();
      } else {
        this.resultado = "Erro";
      }
      this.memoria = `√${currentValue} = ${this.resultado}`;
      this.verifica_zero = true;
    }
  }

  cubo() {
    if (!this.verifica_zero) {
      const currentValue = parseFloat(this.resultado);
      this.resultado = Math.pow(currentValue, 3).toString();
      this.memoria = `${currentValue}³ = ${this.resultado}`;
      this.verifica_zero = true;
    }
  }

  raizCubica() {
    if (!this.verifica_zero) {
      const currentValue = parseFloat(this.resultado);
      if (currentValue >= 0) {
        this.resultado = Math.cbrt(currentValue).toString();
      } else {
        this.resultado = "Erro";
      }
      this.memoria = `³√${currentValue} = ${this.resultado}`;
      this.verifica_zero = true;
    }
  }

  trocarSinal() {
    if (this.resultado !== '0') {
      if (this.resultado.charAt(0) === '-') {
        this.resultado = this.resultado.slice(1);
      } else {
        this.resultado = '-' + this.resultado;
      }
    }
  }

  calcularFatorial() {
    if (this.resultado.includes('.')) {
      this.resultado = 'Erro';
      return;
    }
    if (this.resultado === '') return;
    const num = parseInt(this.resultado);
    if (num < 0) {
      this.resultado = "Erro";
      return;
    }
    let fatorial = 1;
    for (let i = 2; i <= num; i++) {
      fatorial *= i;
    }
    this.resultado = fatorial.toString(); 
    this.memoria = `${num}! = ${this.resultado}`;
    this.verifica_zero = true;
  }  
  
  resetar() {
    this.resultado = "0";
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }
}