import tkinter as tk
from tkcalendar import Calendar

def pegar_data():
    data_selecionada = calendario.get_date()
    print(f"Data selecionada: {data_selecionada}")
    acessar_dados(data_selecionada)

def acessar_dados(data):
    # Aqui você pode conectar ao MySQL e acessar os dados com a data
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Tcorde0@',
            database='amonia_db'
        )
        cursor = conn.cursor()
        query = "SELECT * FROM informacoes_amonia WHERE data_coluna = %s"
        cursor.execute(query, (data,))
        resultados = cursor.fetchall()
        
        for row in resultados:
            print(row)

    except Error as e:
        print(f"Erro ao acessar os dados: {e}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

root = tk.Tk()
calendario = Calendar(root)
calendario.pack(pady=20)

botao = tk.Button(root, text="Selecionar Data", command=pegar_data)
botao.pack(pady=20)

root.mainloop()