export function getRedirectPath({type, avatar}){
    // 根据用户信息 返回跳转地址
    // user.type /boss /genius    判断用户类别
    // user.avatar /bossinfo /geniusinfo   不同类别不同的完善信息
    let url = (type==='boss')?'/boss': '/genius';
    if (!avatar) {        //判断没有完善信息就跳转到完善信息页
        url += 'info'
    }
    return url
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_')
}
