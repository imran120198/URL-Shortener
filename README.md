# URL Shortener

This URL Shortener service allow user to register, login, shorten URL and redirect to the original URL.

## Deployment Link


## Tech Stack

* Node.js
* Express.js
* MongoDB

## Endpoints

1. For signup

    Endpoint - 
   
    Method - POST

    Request Body
    ```
      {
        "username" : your username,
        "password" : your password
      }
    
    ```

2. For Login -

    Endpoint -
   
    Method - POST

   Request Body
    ```
      {
        "username" : your username,
        "password" : your password
      }
    
    ```

3. For Shortening URL

    Endpoint -
   
    Method - POST

  Request Body
   ```
      "originalURL" : your url
   ```

4. For Redirect

    Endpoint -
   
    Method - GET
