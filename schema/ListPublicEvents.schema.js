const listPublicEventsSchema = {
    "id": ,
    "schema1": {
        "id": "#foo"
    },
    "schema2": {
        "id": "otherschema.json",
        "nested": {
            "id": "#bar"
        },
        "alsonested": {
            "id": "t/inner.json#a"
        }
    },
    "schema3": {
        "id": "some://where.else/completely#"
    }
};

exports.listPublicEventsSchema = listPublicEventsSchema;
