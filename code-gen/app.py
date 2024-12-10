from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Aseta OpenAI API -avain
openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route('/')
def home():
    return "Tervetuloa Koodiesimerkkigeneraattoriin!"

@app.route('/generate', methods=['POST'])
def generate_code():
    user_input = request.json.get('task', '')
    language = request.json.get('language', 'Python')
    
    if not user_input:
        return jsonify({'error': 'Tehtävä ei voi olla tyhjä.'}), 400

    # Generoi koodi käyttäen OpenAI API:a
    prompt = f"Generate code for the task '{user_input}' in {language}."
    
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # Valitse GPT-3 malli
            prompt=prompt,
            max_tokens=150
        )
        code = response.choices[0].text.strip()
        return jsonify({'task': user_input, 'language': language, 'code': code})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
