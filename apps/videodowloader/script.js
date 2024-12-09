document.getElementById('download-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Estää sivun uudelleenlatauksen

    const videoUrl = document.getElementById('video-url').value;
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = "Downloading...";

    try {
        const response = await fetch('http://127.0.0.1:5501/apps/videodowloader/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            messageDiv.textContent = "Download complete!";
        } else {
            messageDiv.textContent = "Failed to download video.";
        }
    } catch (error) {
        console.error(error);
        messageDiv.textContent = "An error occurred.";
    }
});
