const fs = require('fs').promises;
const filePath = process.argv[2];

async function readFile() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error("Error reading the file:", error);
        process.exit(1);
    }
}

function match(line){
    const operations = /([+\-*/])\s*(\d+)\s*(\d+)|(\d+)\s*([+\-*/])\s*(\d+)/
    const match = line.match(operations);
    if (match) {
        const operator = match[1] || match[5];
        const operand1 = match[2] || match[4];
        const operand2 = match[3] || match[6];

        switch (operator) {
            case '+':
                console.log('Resultado da operação', Number(operand1) + Number(operand2))
                break;
            case '-':
                console.log('Resultado da operação', Number(operand1) - Number(operand2))
                break;
            case '*':
                console.log('Resultado da operação', Number(operand1) * Number(operand2))
                break;
            case '/':
                if (Number(operand2) !== 0) {
                    console.log('Resultado da operação', Number(operand1) / Number(operand2))
                } else {
                    console.log('Erro: divisão por zero')
                }
                break;
            default:
                console.log('Erro: operação desconhecida')
                break;
        }
    }
}

function processOperations(data) {
    const lines = data.split('\n')
    for (let i = 1; i < lines.length; i++) {
        match(lines[i])
    }
}

async function exec() {
    if(process.argv.length <= 3){
        const text = await readFile()
        processOperations(text)
    }else{
        match(process.argv[3])
    }
    
}

exec()