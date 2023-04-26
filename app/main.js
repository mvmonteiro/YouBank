import validacaoCPF from "./validaCPF.js";
import validacaoIdade from "./validaIdade.js";

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]
const camposDoFormulario = document.querySelectorAll("[required");
const elementoFormularioInteiro = document.querySelector("[data-formulario]");

elementoFormularioInteiro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const listaResposta = {
        "nome": evento.target.elements["nome"].value,
        "email": evento.target.elements["email"].value,
        "rg": evento.target.elements["rg"].value,
        "cpf": evento.target.elements["cpf"].value,
        "aniversario": evento.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaResposta));

    window.location.href = './abrir-conta-form-2.html';
})

    // para cada campo de input do formulário: 
camposDoFormulario.forEach( (campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));                 // adiciona um evento de "tira o foco" do campo
    campo.addEventListener("invalid", (evento) => evento.preventDefault());     // tira as mensagens padrões de erro do validity state
})

    // função que faz verificação de cada campo
function verificaCampo (campo) {
    let mensagem = "";                                              // variável vazia
    campo.setCustomValidity('');                                    // adiciona string vazia no customValidity -> tira a mensagem de erro quando o usuário escreve da forma correta

    if ( (campo.name == "cpf") && (campo.value.length >= 11) ) {    // ve se o campo com blur tem o nome = cpf e se o que tem dentro é >= 11
        validacaoCPF(campo);                                        // função que verifica os possíveis erros de um cpf
    }
    if ( (campo.name == "aniversario") && (campo.value != "") ) {   // ve se o campo com blue tem nome = aniversario e se não está vazio
        validacaoIdade(campo);                                      // função que verifica se o usuário é maios de 18 anos
    }

    tiposDeErro.forEach( (erro) =>{
        if (campo.validity[erro]) {         // vou acessar o validity do campo.NomeDoErro -> caso ele seja true, quer dizer ele está acontecendo
            mensagem = mensagens[campo.name][erro];     // minha variável string = nomeDaqueleCampo (rg,cpf...) e o nomeDoErro (tooShort...)
            console.log(mensagem);
        }
    })

    const elementoDeErro = campo.parentNode.querySelector('.mensagem-erro');    // vai no elemento pai HTML do campo e procura a classe mensagem-erro
    const validadorDeInput = campo.checkValidity();                             // verifica o booleano validity

    if (!validadorDeInput)                                                      // se for false = tem erro
        elementoDeErro.textContent = mensagem;                                  // escreve dentro da tag html a frase colocada em mensagem
    else
        elementoDeErro.textContent = "";                                        // escreve nada

}