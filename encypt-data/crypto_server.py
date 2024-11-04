from flask import Flask, request, jsonify
import base64

app = Flask(__name__)

# Kryptaa teksti Base64- ja binäärimuotoon
@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json.get('text')
    if not data:
        return jsonify({'error': 'No text provided'}), 400

    # Base64-kryptaus
    base64_encoded = base64.b64encode(data.encode()).decode()

    # Muunna binääriksi
    binary_encoded = ''.join(format(ord(char), '08b') for char in data)

    return jsonify({
        'base64': base64_encoded,
        'binary': binary_encoded
    })

# Dekryptaa Base64- ja binäärimuodosta takaisin tekstiin
@app.route('/decrypt', methods=['POST'])
def decrypt():
    base64_data = request.json.get('base64')
    binary_data = request.json.get('binary')
    
    if base64_data:
        # Base64-dekryptaus
        try:
            decoded_text = base64.b64decode(base64_data).decode()
        except Exception as e:
            return jsonify({'error': 'Invalid Base64 format'}), 400
        return jsonify({'text': decoded_text})

    elif binary_data:
        # Binääristä dekryptaus
        try:
            chars = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
            decoded_text = ''.join(chr(int(char, 2)) for char in chars)
        except Exception as e:
            return jsonify({'error': 'Invalid binary format'}), 400
        return jsonify({'text': decoded_text})

    else:
        return jsonify({'error': 'No Base64 or binary data provided'}), 400

if __name__ == '__main__':
    app.run(host='localhost', port=3090)
