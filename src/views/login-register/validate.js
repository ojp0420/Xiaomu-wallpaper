/*
    年/月/日/时/分：2022/6/14/23/31 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

/*用户名验证*/
export const validateUsername = (value) => {
    if (!value) {
        return "用户名为必填的"
    }
    if (value.length < 3 || value.length > 18) {
        return "用户名必须在3-12位之间"
    }
    return true
}

export const validatePassword = (value) => {
    if (!value) {
        return "密码是必填的"
    }
    if (value.length < 6 || value.length > 18) {
        return "用户名必须在6-12位之间"
    }
    return true
}

/**确认密码的表单校验*/
export const validateConfirmPassword = (value, password) => {
    if (value !== password[0]) {
        return '两次密码输入必须一致'
    }
    return true
}
