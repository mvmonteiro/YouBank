export default function validacaoIdade(campo) {
    const dataNascimento = new Date(campo.value);   // new Date recebe o valor do campo e o converte pra uma maneira que o JS consiga entender
    
    if (!verificaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade.')
    }
}

function verificaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate() ); // data de nascimento + 18 anos para sabendo quando a pessoa fez 18 anos
    return dataAtual >= dataMais18;         // caso a dataAtual seja maior retorna true,ou seja, estamos em uma data depois dele ter feito 18
}