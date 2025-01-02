import mysql.connector as mysql
from datetime import datetime

# Conectar ao banco de dados
conexao = mysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='',
    database='banco'
)

# Criar um cursor
cursor = conexao.cursor()

# Definir a data que você deseja puxar
data_selecionada = '2025-01-02'  # Exemplo de data

# Consulta SQL para selecionar dados por data
query = "SELECT * FROM   WHERE data_coluna = %s"
cursor.execute(query, (data_selecionada,))

# Obter todos os resultados
resultados = cursor.fetchall()

# Exibir os resultados
for resultado in resultados:
    print(resultado)

# Fechar a conexão
cursor.close()
conexao.close()