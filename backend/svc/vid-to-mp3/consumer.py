import pika, sys, os, time, gridfs
from pymongo import MongoClient
from convert import to_mp3

def main():
    client = MongoClient('host.minikube.internal', 27017)
    db_video = client.videos
    db_mp3s = client.mp3s

    # Setup gridfs
    fs_videos = gridfs.GridFS(db_video)
    fs_mp3s = gridfs.GridFS(db_mp3s)

    # Configure Rabbitmq connection
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)
        err = to_mp3.start(body, fs_videos, fs_mp3s, ch)

        if err:
            ch.basic_nack(delivery_tag=method.delivery_tag)
        else:    
            print(" [x] Done")
            ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_consume(
        queue=os.environ.get("VIDEOS_QUEUE"), on_message_callback=callback
    )

    print("Waiting for messages. To exit, press CTRL+C")

    channel.start_consuming()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Exiting")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)

