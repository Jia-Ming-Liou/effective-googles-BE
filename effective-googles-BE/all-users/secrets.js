const AWS = require('aws-sdk');

let decodedBinarySecret;
let secretName = process.env.DBArn;
let region = process.env.Region;
let client = new AWS.SecretsManager({
    region: region
});

exports.getSecrets = async () => {
    return new Promise((resolve, reject) => {
        try {
            client.getSecretValue({SecretId: secretName}, function(err, data) {
                if(err) {
                    throw err
                } else {
                    if ('SecretString' in data) {
                        resolve(JSON.parse(data.SecretString));
                    }
                    else {
                        let buff = new Buffer(data.SecretBinary, 'base64');
                        decodedBinarySecret = buff.toString('ascii');
                        resolve(decodedBinarySecret)
                    }
                }

            })
        } catch(ex) {
            reject(ex);
        }
    });
};
