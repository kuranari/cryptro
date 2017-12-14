## js-secrets
```
$ npm install -g js-secrets

$ js-secrets setup
created: .secrets.key
created: secrets.yml.enc

$ js-secrets read
awesomeValue: 42

$ echo 'hello: world' | js-secrets write
$ js-secrets read
hello: world

$ EDITOR=vi js-secrets edit
```
