// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar o carregamento do Plotly antes de inicializar os gráficos
    function waitForPlotly() {
        if (typeof Plotly !== 'undefined') {
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
        } else {
            setTimeout(waitForPlotly, 100);
        }
    }
    
    waitForPlotly();
    
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
        // Obter a posição atual do ponto, se existir
        let currentPosition = 2;
        const slider = document.getElementById('continuity-point-slider');
        if (slider) {
            currentPosition = parseFloat(slider.value);
        }
        initContinuityGraph('1', currentPosition);
    });
    
    document.getElementById('continuity-function-2')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        // Obter a posição atual do ponto, se existir
        let currentPosition = 2;
        const slider = document.getElementById('continuity-point-slider');
        if (slider) {
            currentPosition = parseFloat(slider.value);
        }
        initContinuityGraph('2', currentPosition);
    });
    
    document.getElementById('continuity-function-3')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        // Obter a posição atual do ponto, se existir
        let currentPosition = 2;
        const slider = document.getElementById('continuity-point-slider');
        if (slider) {
            currentPosition = parseFloat(slider.value);
        }
        initContinuityGraph('3', currentPosition);
    });
    
    document.getElementById('continuity-function-4')?.addEventListener('click', function() {
        document.querySelectorAll('#continuity-graph + .graph-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        // Obter a posição atual do ponto, se existir
        let currentPosition = 2;
        const slider = document.getElementById('continuity-point-slider');
        if (slider) {
            currentPosition = parseFloat(slider.value);
        }
        initContinuityGraph('4', currentPosition);
    });
});

// Variável global para armazenar o tipo de função atual do gráfico de limites
let currentLimitFunctionType = '1';

// Gráfico de Limites
function initLimitGraph(functionType = '1', pointPosition = 1) {
    const limitGraph = document.getElementById('limit-graph');
    if (!limitGraph) return;
    
    // Verificar se é um dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    // Atualizar o tipo de função atual
    if (functionType !== undefined) {
        currentLimitFunctionType = functionType;
    }
    
    // Gerar dados para o gráfico
    const x = [];
    const y = [];
    
    // Ponto crítico padrão para cada função
    let criticalPoint = 1; // Padrão para função 1
    if (currentLimitFunctionType === '2' || currentLimitFunctionType === '3') criticalPoint = 0;
    
    // Usar o ponto móvel se fornecido, caso contrário usar o ponto crítico padrão
    const movingPoint = pointPosition !== undefined ? pointPosition : criticalPoint;
    
    // Atualizar o slider existente ou criar um novo
    let slider = document.getElementById('limit-point-slider');
    let valueDisplay = document.getElementById('limit-point-value');
    
    if (!slider) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        sliderContainer.innerHTML = `
            <label for="limit-point-slider">Posição do ponto: <span id="limit-point-value">${movingPoint.toFixed(1)}</span></label>
            <input type="range" id="limit-point-slider" min="-4.9" max="4.9" step="0.1" value="${movingPoint}">
        `;
        limitGraph.parentNode.insertBefore(sliderContainer, limitGraph);
        
        // Adicionar evento ao slider
        slider = document.getElementById('limit-point-slider');
        valueDisplay = document.getElementById('limit-point-value');
        
        slider.addEventListener('input', function(e) {
            const newPosition = parseFloat(e.target.value);
            valueDisplay.textContent = newPosition.toFixed(1);
            
            // Usar setTimeout para evitar recursão infinita
            setTimeout(() => {
                initLimitGraph(currentLimitFunctionType, newPosition);
            }, 10);
        });
    } else {
        // Atualizar o valor do slider existente se necessário
        if (Math.abs(parseFloat(slider.value) - movingPoint) > 0.01) {
            slider.value = movingPoint;
            valueDisplay.textContent = movingPoint.toFixed(1);
        }
    }
    
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
        x: [movingPoint],
        y: [2], // Valor padrão
        mode: 'markers',
        marker: {
            size: 10,
            color: 'red'
        },
        name: 'Ponto Móvel'
    };
    
    // Calcular o valor y para o ponto móvel
    if (functionType === '1') {
        if (Math.abs(movingPoint - 1) < 0.01) {
            limitPoint.y = [2]; // Limite quando x -> 1
        } else {
            limitPoint.y = [(movingPoint*movingPoint - 1)/(movingPoint - 1)];
        }
    } else if (functionType === '2') {
        if (Math.abs(movingPoint) < 0.01) {
            limitPoint.y = [1]; // Limite de sin(x)/x quando x -> 0 é 1
        } else {
            limitPoint.y = [Math.sin(movingPoint)/movingPoint];
        }
    } else if (functionType === '3') {
        if (Math.abs(movingPoint) < 0.01) {
            limitPoint.y = [0]; // Limite de (1 - cos(x))/x quando x -> 0 é 0
        } else {
            limitPoint.y = [(1 - Math.cos(movingPoint))/movingPoint];
        }
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
    
    // Adicionar o ponto móvel aos dados
    data.push(limitPoint);
    
    const layout = {
        title: 'Visualização de Limites',
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true,
            range: [-5, 5]
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true,
            range: [-5, 5]
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1
        },
        margin: {
            l: 40,
            r: 30,
            t: 50,
            b: 40
        },
        autosize: true
    };
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(limitGraph, data, layout, config);
}

