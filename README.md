# CleanUp Server

## Server setup
1. In the src folder make a folder called config with the following files: 
    1. cloudinary.json
    ```json
    {
        "production": {
            "use_env_variable": "DATABASE_URL",
            "dialect": "postgres"
        },
        "URI": POSTGRES_URI
    }

    ```
    2. config.json
    ```json
    {
        "CLOUD_NAME": CLOUD_NAME,
        "API_KEY": API_KEY,
        "API_SECRET": API_SECRET
    }
    ```
2. Run the following to install packages: ```npm i```
3. Then run the server to start the server: ```npm run server``` 
