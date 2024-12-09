from flask import Flask, request, send_file, jsonify
from pytube import YouTube
import os

app = Flask(__name__)

@app.route('/apps/videodowloader/', methods=['POST'])
def download_video():
    data = request.get_json()
    video_url = data.get('url')

    if not video_url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        yt = YouTube(video_url)
        stream = yt.streams.get_highest_resolution()
        file_path = stream.download()
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Poistetaan ladattu tiedosto, kun se on lähetetty
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == "__main__":
    app.run(debug=True)
