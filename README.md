# offchan.org

## Setup a local SSL Certificate

```
npm run gen:cert
```

1. You will be prompted for a pass phrase – you can choose any pass phrase you want;
2. You will be prompted to enter a DN – type the same data as in `bin/config/offchan.csr.cnf`;
3. Enter the same pass phrase as in step 1;
4. Save generated certificates in your local machine's keychain.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve:dev
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
