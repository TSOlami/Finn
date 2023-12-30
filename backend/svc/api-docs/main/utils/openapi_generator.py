import os
import json
import uuid

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

    file_id = str(uuid.uuid4())
    output_file = f"openapi_spec_{file_id}.json"

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(spec, f, ensure_ascii=False, indent=4)

    return file_id
