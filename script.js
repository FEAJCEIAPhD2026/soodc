// ==========================================
// FUNÇÃO GLOBAL DE INICIALIZAÇÃO DA NAVEGAÇÃO
// ==========================================
function carregarNavegacaoLateral() {
    const sidebarContainer = document.getElementById('sidebar');
    if (!sidebarContainer) return;

    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

    let opcoesObjetos = '<option value="">-- Escolha um Código --</option>';
    try {
        let chaves = Object.keys(localStorage);
        let chavesObjetos = chaves.filter(chave => chave && chave.startsWith('id_objeto_'));
        
        chavesObjetos.forEach(chave => {
            let codigoLimpo = chave.replace('id_objeto_', '');
            opcoesObjetos += `<option value="${chave}">${codigoLimpo}</option>`;
        });
    } catch (e) {
        console.log("Erro ao aceder ao arquivo local.");
    }

    let htmlNavegacao = `
        <div class="sidebar-section">
            <div class="sidebar-title">Painel de Controlo</div>
            <button class="nav-btn" onclick="acionarNovoRegisto()">Criar Novo Registo</button>
            <label style="font-size: 12px; margin-top: 5px; font-weight: bold; font-family: 'Times New Roman', serif;">Consultar Registo Existente</label>
            <select id="consola-consulta-objetos" style="font-size: 13px; padding: 5px; margin-top: 2px; margin-bottom: 5px; width: 100%; font-family: 'Times New Roman', serif; border: 1px solid #000; background-color: #fff;" onchange="acionarConsultarRegisto(this.value)">
                ${opcoesObjetos}
            </select>
        </div>
        
        <div class="sidebar-section">
            <div class="sidebar-title">Módulos</div>
            <button class="nav-btn ${paginaAtual === 'index.html' ? 'active' : ''}" onclick="location.href='index.html'">Módulo 1: Identificação</button>
            <button class="nav-btn ${(paginaAtual === 'modulo2.html' || paginaAtual === 'discursivo_m2.html') ? 'active' : ''}" onclick="location.href='modulo2.html'">Módulo 2: Documentação</button>
            <button class="nav-btn ${paginaAtual === 'modulo3.html' ? 'active' : ''}" onclick="location.href='modulo3.html'">Módulo 3: Interpretação</button>
            <button class="nav-btn ${(paginaAtual === 'grafico_m4.html' || paginaAtual === 'discursivo_m4.html' || paginaAtual === 'estrutura_m4.html' || paginaAtual === 'composicao_m4.html' || paginaAtual === 'cromatica_m4.html' || paginaAtual === 'tipografia_m4.html' || paginaAtual === 'foco_m4.html' || paginaAtual === 'retorica_m4.html' || paginaAtual === 'enunciacao_m4.html' || paginaAtual === 'iconografia_m4.html') ? 'active' : ''}" onclick="location.href='grafico_m4.html'">Módulo 4: Classificação</button>
            <button class="nav-btn ${paginaAtual === 'modulo5.html' ? 'active' : ''}" onclick="location.href='modulo5.html'">Módulo 5: Contextualização</button>
        </div>
        
        <div class="sidebar-section" style="border-bottom: none;">
            <div class="sidebar-title">Síntese de Observação</div>
            <button class="nav-btn" onclick="alert('Síntese de observação guardada com sucesso!')">Síntese do Registo</button>
            <button class="nav-btn" onclick="alert('Funcionalidade de download em desenvolvimento.')">Descarregar Síntese do Registo</button>
        </div>
    `;

    sidebarContainer.innerHTML = htmlNavegacao;
}

// LÓGICA DE REGISTO DO MÓDULO 1
function acionarNovoRegisto() {
    const campoNumero = document.getElementById('m1-numero-sequencial');
    if(campoNumero) {
        campoNumero.disabled = false;
        campoNumero.value = "";
        campoNumero.focus();
    }

    const camposM1 = ['m1-data-registo', 'm1-ano', 'm1-titulo', 'm1-coautoria', 'm1-tipo-documento', 'm1-localizacao', 'm1-notas'];
    camposM1.forEach(id => { const el = document.getElementById(id); if(el) el.value = ""; });
    const selectCat = document.getElementById('m1-categoria'); if(selectCat) selectCat.value = "";
    
    bloquearCamposM1(false);
    
    const btnGravar = document.getElementById('btn-gravar-m1');
    const btnEditar = document.getElementById('btn-editar-m1');
    const btnApagar = document.getElementById('btn-apagar-m1');
    
    if(btnGravar) btnGravar.disabled = false;
    if(btnEditar) btnEditar.disabled = true;
    if(btnApagar) btnApagar.disabled = true;

    const selector = document.getElementById('consola-consulta-objetos');
    if(selector) selector.value = "";

    atualizarPreVisualizacaoCodigo();
}

