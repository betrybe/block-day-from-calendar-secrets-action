# Extract Block and Day from Cohort Calendar Github Action

Essa action extrai o bloco e o dia atual de cada turma da Trybe e seta em uma variável de ambiente.

## Como usar

```yaml
steps:
 - name: Store ENV secrets from some google spreadsheet document as source
   uses: betrybe/block-day-from-calendar-secrets-action@v1
   with:
     auth-client-email: ${{ secrets.SERVICE_EMAIL }}
     auth-private-key: ${{ secrets.SERVICE_KEY }}
     spreadsheet: ${{ secrets.SPREADSHEET_ID }}
```

---

## How to configure

First of all you need to setup google service account.
* Login google api console
* On library enable `Google Sheets API`
* On credentials section `create service account`  (there is no need of special rol)
* Download json credentials file generated at previous step and use client_email and private_key for setup google sheets action.
* Go to google spreadsheet that you want to use and share it with generated email at service account (same as client_email) with read permisions.
* Get document id from spreadsheet url

Once you are done, setup action like usage example. Recommend to store these keys at [GitHub Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).

## About private key

If you use GitHub Secrets to store JSON private key beware with copy and paste because you need to change all line breaks `\n` with real ones.

JSON private_key content it's something like:
```
-----BEGIN PRIVATE KEY-----\nBLABLABLABLABLA\nBLABLABLABLABLA\n-----END PRIVATE KEY-----\n
```
Needs to be something like:
```
-----BEGIN PRIVATE KEY-----
BLABLABLABLABLA
BLABLABLABLABLA
-----END PRIVATE KEY-----
```

## Contributing

Feel free to contribute with [issues](https://github.com/betrybe/block-day-from-calendar-secrets-action/issues)
or [Pull Requests](https://github.com/betrybe/block-day-from-calendar-secrets-action/pulls)

## License

This project is [MIT](https://github.com/betrybe/block-day-from-calendar-secrets-action/blob/master/LICENSE) licensed.
