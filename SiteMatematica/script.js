// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os gráficos
    initLimitGraph();
    initContinuityGraph();
    initAlgorithmComparison();
    initActivationFunctions();
    initGradientDescent();
    initCompressionGraph();
    initCustomFunctionGraph();
    
    // Configurar eventos
    setupQuiz();
    setupCalculator();
    
    // Configurar seletores de funções
    document.getElementById('function-select')?.addEventListener('change', function() {
        initLimitGraph(this.value);
    });
    
    document.getElementById('continuity-select')?.addEventListener('change', function() {
        initContinuityGraph(this.value);
    });
    
    document.getElementById('activation-select')?.addEventListener('change', function() {
        initActivationFunctions(this.value);
    });
    
    // Configurar botões de funções para limites
    document.getElementById('limit-function-1')?.addEventListener('click', function() {
        // Remover classe active de todos os botões
        document.querySelectorAll('#limit-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Adicionar classe active ao botão clicado
        this.classList.add('active');
        initLimitGraph('1');
    });
    
    document.getElementById('limit-function-2')?.addEventListener('click', function() {
        document.querySelectorAll('#limit-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        initLimitGraph('2');
    });
    
    document.getElementById('limit-function-3')?.addEventListener('click', function() {
        document.querySelectorAll('#limit-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        initLimitGraph('3');
    });
    
    // Configurar botões de funções para continuidade
    document.getElementById('continuity-function-1')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        initContinuityGraph('1');
    });
    
    document.getElementById('continuity-function-2')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        initContinuityGraph('2');
    });
    
    document.getElementById('continuity-function-3')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        initContinuityGraph('3');
    });
});

