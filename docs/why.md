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

electron supports typescript, do not use @types/electron, it is outdated and assumes wrong types and method signatures. It will cause weird errors at runtime.

npm create @quick-start/electron
you can follow the prompt and add typescript, react...

```
npm create @scope/name → resolved as @scope/create-name
So @quick-start/electron → @quick-start/create-electron
```