import pika, json


def upload(file, fs, channel, access):
    try:
        # Save the file to GridFS
        file_id = fs.put(file)
    except Exception as e:
        return str(e), 500
    
    message = {
        'file_id': file_id,
        'email': access['email'],
        'access_token': access['access_token'],
        'refresh_token': access['refresh_token'],
    }

    try:
        # Send the message to the rabbitmq queue
        channel.basic_publish(exchange='',
                              routing_key='video_queue',
                              body=json.dumps(message),
                                properties=pika.BasicProperties(
                                    delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE,
                                ))
    except Exception as e:
        fs.delete(file_id)
        return str(e), 500
