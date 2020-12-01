const crypto=require('crypto')

function md5Code(str,num=1){
    let data=str
    for(let i=0;i<num;i++){
        data=crypto.createHash('md5').update(data).digest('hex')
    }
    return data
}

module.exports=md5Code