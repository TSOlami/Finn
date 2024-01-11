import os
import json
from flask import current_app
from pymongo import MongoClient
from gridfs import GridFS

def generate_openapi_spec(api_info):
    spec = {
        'openapi': '3.0.0',
        'info': {
            'title': 'API Documentation',
            'version': '1.0',
        },
        'paths': {},
    }

    for api in api_info:
        spec['paths'][api['file']] = {
            'get': {
                'summary': f"APIs in {os.path.basename(api['file'])}",
                'description': f"Loc: {api['loc']}, LLoc: {api['lloc']}, SLoc: {api['sloc']}, Functions: {api['functions']}, Complexity: {api['complexity']}",
                'responses': {
                    '200': {'description': 'Successful response'},
                },
            },
        }

    # Save OpenAPI specification to GridFS and return file ID
    return save_openapi_spec_to_gridfs(spec)

def save_openapi_spec_to_gridfs(openapi_spec):
    client = MongoClient(current_app.config['MONGO_URI'])
    db = client[current_app.config['MONGO_DB']]
    fs = GridFS(db)

    with fs.new_file(filename='openapi_spec.json', content_type='application/json') as f:
        f.write(json.dumps(openapi_spec, ensure_ascii=False, indent=4).encode('utf-8'))

    file_id = f._id

    client.close()

    return file_id
