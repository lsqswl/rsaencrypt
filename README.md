Website
======================
https://github.com/lsqswl/rsaencrypt.git

https://github.com/travist/jsencrypt

Website
======================
a RSA encrypt tool base 'jsencrypt' which can encrypt long string.

How to use this library.
=======================
1. install
```
npm install @lsqswl/rsaencrypt -D
```

2. use
```
import { encryptPublicLong, decryptPrivateLong } from '@lsqswl/rsaencrypt'

public encrypt() {
        const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+SJMkWLJ/NiKL6NRsIsjvdzyu\navEnbv+WzsHENko5AFGshfAbmjp19AJ/iaW0Jg1xu0XeEigT4UtnkTEuho8lEgRy\nULltedWgUprEGIwIHnAbJ1GJZCe3NtasaaleOPU67UkkQ9fKGXMujiCUTq1dTnd7\ntOosAeWrPpnOnx6gyQIDAQAB\n'
        const params = {
            'cash_amount_to':1,
            'pick_all': 'false',
            'withdraw_type':'CHANNEL_EMONEY',
            'third_account_channel': 'alipay',
            'third_account': '15900000000',
            'third_account_name':'name',
            'client_ip':'127.0.0.1',
            'password':'ed40beecde2036df41a6a7c907fee1'
        };

        const encryptData = encryptPublicLong(JSON.stringify(params), publicKey)
        console.log('result: ' + encryptData)

        const privateKey = '' +
            'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAL5IkyRYsn82Iovo' +
            '\n' +
            '1GwiyO93PK5q8Sdu/5bOwcQ2SjkAUayF8BuaOnX0An+JpbQmDXG7Rd4SKBPhS2eR' +
            '\n' +
            'MS6GjyUSBHJQuW151aBSmsQYjAgecBsnUYlkJ7c21qxpqV449TrtSSRD18oZcy6O' +
            '\n' +
            'IJROrV1Od3u06iwB5as+mc6fHqDJAgMBAAECgYEAvHjEDX8xJaFoLG4sYQM/RTk0' +
            '\n' +
            'SIoyXF2sGSKneAJSGA2B2EE95wknGIfdJZggIcSDEoBsnp4bRj2j42xDa5LqGhRu' +
            '\n' +
            'm9yY2R6W64BUs2PcHXAhWMCU+vqfsV/dpjB/1P7ix1ETqDNhaC6pkWDvsgGYg8jm' +
            '\n' +
            'csqaP24fiwXB2biUOsUCQQD4WVmSbZfbejrGfMAQNvpAAfg+XhRS8hzAW3bQnU5A' +
            '\n' +
            'Jrt8sZUlX6WZNAkZMP1KgP3RVoJMdVGbtVWgckBsxndjAkEAxCVHy5h9c1q0xq1T' +
            '\n' +
            'ERvogD8lrMA40f0T53YiMKsGU523hjk6RvYTaJTN30lUduwatFIOKOgo+gsuDZHS' +
            '\n' +
            'U7ds4wJAWjoMAtjyLPjxVZ+JH9r5fDu69t2zQJdZvsD8H7qm7UOlJh5Wc2eWgFyZ' +
            '\n' +
            'WZ+kxmaq0F0/pYuSBKIS4+HeaiaIxQJBAKZj5bq9ujYgDVi48c2CukIIz4HzcoAY' +
            '\n' +
            'S0k/upNEkdJe6a+wXlKSLza5fMdc4o0bjy/GqAJlp1UuJLwYJq8j2/cCQQCTMan4' +
            '\n' +
            'pUAKEhydxTXMCnSQCmsgTy9NCiVa4ihAl2gKPAiU+ABmd3yuH/qYI80waObn8kE4' +
            '\n' +
            'a9L1qtusIcVbumSb'

        const decryptData = decryptPrivateLong(encryptData, privateKey)
        console.log('result: ' + decryptData)
    }
```

demo
=======================
https://github.com/lsqswl/rsaencrypt/tree/master/demo

![Storybook for React Demo](https://github.com/lsqswl/rsaencrypt/raw/master/images/1539326613910.jpg)

![Storybook for React Demo](https://github.com/lsqswl/rsaencrypt/raw/master/images/1539326692423.jpg)
