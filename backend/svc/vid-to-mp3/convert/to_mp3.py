import pika, json, tempfile, os
import moviepy.editor as m_ed
from bson.objectid import ObjectId

def start(body, fs_videos, fs_mp3s, ch):
    message = json.loads(body)

    # Save the video to a temporary file
    tf = tempfile.NamedTemporaryFile(delete=False)

    # Get the video from the database
    video = fs_videos.get(ObjectId(message['video_fid']))

    # Add the video into the the temp file
    tf.write(video.read())

    # Extract the audio
    audio = m_ed.VideoFileClip(tf.name).audio
    
    tf.close

    tf_path = tempfile.gettempdir() + f"/{message['video_fid']}.mp3"
    audio.write_audiofile(tf_path)

    # Save the file in the db
    f = open(tf_path, "rb")
    data = f.read()
    fid = fs_mp3s.put(data)

    f.close()
    os.remove(tf_path)

    message['mp3_fid'] = str(fid)

    try:
        ch.basic_publish(exchange="",
                         routing_key=os.environ.get("MP3_QUEUE"),
                         body=json.dumps(message),
                         properties=pika.BasicProperties(
                             delivery_mode=pika.spec.PERSISTENTDELIVERY_MODE
                            ),
                         )
    except Exception as err:
        fs_mp3s.delete(fid)
        return "Unable to publish message"
