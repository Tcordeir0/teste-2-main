const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3306;

// Configuração do CORS
app.use(cors());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost:3306',
    user: 'user', // substitua pelo seu usuário do MySQL
    password: 'Tcorde0@', // substitua pela sua senha do MySQL
    database: 'amonia_db' // nome do seu banco de dados
});

// Rota para consultar informações sobre amônia
app.get('/consultar', (req, res) => {
    const data = req.query.data; // Aqui você pode usar o parâmetro 'data' se necessário

    // Consulta ao banco de dados
    db.query('SELECT * FROM informacoes_amonia', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        res.json({ info: results });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
document.getElementById('consultarBtn').addEventListener('click', function() {
    fetch('/consultar')
        .then(response => response.json())
        .then(data => {
            const resultadoDiv = document.getElementById('resultado');
            if (data.info && data.info.length > 0) {
                resultadoDiv.innerHTML = data.info.map(item => `
                    <p>ID: ${item.id}, Fórmula: ${item.formula}, Nome Comum: ${item.nome_comum}, Nome IUPAC: ${item.nome_iupac}, Massa Molar: ${item.massa_molar}, Estado Físico: ${item.estado_fisico}, Ponto de Fusão: ${item.ponto_fusao}, Ponto de Ebulição: ${item.ponto_ebulicao}, Toxicidade: ${item.toxicidade}</p>
                `).join('');
            } else {
                resultadoDiv.innerHTML = `<p>Nenhuma informação encontrada.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});