// Variável global para armazenar o tipo de função atual do gráfico de continuidade
let currentContinuityFunctionType = '1';

// Gráfico de Continuidade
function initContinuityGraph(exampleType = '1', pointPosition = 2) {
    const continuityGraph = document.getElementById('continuity-graph');
    if (!continuityGraph) return;
    
    // Atualizar o tipo de função atual
    if (exampleType !== undefined) {
        currentContinuityFunctionType = exampleType;
    }
    
    // Atualizar o slider existente ou criar um novo
    let slider = document.getElementById('continuity-point-slider');
    let valueDisplay = document.getElementById('continuity-point-value');
    
    if (!slider) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        sliderContainer.innerHTML = `
            <label for="continuity-point-slider">Posição do ponto: <span id="continuity-point-value">${pointPosition.toFixed(1)}</span></label>
            <input type="range" id="continuity-point-slider" min="-4.9" max="4.9" step="0.1" value="${pointPosition}">
        `;
        continuityGraph.parentNode.insertBefore(sliderContainer, continuityGraph);
        
        // Adicionar evento ao slider
        slider = document.getElementById('continuity-point-slider');
        valueDisplay = document.getElementById('continuity-point-value');
        
        slider.addEventListener('input', function(e) {
            const newPosition = parseFloat(e.target.value);
            valueDisplay.textContent = newPosition.toFixed(1);
            
            // Usar setTimeout para evitar recursão infinita
            setTimeout(() => {
                initContinuityGraph(currentContinuityFunctionType, newPosition);
            }, 10);
        });
    } else {
        // Atualizar o valor do slider existente se necessário
        if (Math.abs(parseFloat(slider.value) - pointPosition) > 0.01) {
            slider.value = pointPosition;
            valueDisplay.textContent = pointPosition.toFixed(1);
        }
    }
    
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
    
    // Adicionar ponto móvel para todos os tipos de função
    let specialPoint = {
        x: [pointPosition],
        y: [0], // Valor padrão que será atualizado abaixo
        mode: 'markers',
        marker: {
            size: 10,
            color: 'red'
        },
        name: 'Ponto Móvel'
    };
    
    // Calcular o valor y para o ponto móvel com base no tipo de função
    switch(exampleType) {
        case '1': // Função contínua: f(x) = x²
            specialPoint.y = [pointPosition*pointPosition];
            specialPoint.name = 'Ponto Móvel';
            break;
            
        case '2': // Função com descontinuidade removível
            if (Math.abs(pointPosition - 2) < 0.01) {
                specialPoint.y = [4]; // Valor correto no ponto de descontinuidade
                specialPoint.name = 'Ponto Removível';
            } else {
                specialPoint.y = [(pointPosition*pointPosition - 4)/(pointPosition - 2)];
                specialPoint.name = 'Ponto Móvel';
            }
            break;
            
        case '3': // Função com descontinuidade essencial: f(x) = 1/x
            if (Math.abs(pointPosition) < 0.01) {
                // Não mostrar o ponto no zero (descontinuidade essencial)
                specialPoint = null;
            } else {
                specialPoint.y = [1/pointPosition];
                specialPoint.name = 'Ponto Móvel';
            }
            break;
            
        case '4': // Função com descontinuidade de salto: f(x) = floor(x)
            // Limpar os dados anteriores
            x.length = 0;
            y.length = 0;
            
            // Gerar novos pontos para a função degrau
            for (let i = -5; i <= 5; i += 0.1) {
                x.push(i);
                y.push(Math.floor(i));
            }
            
            // Configurar o ponto móvel
            specialPoint.y = [Math.floor(pointPosition)];
            
            // Se estiver exatamente em um número inteiro, marcar como ponto de descontinuidade
            if (Math.abs(pointPosition - Math.floor(pointPosition)) < 0.01) {
                specialPoint.name = 'Ponto de Descontinuidade';
            } else {
                specialPoint.name = 'Ponto Móvel';
            }
            break;
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
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(continuityGraph, data, layout, config);
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
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(algorithmGraph, data, layout, config);
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
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(activationGraph, data, layout, config);
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
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(gradientGraph, data, layout, config);
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
    
    const config = {
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot(compressionGraph, data, layout, config);
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
            // Aumentar o limite de valores para o eixo Y
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 10) {
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
            // Aumentar o limite de valores para o eixo Y
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 1000) {
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
            // Aumentar o limite de valores para o eixo Y
            if (!isNaN(yValue) && isFinite(yValue) && Math.abs(yValue) < 1000) {
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
            color: '#007bff',
            width: 3
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
                size: 8,
                color: '#28a745',
                line: {
                    color: '#fff',
                    width: 2
                }
            }
        });
    }
    
    // Adicionar linha vertical no ponto a
    const layout = {
        title: {
            text: 'Gráfico da Função',
            font: {
                size: 16,
                color: '#333'
            }
        },
        // Layout responsivo
        autosize: true,
        margin: {
            l: 50,
            r: 50,
            t: 60,
            b: 50
        },
        xaxis: {
            title: 'x',
            zeroline: true,
            showgrid: true,
            gridcolor: '#e0e0e0',
            range: [-5, 5]
        },
        yaxis: {
            title: 'f(x)',
            zeroline: true,
            showgrid: true,
            gridcolor: '#e0e0e0',
            range: [-5, 5]
        },
        shapes: [{
            type: 'line',
            x0: point,
            y0: -5,
            x1: point,
            y1: 5,
            line: {
                color: '#dc3545',
                width: 2,
                dash: 'dash'
            }
        }],
        showlegend: true,
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(255,255,255,0.8)',
            bordercolor: '#ddd',
            borderwidth: 1
        },
        plot_bgcolor: '#fafafa',
        paper_bgcolor: 'white'
    };
    
    const config = {
        responsive: true,
        displayModeBar: false,
        staticPlot: false
    };
    
    Plotly.newPlot(customGraph, data, layout, config);
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

    calculateBtn.addEventListener('click', function () {
        const funcInput = document.getElementById('function-input').value;
        const point = parseFloat(document.getElementById('point-input').value);
        const resultElement = document.getElementById('limit-value');

        if (!funcInput || isNaN(point)) {
            resultElement.textContent = "Entrada inválida";
            return;
        }

        // Normalizar a função: remover espaços e minúsculas
        const funcStr = funcInput.replace(/\s+/g, '').toLowerCase();

        // Atualizar gráfico (se existir)
        if (typeof updateCustomGraph === 'function') {
            updateCustomGraph(funcStr, point);
        }

        // Criar função segura
        let func;
        try {
            func = createFunction(funcStr);
        } catch (e) {
            resultElement.textContent = "Erro: função inválida";
            return;
        }

        try {
            // Casos especiais clássicos
            if ((funcStr.includes('x^2-1') && funcStr.includes('x-1') && point === 1)) {
                resultElement.textContent = '2';
                return;
            }
            if ((funcStr.includes('sin(x)/x') || funcStr.includes('sinx/x')) && point === 0) {
                resultElement.textContent = '1';
                return;
            }
            if ((funcStr.includes('(1-cos(x))/x') || funcStr.includes('1-cosx/x')) && point === 0) {
                resultElement.textContent = '0';
                return;
            }

            // Tentar calcular valor direto
            const directValue = func(point);
            if (!isNaN(directValue) && isFinite(directValue)) {
                resultElement.textContent = directValue.toFixed(4);
                return;
            }

            // Aproximação lateral
            const epsilons = [0.0001, 0.001, 0.01, 0.1];
            let leftLimit, rightLimit, found = false;

            for (let eps of epsilons) {
                try {
                    leftLimit = func(point - eps);
                    rightLimit = func(point + eps);

                    if (isFinite(leftLimit) && isFinite(rightLimit)) {
                        found = true;
                        break;
                    }
                } catch (err) {
                    continue;
                }
            }

            if (!found) {
                resultElement.textContent = "Não foi possível calcular limite";
                return;
            }

            const tolerance = Math.max(0.0001, Math.abs(leftLimit) * 0.001);

            if (Math.abs(leftLimit - rightLimit) < tolerance) {
                const limitValue = (leftLimit + rightLimit) / 2;
                resultElement.textContent = limitValue.toFixed(4);
            } else {
                // Verificar infinitos
                if ((Math.abs(leftLimit) > 1e10 && Math.abs(rightLimit) > 1e10)) {
                    const sinal = leftLimit > 0 ? '+' : '-';
                    resultElement.textContent = `${sinal}∞`;
                } else {
                    resultElement.textContent = "Não existe (limites laterais diferentes)";
                    console.log(`Limite esquerdo: ${leftLimit}, Limite direito: ${rightLimit}`);
                }
            }
        } catch (e) {
            console.error(e);
            resultElement.textContent = "Erro ao calcular limite";
        }
    });
}

// Função segura para criar funções a partir de string
function createFunction(funcStr) {
    // Substituir ^ por **
    let expr = funcStr.replace(/\^/g, '**');

    // Mapear funções matemáticas
    expr = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

    // Criar função JS segura
    return new Function('x', `return ${expr};`);
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