// Gráfico de Limites
function initLimitGraph(functionType = '1') {
    const limitGraph = document.getElementById('limit-graph');
    if (!limitGraph) return;
    
    // Gerar dados para o gráfico
    const x = [];
    const y = [];
    
    // Gerar pontos para x
    for (let i = -5; i <= 5; i += 0.1) {
        // Arredondar para evitar problemas de precisão de ponto flutuante
        const roundedI = Math.round(i * 100) / 100;
        
        // Evitar pontos onde a função não está definida
        if (functionType === '1' && Math.abs(roundedI - 1) < 0.01) continue; // Evitar divisão por zero
        if (functionType === '2' && Math.abs(roundedI) < 0.01) continue; // Evitar divisão por zero
        if (functionType === '3' && Math.abs(roundedI) < 0.01) continue; // Evitar divisão por zero
        
        x.push(roundedI);
        
        // Calcular y baseado na função selecionada
        let yValue;
        switch(functionType) {
            case '1': // f(x) = (x² - 1)/(x - 1)
                yValue = (roundedI*roundedI - 1)/(roundedI - 1);
                break;
            case '2': // f(x) = sin(x)/x
                yValue = Math.sin(roundedI)/roundedI;
                break;
            case '3': // f(x) = (1 - cos(x))/x
                yValue = (1 - Math.cos(roundedI))/roundedI;
                break;
            default:
                yValue = (roundedI*roundedI - 1)/(roundedI - 1);
        }
        
        // Verificar se o valor é válido antes de adicionar
        if (!isNaN(yValue) && isFinite(yValue)) {
            y.push(yValue);
        } else {
            // Se o valor não for válido, não adicione o ponto
            x.pop();
        }
    }
    
    // Adicionar ponto especial para o limite
    let limitPoint = {
        x: [1],
        y: [2], // Limite de (x² - 1)/(x - 1) quando x -> 1 é 2
        mode: 'markers',
        marker: {
            size: 10,
            color: 'red'
        },
        name: 'Limite'
    };
    
    if (functionType === '2') {
        limitPoint.x = [0];
        limitPoint.y = [1]; // Limite de sin(x)/x quando x -> 0 é 1
    } else if (functionType === '3') {
        limitPoint.x = [0];
        limitPoint.y = [0]; // Limite de (1 - cos(x))/x quando x -> 0 é 0
    }
    
    // Criar o gráfico
    const data = [{
        x: x,
        y: y,
        mode: 'lines',
        name: 'f(x)',
        line: {
            color: 'blue',
            width: 2
        }
    }, limitPoint];
    
    const layout = {
        title: 'Visualização de Limites',
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(limitGraph, data, layout);
}

// Gráfico de Continuidade
function initContinuityGraph(exampleType = '1') {
    const continuityGraph = document.getElementById('continuity-graph');
    if (!continuityGraph) return;
    
    // Gerar dados para o gráfico
    const x = [];
    const y = [];
    
    // Gerar pontos para x
    for (let i = -5; i <= 5; i += 0.1) {
        x.push(i);
        
        // Calcular y baseado no exemplo selecionado
        let yValue;
        switch(exampleType) {
            case '1': // Função contínua: f(x) = x²
                yValue = i*i;
                break;
            case '2': // Função com descontinuidade removível: f(x) = (x² - 4)/(x - 2) para x ≠ 2, f(2) = 4
                if (Math.abs(i - 2) < 0.01) {
                    continue; // Pular este ponto para criar a descontinuidade
                } else {
                    yValue = (i*i - 4)/(i - 2);
                }
                break;
            case '3': // Função com descontinuidade essencial: f(x) = 1/x
                if (Math.abs(i) < 0.01) {
                    continue; // Pular este ponto para evitar divisão por zero
                } else {
                    yValue = 1/i;
                }
                break;
            default:
                yValue = i*i;
        }
        y.push(yValue);
    }
    
    // Adicionar ponto especial para a descontinuidade removível
    let specialPoint = null;
    if (exampleType === '2') {
        specialPoint = {
            x: [2],
            y: [4], // Valor correto no ponto de descontinuidade
            mode: 'markers',
            marker: {
                size: 10,
                color: 'red'
            },
            name: 'Ponto Removível'
        };
    }
    
    // Criar o gráfico
    const data = [{
        x: x,
        y: y,
        mode: 'lines',
        name: 'f(x)',
        line: {
            color: 'blue',
            width: 2
        }
    }];
    
    if (specialPoint) {
        data.push(specialPoint);
    }
    
    const layout = {
        title: 'Visualização de Continuidade',
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(continuityGraph, data, layout);
}

// Gráfico de Comparação de Algoritmos
function initAlgorithmComparison() {
    const algorithmGraph = document.getElementById('algorithm-comparison');
    if (!algorithmGraph) return;
    
    // Gerar dados para o gráfico
    const n = [];
    const bubbleSortTime = [];
    const mergeSortTime = [];
    
    // Gerar pontos para n
    for (let i = 1; i <= 100; i += 5) {
        n.push(i);
        bubbleSortTime.push(i*i); // O(n²)
        mergeSortTime.push(i * Math.log2(i)); // O(n log n)
    }
    
    // Criar o gráfico
    const data = [
        {
            x: n,
            y: bubbleSortTime,
            mode: 'lines',
            name: 'Bubble Sort - O(n²)',
            line: {
                color: 'red',
                width: 2
            }
        },
        {
            x: n,
            y: mergeSortTime,
            mode: 'lines',
            name: 'Merge Sort - O(n log n)',
            line: {
                color: 'green',
                width: 2
            }
        }
    ];
    
    const layout = {
        title: 'Comparação de Complexidade de Algoritmos',
        xaxis: {
            title: 'Tamanho da Entrada (n)',
            zeroline: true,
            showgrid: true
        },
        yaxis: {
            title: 'Tempo de Execução',
            zeroline: true,
            showgrid: true
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(algorithmGraph, data, layout);
}

// Gráfico de Funções de Ativação
function initActivationFunctions(functionType = 'sigmoid') {
    const activationGraph = document.getElementById('activation-functions');
    if (!activationGraph) return;
    
    // Gerar dados para o gráfico
    const x = [];
    const y = [];
    
    // Gerar pontos para x
    for (let i = -5; i <= 5; i += 0.1) {
        x.push(i);
        
        // Calcular y baseado na função de ativação selecionada
        let yValue;
        switch(functionType) {
            case 'sigmoid':
                yValue = 1 / (1 + Math.exp(-i));
                break;
            case 'tanh':
                yValue = Math.tanh(i);
                break;
            case 'relu':
                yValue = Math.max(0, i);
                break;
            case 'leaky_relu':
                yValue = i > 0 ? i : 0.01 * i;
                break;
            default:
                yValue = 1 / (1 + Math.exp(-i));
        }
        y.push(yValue);
    }
    
    // Criar o gráfico
    const data = [{
        x: x,
        y: y,
        mode: 'lines',
        name: functionType,
        line: {
            color: 'purple',
            width: 2
        }
    }];
    
    const layout = {
        title: 'Funções de Ativação em Redes Neurais',
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(activationGraph, data, layout);
}

// Gráfico de Gradient Descent
function initGradientDescent() {
    const gradientGraph = document.getElementById('gradient-descent');
    if (!gradientGraph) return;
    
    // Criar dados para a função de custo
    const x = [];
    const y = [];
    const z = [];
    
    // Gerar pontos para a função de custo
    for (let i = -2; i <= 2; i += 0.1) {
        for (let j = -2; j <= 2; j += 0.1) {
            x.push(i);
            y.push(j);
            z.push(i*i + j*j); // Função de custo simples: f(x,y) = x² + y²
        }
    }
    
    // Criar trajetória do gradient descent
    const pathX = [];
    const pathY = [];
    const pathZ = [];
    
    let currentX = 1.5;
    let currentY = 1.5;
    const learningRate = 0.1;
    
    for (let i = 0; i < 20; i++) {
        pathX.push(currentX);
        pathY.push(currentY);
        pathZ.push(currentX*currentX + currentY*currentY);
        
        // Atualizar posição usando gradient descent
        const gradX = 2 * currentX;
        const gradY = 2 * currentY;
        
        currentX -= learningRate * gradX;
        currentY -= learningRate * gradY;
    }
    
    // Criar o gráfico
    const data = [
        {
            x: x,
            y: y,
            z: z,
            type: 'surface',
            colorscale: 'Viridis',
            showscale: false
        },
        {
            x: pathX,
            y: pathY,
            z: pathZ,
            mode: 'lines+markers',
            type: 'scatter3d',
            line: {
                color: 'red',
                width: 4
            },
            marker: {
                size: 5,
                color: 'red'
            },
            name: 'Gradient Descent'
        }
    ];
    
    const layout = {
        title: 'Visualização de Gradient Descent',
        scene: {
            xaxis: { title: 'x' },
            yaxis: { title: 'y' },
            zaxis: { title: 'Custo' }
        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 50
        }
    };
    
    Plotly.newPlot(gradientGraph, data, layout);
}

// Gráfico de Compressão de Imagens e Vídeos
function initCompressionGraph() {
    const compressionGraph = document.getElementById('compression-graph');
    if (!compressionGraph) return;
    
    // Dados para o gráfico
    const compressionRatio = [1, 2, 5, 10, 20, 50, 100];
    const imageQuality = [100, 95, 85, 70, 50, 30, 10];
    const fileSize = [100, 50, 20, 10, 5, 2, 1];
    
    // Criar o gráfico
    const trace1 = {
        x: compressionRatio,
        y: imageQuality,
        name: 'Qualidade da Imagem (%)',
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: 'blue',
            width: 2
        },
        marker: {
            size: 8
        }
    };
    
    const trace2 = {
        x: compressionRatio,
        y: fileSize,
        name: 'Tamanho do Arquivo (%)',
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: 'red',
            width: 2
        },
        marker: {
            size: 8
        },
        yaxis: 'y2'
    };
    
    const data = [trace1, trace2];
    
    const layout = {
        title: 'Relação entre Compressão, Qualidade e Tamanho',
        xaxis: {
            title: 'Taxa de Compressão',
            type: 'log',
            autorange: true
        },
        yaxis: {
            title: 'Qualidade da Imagem (%)',
            range: [0, 100]
        },
        yaxis2: {
            title: 'Tamanho do Arquivo (%)',
            range: [0, 100],
            titlefont: {color: 'red'},
            tickfont: {color: 'red'},
            overlaying: 'y',
            side: 'right'
        },
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(compressionGraph, data, layout);
}

// Gráfico de Função Personalizada
function initCustomFunctionGraph() {
    const customGraph = document.getElementById('custom-function-graph');
    if (!customGraph) return;
    
    // Usar a função padrão
    updateCustomGraph('x^2 - 1', 1);
}

function updateCustomGraph(funcStr, point) {
    const customGraph = document.getElementById('custom-function-graph');
    if (!customGraph) return;
    
    // Converter a string da função para uma função JavaScript
    const func = createFunction(funcStr);
    
    // Gerar dados para o gráfico
    const x = [];
    const y = [];
    
    // Gerar pontos para x (com mais pontos próximos ao ponto de interesse)
    const step = 0.05; // Passo menor para melhor resolução
    
    // Primeiro, adicionar pontos à esquerda do ponto de interesse
    for (let i = point - 5; i < point - 0.1; i += step) {
        try {
            const yValue = func(i);
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 100) {
                x.push(i);
                y.push(yValue);
            }
        } catch (e) {
            // Ignorar erros (divisão por zero, etc.)
        }
    }
    
    // Adicionar pontos muito próximos ao ponto de interesse (maior resolução)
    const microStep = 0.001;
    for (let i = point - 0.1; i <= point + 0.1; i += microStep) {
        if (Math.abs(i - point) < 0.0001) continue; // Pular o ponto exato para evitar divisão por zero
        
        try {
            const yValue = func(i);
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 100) {
                x.push(i);
                y.push(yValue);
            }
        } catch (e) {
            // Ignorar erros
        }
    }
    
    // Adicionar pontos à direita do ponto de interesse
    for (let i = point + 0.1; i <= point + 5; i += step) {
        try {
            const yValue = func(i);
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 100) {
                x.push(i);
                y.push(yValue);
            }
        } catch (e) {
            // Ignorar erros
        }
    }
    
    // Calcular o limite para adicionar como ponto especial
    let limitValue = null;
    try {
        // Verificar casos especiais comuns
        if (funcStr.includes('x^2 - 1') && funcStr.includes('x - 1') && point === 1) {
            limitValue = 2;
        } else if (funcStr.includes('sin(x)') && funcStr.includes('/x') && point === 0) {
            limitValue = 1;
        } else if (funcStr.includes('1 - cos(x)') && funcStr.includes('/x') && point === 0) {
            limitValue = 0;
        } else {
            // Calcular aproximação do limite
            const epsilon = 0.0001;
            const leftLimit = func(point - epsilon);
            const rightLimit = func(point + epsilon);
            
            if (!isNaN(leftLimit) && isFinite(leftLimit) && 
                !isNaN(rightLimit) && isFinite(rightLimit) &&
                Math.abs(leftLimit - rightLimit) < 0.1) {
                limitValue = (leftLimit + rightLimit) / 2;
            }
        }
    } catch (e) {
        // Ignorar erros
    }
    
    // Criar o gráfico
    const data = [{
        x: x,
        y: y,
        mode: 'lines',
        name: 'f(x) = ' + funcStr,
        line: {
            color: 'blue',
            width: 2
        }
    }];
    
    // Adicionar ponto do limite, se calculado
    if (limitValue !== null) {
        data.push({
            x: [point],
            y: [limitValue],
            mode: 'markers',
            name: 'Limite',
            marker: {
                size: 10,
                color: 'red'
            }
        });
    }
    
    // Adicionar linha vertical no ponto a
    const layout = {
        title: 'Gráfico da Função',
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true,
            autorange: true
        },
        shapes: [{
            type: 'line',
            x0: point,
            y0: -10,
            x1: point,
            y1: 10,
            line: {
                color: 'red',
                width: 2,
                dash: 'dash'
            }
        }],
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        }
    };
    
    Plotly.newPlot(customGraph, data, layout);
}

