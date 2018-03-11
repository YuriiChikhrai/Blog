define({ "api": [
  {
    "type": "post",
    "url": "/comments/:id",
    "title": "Add comment to post",
    "name": "addCommentToPost",
    "version": "1.1.0",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "2..10000",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..5",
            "optional": true,
            "field": "rate",
            "defaultValue": "3",
            "description": "<p>Rate of post</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "24",
            "optional": true,
            "field": "parentId",
            "description": "<p>Id of parent comment</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Comment add successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"message\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/comments/index.js",
    "groupTitle": "Comments"
  },
  {
    "type": "post",
    "url": "/comments/:id",
    "title": "Add comment to post",
    "name": "addCommentToPost",
    "version": "1.0.0",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "2..10000",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..5",
            "optional": true,
            "field": "rate",
            "defaultValue": "3",
            "description": "<p>Rate of post</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "24",
            "optional": true,
            "field": "parentId",
            "description": "<p>Id of parent comment</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Comment add successful\"\n}",
          "type": "json"
        },
        {
          "title": "Test Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"test response\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"message\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/comments/_apidoc.js",
    "groupTitle": "Comments"
  }
] });
