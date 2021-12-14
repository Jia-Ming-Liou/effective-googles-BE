// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const {connectToDB} = require("dbconnection");

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambdaHandler = async (event, context) => {
    const connection = await connectToDB();
    const sql = "select * from users;"
    let users =  new Promise((resolve, reject) => {
        try{
            connection.query(sql, (err, res) => {
                if(err) {
                    throw err;
                }
                resolve(res);
            })
        }
        catch (err) {
            reject(err);
        }
    })

    users.then((usrs) => {
        return ({
            'statusCode': 200,
            'body': JSON.stringify({
                message: usrs,
            })
        })
    })
};
