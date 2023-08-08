import openpyxl
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def read_excel_file(file_path):
    try:
        workbook = openpyxl.load_workbook(file_path)
        sheet = workbook.active

        data = []
        for row in sheet.iter_rows(values_only=True):
            data.append(row)

        return data

    except Exception as e:
        print(f"Erreur lors de la lecture du fichier Excel : {e}")
        return []


@app.route('/run-script', methods=['GET'])
def run_script():
    try:
        id = request.args.get('id')  # Récupérer les données depuis les paramètres de requête
        if id is not None:
            id = int(id)  # Convertir en entier si nécessaire

            relativeFilePath = ""
            if id == 0:
                relativeFilePath = "./files/1_Donnees_split/test/rw_dred_test.xlsx"
            elif id == 1:
                relativeFilePath = "./files/1_Donnees_split/test/rw_qud_test.xlsx"
            elif id == 2:
                relativeFilePath = "./files/1_Donnees_split/test/rw_sim_test.xlsx"
            
            excel_data = read_excel_file(relativeFilePath)
            result = {'message': 'Script executed successfully', 'data': excel_data}
            return jsonify(result)
        else:
            return jsonify({'error': 'Missing or invalid id parameter'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)