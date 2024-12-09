from pytube import YouTube

# Function to download a YouTube video
def download_video(video_url, save_path):
    try:
        yt = YouTube(video_url)
        stream = yt.streams.get_highest_resolution()
        print(f"Downloading: {yt.title}")
        stream.download(output_path=save_path)
        print("Download complete!")
    except Exception as e:
        print(f"Error: {e}")

# Example usage
if __name__ == "__main__":
    video_url = input("Enter the YouTube video URL: ")
    save_path = input("Enter the directory to save the video: ")
    download_video(video_url, save_path)
