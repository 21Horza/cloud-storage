CLOUD STORAGE
======


Cloud storage is the demonstration of how users can store their files in the remote database, upload and download files, change their user avatars as well.


Setup & run
======

The ``default.json`` file in ``server/config`` folder should contain the following:

```sh
# config vars
{
    "serverPort" : 5000,
    "dbUrl": "xxx",
    "secretKey": "xxx",
    "filePath": "/xxx/xxx/projects/js_projects/cloud/server/files",
    "staticPath": "/xxx/xxx/projects/js_projects/cloud/server/static"
}
```
The ``serverPort`` in our case is 5000, which runs the app on ``http://localhost:5000/``.

The ``dbUrl`` is the MongoDB url.

The ``secretKey`` is the secret key to connect to DB.

The ``filePath`` is the path to store files that will be downloaded on the localhost.

The ``staticPath`` is the path to store static files.

```sh
# Start server
cd server && npm run dev

# Start client
cd client && npm run start
```