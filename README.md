# URL Shortener

This URL Shortener service allow user to register, login, shorten URL and redirect to the original URL.

## Deployment Link

https://url-shortener-5p7p.onrender.com


## Tech Stack

* Node.js
* Express.js
* MongoDB

## Documentation

https://url-shortener-5p7p.onrender.com/apidocs/

## Endpoints

1. For signup

    Endpoint - https://url-shortener-5p7p.onrender.com/user/signup
   
    Method - POST

    Request Body
    ```
      {
        "username" : your username,
        "password" : your password
      }
    
    ```

2. For Login

    Endpoint - https://url-shortener-5p7p.onrender.com/user/login
   
    Method - POST

   Request Body
    ```
      {
        "username" : your username,
        "password" : your password
      }
    
    ```

3. For Shortening URL

    Endpoint - https://url-shortener-5p7p.onrender.com/url/shorturl
   
    Method - POST

      Request Body
       ```
          "originalURL" : your url
       ```

4. For Redirect

    Endpoint - https://url-shortener-5p7p.onrender.com/url/redirect/:short
   
    Method - GET

   #### For Example
  
   ```
      "originalURL":"https://www.gurucool.life/"
      "shortURL": "https://url-shortener-5p7p.onrender.com/url/redirect/GISOuB",

   ```

