const itemSchema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer"
      },
      "name": {
        "type": "integer"
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

exports.itemSchema = itemSchema;