function atualizarPreVisualizacaoCodigo() {
    const num = document.getElementById('m1-numero-sequencial')?.value || "____";
    const ano = document.getElementById('m1-ano')?.value || "____";
    const autor = document.getElementById('m1-autor')?.value || "____";
    const cat = document.getElementById('m1-categoria')?.value || "____";
    
    const campoCodigo = document.getElementById('m1-codigo-objeto');
    if(campoCodigo) {
        campoCodigo.value = `${num}_[${ano}]_[${autor}]_[${cat}]`;
    }
}

function gravarModulo1() {
    const num = document.getElementById('m1-numero-sequencial')?.value;
    const ano = document.getElementById('m1-ano')?.value;
    const autor = document.getElementById('m1-autor')?.value;
    const cat = document.getElementById('m1-categoria')?.value;

    if(!num || num.trim() === "") {
        alert("Por favor, introduza o número sequencial cronológico do objeto.");
        return;
    }
    if(!ano || !cat || ano === "____" || cat === "____") {
        alert("Por favor, preencha o Ano e a Categoria.");
        return;
    }

    const codigoFinal = `${num}_[${ano}]_[${autor}]_[${cat}]`;

    const dadosFormulario = {
        numero: num,
        dataRegisto: document.getElementById('m1-data-registo')?.value || "",
        ano: ano,
        categoria: cat,
        titulo: document.getElementById('m1-titulo')?.value || "",
        autor: autor,
        coautoria: document.getElementById('m1-coautoria')?.value || "",
        tipoDocumento: document.getElementById('m1-tipo-documento')?.value || "",
        localizacao: document.getElementById('m1-localizacao')?.value || "",
        notas: document.getElementById('m1-notas')?.value || ""
    };

    localStorage.setItem(`id_objeto_${codigoFinal}`, JSON.stringify(dadosFormulario));
    localStorage.setItem('codigoObjetoGlobal', codigoFinal);

    const campoCodigoM1 = document.getElementById('m1-codigo-objeto');
    if(campoCodigoM1) campoCodigoM1.value = codigoFinal;
    
    bloquearCamposM1(true);
    
    const btnGravar = document.getElementById('btn-gravar-m1');
    const btnEditar = document.getElementById('btn-editar-m1');
    const btnApagar = document.getElementById('btn-apagar-m1');
    
    if(btnGravar) btnGravar.disabled = true;
    if(btnEditar) btnEditar.disabled = false;
    if(btnApagar) btnApagar.disabled = false;
    
    alert("Módulo 1 gravado com sucesso! Arquivo de registos atualizado.");

    carregarNavegacaoLateral();
    
    const selector = document.getElementById('consola-consulta-objetos');
    if(selector) selector.value = `id_objeto_${codigoFinal}`;
}

function editarModulo1() {
    bloquearCamposM1(false);
    const btnGravar = document.getElementById('btn-gravar-m1');
    const btnEditar = document.getElementById('btn-editar-m1');
    if(btnGravar) btnGravar.disabled = false;
    if(btnEditar) btnEditar.disabled = true;
}

function bloquearCamposM1(status) {
    const campos = [
        'm1-numero-sequencial', 'm1-ano', 'm1-titulo', 'm1-autor', 
        'm1-coautoria', 'm1-categoria', 'm1-tipo-documento', 
        'm1-localizacao', 'm1-notas'
    ];
    campos.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.disabled = status;
    });
}
function acionarConsultarRegisto(chaveObjeto) {
    if (!chaveObjeto) return;

    let dadosRaw = localStorage.getItem(chaveObjeto);
    if (!dadosRaw) return;

    let dados = JSON.parse(dadosRaw);
    let codigoLimpo = chaveObjeto.replace('id_objeto_', '');
    
    localStorage.setItem('codigoObjetoGlobal', codigoLimpo);

    const IDsConsolaCodigo = ['m1-codigo-objeto', 'm2-codigo-herdado', 'm3-codigo-herdado', 'm4-codigo-herdado', 'm5-codigo-herdado', 'consola-codigo'];
    IDsConsolaCodigo.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = codigoLimpo;
    });

    if (document.getElementById('m1-numero-sequencial')) {
        document.getElementById('m1-numero-sequencial').value = dados.numero || "";
        document.getElementById('m1-data-registo').value = dados.dataRegisto || "";
        document.getElementById('m1-ano').value = dados.ano || "";
        document.getElementById('m1-categoria').value = dados.categoria || "";
        document.getElementById('m1-titulo').value = dados.titulo || "";
        document.getElementById('m1-autor').value = dados.autor || "";
        
        const btnGravar = document.getElementById('btn-gravar-m1');
        const btnEditar = document.getElementById('btn-editar-m1');
        const btnApagar = document.getElementById('btn-apagar-m1');
        
        if(btnGravar) btnGravar.disabled = true;
        if(btnEditar) btnEditar.disabled = false;
        if(btnApagar) btnApagar.disabled = false;
    }

    if (document.getElementById('m2-funcao-discursivo')) {
        carregarModulo2Discursivo();
    }
}

