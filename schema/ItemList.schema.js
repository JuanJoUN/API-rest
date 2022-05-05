const itemSchema = {
    "type": "array",
    "items": [
      {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "name": {
            "type": "string"
          },
          "sellIn": {
            "type": "integer"
          },
          "quality": {
            "type": "integer"
          },
          "type": {
            "type": "string"
          },
          "expired": {
            "type": "boolean"
          }
        }
      }
    ]
  }
  

exports.itemSchema = itemSchema;