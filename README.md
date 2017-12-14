## js-secrets
### INSTALL
```
$ npm install -g js-secrets
```

### USAGE
create an encrypted config file
```
$ js-secrets setup
created: .secrets.key
created: secrets.yml.enc
```

display it
```
$ js-secrets read
awesomeValue: 42
```

update it
```
$ echo 'hello: world' | js-secrets write
$ js-secrets read
hello: world
```

edit it
```
$ EDITOR=vi js-secrets edit
```

ignore key file in git
```
echo .sekrets.key >> .gitignore
```

### file
```
$ npm install js-secrets
```

```
const { load, fetchKey } = require('js-secrets');

const settings = load('./secrets.yml.enc', fetchKey({ path: './.secrets.key' }))
console.log(settings);
```