function eliminarRegistoSelecionado() {
    const selector = document.getElementById('consola-consulta-objetos');
    if (!selector || !selector.value) {
        alert("Nenhum objeto selecionado para eliminação.");
        return;
    }

    const chaveObjeto = selector.value;
    const codigoLimpo = chaveObjeto.replace('id_objeto_', '');

    if (confirm(`Tem a certeza que deseja eliminar definitivamente o objeto [${codigoLimpo}] de todo o arquivo do sistema?`)) {
        localStorage.removeItem(chaveObjeto);
        
        if (localStorage.getItem('codigoObjetoGlobal') === codigoLimpo) {
            localStorage.removeItem('codigoObjetoGlobal');
        }

        alert("Registo eliminado com sucesso.");
        carregarNavegacaoLateral();
        acionarNovoRegisto();
        
        const IDsConsolaCodigo = ['m1-codigo-objeto', 'm2-codigo-herdado', 'm3-codigo-herdado', 'm4-codigo-herdado', 'm5-codigo-herdado', 'consola-codigo'];
        IDsConsolaCodigo.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) campo.value = "";
        });
    }
}

function sincronizarElementosConstituintes() {
    const campoElementosGraficos = document.getElementById('m2-elementos-constituintes-grafico');
    if (campoElementosGraficos) {
        const dadosGraficos = JSON.parse(localStorage.getItem('m4_grafico_dados') || '{}');
        let textoCompilado = [];
        for (const [variavel, valor] of Object.entries(dadosGraficos)) {
            if(valor) textoCompilado.push(`${variavel.toUpperCase()}: ${valor}`);
        }
        campoElementosGraficos.value = textoCompilado.join('\n') || "A aguardar preenchimento de variáveis no Módulo 4 Gráfico...";
    }
}

// ==========================================
// LÓGICA ESPECÍFICA DO MÓDULO 2 DISCURSIVO
// ==========================================
function gravarModulo2Discursivo() {
    const codigoGlobal = localStorage.getItem('codigoObjetoGlobal');
    if (!codigoGlobal) {
        alert("Nenhum objeto selecionado! Por favor, selecione ou crie um objeto no Módulo 1.");
        return;
    }

    const checkboxesConfig = document.querySelectorAll('input[name="m2_configuracao"]:checked');
    const configuracaoSalva = Array.from(checkboxesConfig).map(cb => cb.value);

    const checkboxesElementos = document.querySelectorAll('input[name="m2_elementos"]:checked');
    const elementosSalvos = Array.from(checkboxesElementos).map(cb => cb.value);

    const funcaoDiscursivo = document.getElementById('m2-funcao-discursivo')?.value || "";
    const circulacaoDiscursivo = document.getElementById('m2-circulacao-discursivo')?.value || "";
    const enquadramentoDiscursivo = document.getElementById('m2-enquadramento-discursivo')?.value || "";
    const obsDiscursivo = document.getElementById('m2-obs-discursivo')?.value || "";

    const dadosM2Discursivo = {
        configuracao: configuracaoSalva,
        elementosConstituintes: elementosSalvos,
        funcaoPrincipal: funcaoDiscursivo,
        modoCirculacao: circulacaoDiscursivo,
        enquadramentoInsercao: enquadramentoDiscursivo,
        observacoes: obsDiscursivo
    };

    localStorage.setItem(`m2_discursivo_${codigoGlobal}`, JSON.stringify(dadosM2Discursivo));
    
    const btnGravar = document.getElementById('btn-gravar-m2-discursivo');
    const btnEditar = document.getElementById('btn-editar-m2-discursivo');
    if (btnGravar) btnGravar.disabled = true;
    if (btnEditar) btnEditar.disabled = false;

    bloquearCamposM2Discursivo(true);
    alert('Dados Discursivos do Módulo 2 Guardados com sucesso!');
}

