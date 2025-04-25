package.json
```
//ensures React uses relative links instead of assuming http://localhost or a domain.
//for react the default is index.js, for electron main.js
{
    ...
    "homepage": "./",   
    "main": "electron.js",  
    ...
    "scripts": {
        ...
        "electron": "electron ."
    }
}
```