// Função para converter string em função JavaScript
function createFunction(funcStr) {
    // Substituir operadores comuns
    funcStr = funcStr.replace(/\^/g, '**');
    
    // Substituir funções matemáticas comuns
    funcStr = funcStr.replace(/sin\(/g, 'Math.sin(');
    funcStr = funcStr.replace(/cos\(/g, 'Math.cos(');
    funcStr = funcStr.replace(/tan\(/g, 'Math.tan(');
    funcStr = funcStr.replace(/sqrt\(/g, 'Math.sqrt(');
    funcStr = funcStr.replace(/log\(/g, 'Math.log(');
    
    // Criar a função
    return new Function('x', 'return ' + funcStr + ';');
}

// Configurar a calculadora de limites
function setupCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', function() {
        const funcStr = document.getElementById('function-input').value;
        const point = parseFloat(document.getElementById('point-input').value);
        const resultElement = document.getElementById('limit-value');
        
        // Atualizar o gráfico
        updateCustomGraph(funcStr, point);
        
        // Calcular o limite (aproximação)
        try {
            // Verificar casos especiais comuns
            if (funcStr.includes('x^2 - 1') && funcStr.includes('x - 1') && point === 1) {
                resultElement.textContent = '2';
                return;
            }
            if (funcStr.includes('sin(x)') && funcStr.includes('/x') && point === 0) {
                resultElement.textContent = '1';
                return;
            }
            if (funcStr.includes('1 - cos(x)') && funcStr.includes('/x') && point === 0) {
                resultElement.textContent = '0';
                return;
            }
            
            const func = createFunction(funcStr);
            
            // Tentar calcular o valor diretamente no ponto
            try {
                const directValue = func(point);
                if (!isNaN(directValue) && isFinite(directValue)) {
                    resultElement.textContent = directValue.toFixed(4);
                    return;
                }
            } catch (e) {
                // Continuar com o cálculo do limite
            }
            
            // Aproximar o limite pela esquerda e pela direita
            const epsilons = [0.0001, 0.001, 0.01, 0.1];
            let foundValidLimits = false;
            let leftLimit, rightLimit;
            
            for (let i = 0; i < epsilons.length; i++) {
                try {
                    leftLimit = func(point - epsilons[i]);
                    rightLimit = func(point + epsilons[i]);
                    
                    // Se ambos os limites são números válidos, use-os
                    if (!isNaN(leftLimit) && isFinite(leftLimit) && 
                        !isNaN(rightLimit) && isFinite(rightLimit)) {
                        foundValidLimits = true;
                        break;
                    }
                } catch (err) {
                    // Continuar tentando com epsilon maior
                    if (i === epsilons.length - 1) {
                        throw err; // Propagar o erro se todas as tentativas falharem
                    }
                }
            }
            
            if (foundValidLimits) {
                // Usar uma tolerância relativa para valores grandes
                const tolerance = Math.max(0.1, Math.abs(leftLimit) * 0.01);
                
                if (Math.abs(leftLimit - rightLimit) < tolerance) {
                    // Calcular a média dos limites laterais para maior precisão
                    const limitValue = (leftLimit + rightLimit) / 2;
                    resultElement.textContent = limitValue.toFixed(4);
                } else {
                    // Verificar se os limites laterais são infinitos com o mesmo sinal
                    if ((leftLimit > 1e10 && rightLimit > 1e10) || 
                        (leftLimit < -1e10 && rightLimit < -1e10)) {
                        const sinal = leftLimit > 0 ? '+' : '-';
                        resultElement.textContent = `${sinal}∞`;
                    } else {
                        resultElement.textContent = 'Não existe (limites laterais diferentes)';
                        console.log(`Limite esquerdo: ${leftLimit}, Limite direito: ${rightLimit}`);
                    }
                }
            } else {
                throw new Error("Não foi possível calcular limites válidos");
            }
        } catch (e) {
            console.error("Erro no cálculo do limite:", e);
            
            // Tentar calcular o limite em caso de indeterminação
            try {
                // Verificar casos especiais conhecidos
                if (funcStr.includes('/') && point === 0) {
                    // Formas comuns de indeterminação 0/0
                    resultElement.textContent = 'Indeterminado (forma 0/0)';
                } else if (funcStr.includes('x^2') || funcStr.includes('x * x')) {
                    // Para funções polinomiais, o limite geralmente existe
                    const func = createFunction(funcStr);
                    try {
                        // Tentar calcular o valor exato no ponto
                        const exactValue = func(point);
                        if (!isNaN(exactValue) && isFinite(exactValue)) {
                            resultElement.textContent = exactValue.toFixed(4);
                            return;
                        }
                    } catch (err) {
                        // Ignorar erro e continuar
                    }
                    
                    // Se não conseguir calcular no ponto exato, usar aproximação
                    const epsilon = 0.001;
                    const approxValue = (func(point - epsilon) + func(point + epsilon)) / 2;
                    resultElement.textContent = approxValue.toFixed(4);
                } else {
                    resultElement.textContent = 'Erro ao calcular: função não definida no ponto';
                }
            } catch (e) {
                resultElement.textContent = 'Erro ao calcular';
            }
        }
    });
}

// Configurar o quiz
function setupQuiz() {
    const checkQuizBtn = document.getElementById('check-quiz');
    if (!checkQuizBtn) return;
    
    // Definir as respostas corretas e feedback em um objeto para facilitar manutenção
    const quizData = [
        {
            correctAnswer: 'a',
            correctFeedback: 'Correto! O valor de 200 MB/s que a velocidade se aproxima, mas nunca ultrapassa, é um exemplo de limite.',
            incorrectFeedback: 'Incorreto. Quando um valor se aproxima de um número específico mas nunca o ultrapassa, estamos falando de um limite.'
        },
        {
            correctAnswer: 'b',
            correctFeedback: 'Correto! A continuidade é o conceito matemático que garante que uma animação seja suave e sem "buracos" ou "saltos".',
            incorrectFeedback: 'Incorreto. Uma animação suave sem saltos ou travamentos é um exemplo de continuidade em matemática.'
        },
        {
            correctAnswer: 'a',
            correctFeedback: 'Correto! Quando x é muito grande, o termo 3x domina e 2/150x se aproxima de zero, então o limite é 3.',
            incorrectFeedback: 'Incorreto. Quando x tende ao infinito em f(x)=3x+2/150x, o termo 2/150x tende a zero, e o limite é 3.'
        },
        {
            correctAnswer: 'b',
            correctFeedback: 'Correto! Uma descontinuidade na função significa que a leitura pularia instantaneamente de um valor para outro.',
            incorrectFeedback: 'Incorreto. Quando uma função não é contínua, ela apresenta "saltos" ou "pulos" instantâneos entre valores.'
        },
        {
            correctAnswer: 'c',
            correctFeedback: 'Correto! Em uma descontinuidade removível, o valor que a função deveria ter no ponto pode ser determinado pelo limite.',
            incorrectFeedback: 'Incorreto. Uma descontinuidade removível significa que o limite existe, mas a função não está definida ou tem valor diferente naquele ponto.'
        }
    ];
    
    checkQuizBtn.addEventListener('click', function() {
        let score = 0;
        
        // Processar cada pergunta usando um loop
        for (let i = 0; i < 5; i++) {
            const questionNumber = i + 1;
            const answer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
            const feedback = document.getElementById(`feedback-q${questionNumber}`);
            
            if (!feedback) continue;
            
            if (answer) {
                if (answer.value === quizData[i].correctAnswer) {
                    score++;
                    feedback.textContent = quizData[i].correctFeedback;
                    feedback.className = 'quiz-feedback correct';
                } else {
                    feedback.textContent = quizData[i].incorrectFeedback;
                    feedback.className = 'quiz-feedback incorrect';
                }
            } else {
                feedback.textContent = 'Por favor, selecione uma resposta.';
                feedback.className = 'quiz-feedback';
            }
        }
        
        // Mostrar pontuação total
        const resultElement = document.getElementById('quiz-result');
        if (resultElement) {
            resultElement.textContent = `Pontuação: ${score}/5`;
            resultElement.style.display = 'block';
        }
    });
}