function carregarModulo2Discursivo() {
    const codigoGlobal = localStorage.getItem('codigoObjetoGlobal');
    if (!codigoGlobal) return;

    const dadosRaw = localStorage.getItem(`m2_discursivo_${codigoGlobal}`);
    if (!dadosRaw) {
        limparFormularioM2Discursivo();
        bloquearCamposM2Discursivo(false);
        const btnGravar = document.getElementById('btn-gravar-m2-discursivo');
        const btnEditar = document.getElementById('btn-editar-m2-discursivo');
        if (btnGravar) btnGravar.disabled = false;
        if (btnEditar) btnEditar.disabled = true;
        return;
    }

    const dados = JSON.parse(dadosRaw);

    const checkboxesConfig = document.querySelectorAll('input[name="m2_configuracao"]');
    checkboxesConfig.forEach(cb => {
        cb.checked = dados.configuracao ? dados.configuracao.includes(cb.value) : false;
    });

    const checkboxesElementos = document.querySelectorAll('input[name="m2_elementos"]');
    checkboxesElementos.forEach(cb => {
        cb.checked = dados.elementosConstituintes ? dados.elementosConstituintes.includes(cb.value) : false;
    });

    if (document.getElementById('m2-funcao-discursivo')) document.getElementById('m2-funcao-discursivo').value = dados.funcaoPrincipal || "";
    if (document.getElementById('m2-circulacao-discursivo')) document.getElementById('m2-circulacao-discursivo').value = dados.modoCirculacao || "";
    if (document.getElementById('m2-enquadramento-discursivo')) document.getElementById('m2-enquadramento-discursivo').value = dados.enquadramentoInsercao || "";
    if (document.getElementById('m2-obs-discursivo')) document.getElementById('m2-obs-discursivo').value = dados.observacoes || "";

    bloquearCamposM2Discursivo(true);
    const btnGravar = document.getElementById('btn-gravar-m2-discursivo');
    const btnEditar = document.getElementById('btn-editar-m2-discursivo');
    if (btnGravar) btnGravar.disabled = true;
    if (btnEditar) btnEditar.disabled = false;
}

function editarModulo2Discursivo() {
    bloquearCamposM2Discursivo(false);
    const btnGravar = document.getElementById('btn-gravar-m2-discursivo');
    const btnEditar = document.getElementById('btn-editar-m2-discursivo');
    if (btnGravar) btnGravar.disabled = false;
    if (btnEditar) btnEditar.disabled = true;
}

function bloquearCamposM2Discursivo(status) {
    const checkboxes = document.querySelectorAll('input[name="m2_configuracao"], input[name="m2_elementos"]');
    checkboxes.forEach(cb => cb.disabled = status);

    const inputs = [
        'm2-funcao-discursivo', 'm2-circulacao-discursivo', 
        'm2-enquadramento-discursivo', 'm2-obs-discursivo'
    ];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = status;
    });
}

function limparFormularioM2Discursivo() {
    const checkboxes = document.querySelectorAll('input[name="m2_configuracao"], input[name="m2_elementos"]');
    checkboxes.forEach(cb => cb.checked = false);
    if (document.getElementById('m2-funcao-discursivo')) document.getElementById('m2-funcao-discursivo').value = "";
    if (document.getElementById('m2-circulacao-discursivo')) document.getElementById('m2-circulacao-discursivo').value = "";
    if (document.getElementById('m2-enquadramento-discursivo')) document.getElementById('m2-enquadramento-discursivo').value = "";
    if (document.getElementById('m2-obs-discursivo')) document.getElementById('m2-obs-discursivo').value = "";
}

// ==========================================
// ORCHESTRATOR DE CARREGAMENTO SEGURO
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    carregarNavegacaoLateral();

    const codigoSalvo = localStorage.getItem('codigoObjetoGlobal');
    if (codigoSalvo) {
        const IDsConsolaCodigo = ['m1-codigo-objeto', 'm2-codigo-herdado', 'm3-codigo-herdado', 'm4-codigo-herdado', 'm5-codigo-herdado', 'consola-codigo'];
        IDsConsolaCodigo.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) campo.value = codigoSalvo;
        });

        const selector = document.getElementById('consola-consulta-objetos');
        if (selector) {
            selector.value = `id_objeto_${codigoSalvo}`;
            const btnEditar = document.getElementById('btn-editar-m1');
            const btnApagar = document.getElementById('btn-apagar-m1');
            if (btnEditar) btnEditar.disabled = false;
            if (btnApagar) btnApagar.disabled = false;
        }
    }

        if (document.getElementById('m2-elementos-constituintes-grafico')) {
        sincronizarElementosConstituintes();
    }

    
    if (document.getElementById('m2-funcao-discursivo')) {
        carregarModulo2Discursivo();
    }

    const m1Numero = document.getElementById('m1-numero-sequencial');
    const m1Ano = document.getElementById('m1-ano');
    const m1Autor = document.getElementById('m1-autor');
    const m1Categoria = document.getElementById('m1-categoria');

    if (m1Numero) m1Numero.addEventListener('input', atualizarPreVisualizacaoCodigo);
    if (m1Ano) m1Ano.addEventListener('input', atualizarPreVisualizacaoCodigo);
    if (m1Autor) m1Autor.addEventListener('input', atualizarPreVisualizacaoCodigo);
    if (m1Categoria) m1Categoria.addEventListener('change', atualizarPreVisualizacaoCodigo);
});
