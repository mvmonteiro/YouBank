export default function validacaoCPF (campo) {
    const cpf = campo.value.replace(/\.|-/g, "");       // pega o valor do cpf e substitui o que for . e - por vazio -> mais fácil de validar

    if ( (validaNumerosRepetidos(cpf)) || (validaPrimeiroDigito(cpf)) || (validaSegundoDigito(cpf)) ) {
        campo.setCustomValidity('Este cpf não é válido.');
    }
  
}

function validaNumerosRepetidos (cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf);         // se tiver algum sequência igual ao "cpf" dentro da lista, ele vai retornar true
}

function validaPrimeiroDigito (cpf) {
    let soma = 0;
    let multiplicador = 10;

        // método para validar o primeiro dígito verificador de cpf (o número depois do hífen)
        //                                              cpf base = 3  8 8 . 3 4 0 . 6 6 8 - 6 3 
    for (let tam = 0; tam < 9; tam++) {              // count    = 10 9 8   7 6 5   4 3 2
        soma += cpf[tam] * multiplicador;            // multipli = 30 72 64 21 24 0 24 18 16
        multiplicador--;                             // soma     = 269
    }

    soma = (soma * 10) % 11;                        // soma = 269*10 = 2690 % 11 = 6 (resto) 6 realmente é o primeiro dígito cpf[9]
    if (soma == 10 || soma == 1) {
        soma = 0;
    }

    return soma != cpf[9];                          // retorna um booleano dizendo se soma é igual ao dígito (o cpf[9] nunca é 0)
}

function validaSegundoDigito (cpf) {
    let soma = 0;
    let multiplicador = 11;

        // método para validar o primeiro dígito verificador de cpf (o número depois do hífen)
        //                                              cpf base = 3  8 8 . 3 4 0 . 6 6 8 - 6 3 
    for (let tam = 0; tam < 10; tam++) {             // count    = 10 9 8   7 6 5   4 3 2
        soma += cpf[tam] * multiplicador;            // multipli = 30 72 64 21 24 0 24 18 16
        multiplicador--;                             // soma     = 269
    }

    soma = (soma * 10) % 11;                        // soma = 269*10 = 2690 % 11 = 6 (resto) 6 realmente é o primeiro dígito cpf[9]
    if (soma == 10 || soma == 1) {
        soma = 0;  
    }

    return soma != cpf[10];                         // retorna um booleano dizendo se soma é igual ao dígito (o cpf[9] nunca é 0)
}